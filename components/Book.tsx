'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { loadImageWithAuth } from '@/lib/utils/loadImageWithAuth'

import Image from 'next/image'
import HTMLFlipBook from 'react-pageflip'
import ProtectedImage from '@/components/ProtectedImage'

interface Certificate {
  id: number
  name: string
  level: string
  year: number
  department: string
  image: string
  description: string
}

interface BookProps {
  certificates: Certificate[]
  onPageClick?: (cert: Certificate) => void
}

// Kích thước A4 chuẩn (PDF px)
const PAGE_WIDTH = 595
const PAGE_HEIGHT = 842

// Năm mốc thành lập
const FOUNDING_YEAR = 1951

export default function Book({ certificates, onPageClick }: BookProps) {
  const [zoomImage, setZoomImage] = useState<string | null>(null)
  const { token } = useAuth()
  const flipBookRef = useRef<any>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [bookSize, setBookSize] = useState({ width: PAGE_WIDTH * 2, height: PAGE_HEIGHT })

  // Tạo 2 hàm điều khiển flip
  const disableFlip = () => {
    try {
      const pageFlip = flipBookRef.current?.pageFlip?.()
      if (pageFlip && typeof pageFlip.setAllowPageFlip === 'function') {
        pageFlip.setAllowPageFlip(false)
      }
    } catch (e) {
      console.warn('Failed to disable flip:', e)
    }
  }

  const enableFlip = () => {
    try {
      const pageFlip = flipBookRef.current?.pageFlip?.()
      if (pageFlip && typeof pageFlip.setAllowPageFlip === 'function') {
        pageFlip.setAllowPageFlip(true)
      }
    } catch (e) {
      console.warn('Failed to enable flip:', e)
    }
  }

  // Hàm tính toán kích thước (Responsive Logic)
  const resize = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight

    // Xác định mobile dựa trên width (< 768px là mobile/tablet dọc)
    const _isMobile = vw < 768
    setIsMobile(_isMobile)

    let width, height

    if (_isMobile) {
      // --- MOBILE (1 TRANG) ---
      // Tỷ lệ khung hình mong muốn: 1 trang A4 (595/842)
      const pageRatio = PAGE_WIDTH / PAGE_HEIGHT
      
      // Chiếm 95% chiều rộng màn hình
      const targetWidth = vw * 0.95
      const targetHeight = vh * 0.8

      // Tính toán để fit vào màn hình mà không méo
      if (targetWidth / pageRatio > targetHeight) {
        // Nếu bị giới hạn bởi chiều cao
        height = targetHeight
        width = height * pageRatio
      } else {
        // Nếu bị giới hạn bởi chiều rộng
        width = targetWidth
        height = width / pageRatio
      }
    } else {
      // --- DESKTOP (2 TRANG - SPREAD) ---
      // Tỷ lệ khung hình: 2 trang A4 ghép lại ((595*2)/842)
      const spreadRatio = (PAGE_WIDTH * 2) / PAGE_HEIGHT
      
      const targetWidth = vw * 0.9
      const targetHeight = vh * 0.9

      if (targetWidth / spreadRatio > targetHeight) {
        height = targetHeight
        width = height * spreadRatio
      } else {
        width = targetWidth
        height = width / spreadRatio
      }
    }

    setBookSize({ width, height })

    // Update size cho thư viện
    if (flipBookRef.current?.pageFlip?.()) {
      try {
        flipBookRef.current.pageFlip().updateSize(width, height)
      } catch (e) {
        console.warn('Flipbook updateSize error', e)
      }
    }
  }, [])

  useEffect(() => {
    // Gọi resize lần đầu và lắng nghe sự kiện
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize])

  // Tính toán số trang
  // Trang 0 = bìa, Trang 1 = mặt sau bìa (cert[0]), 
  // Trang 2 = cert[0] mặt trước, Trang 3 = cert[0] mặt sau (cert[1]), ...
  const totalPages = 1 + certificates.length * 2 // 1 bìa + mỗi cert 2 trang

  // Render trang bìa
  const renderCoverPage = () => {
    // Tính số năm từ năm mốc đến năm hiện tại
    const currentYear = new Date().getFullYear()
    const yearsSince = currentYear - FOUNDING_YEAR

    return (

      <div className="p-4 md:p-8 h-full flex flex-col items-center justify-start pt-15 md:pt-20 bg-gradient-to-br from-red-800 via-red-900 to-red-800">
        <div className="text-center mb-4">
          {/* Logo hình tròn */}
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-white shadow-lg border-2 border-white/20">
              <Image
                src="/img/logo.webp"
                alt="Logo Bệnh viện"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="inline-block border-b-3 border-white pb-2 mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              SỔ VÀNG
            </h1>
            <h2 className="text-lg md:text-xl font-semibold text-white">
              BỆNH VIỆN TRUNG ƯƠNG THÁI NGUYÊN
            </h2>
          </div>
          <p className="text-sm text-white text-opacity-90 italic mt-2">
            Kỷ niệm {yearsSince} năm thành lập
          </p>
          <p className="text-base font-bold text-white mt-1">
            {FOUNDING_YEAR} - {currentYear}
          </p>
        </div>
        <div className="mb-20">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-5xl">🏆</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-white text-opacity-90 text-sm max-w-md">
            Thành tựu và vinh dự qua {yearsSince} năm phát triển
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mt-3 mx-auto"></div>
        </div> 
      </div>
    )
  }

  // Render trang bìa cuối
  const renderBackCoverPage = () => {
    return (
<div className="p-4 md:p-6 h-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-100 border-4 border-double border-yellow-600">        
      </div>
    )
  }

  // Render trang certificate
  const renderCertificatePage = (cert: Certificate, pageNum: number) => {
    return (
      <div className="p-4 md:p-5 h-full flex flex-col overflow-visible bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50">
        <div className="text-center mb-2 flex-shrink-0">
          <div className="inline-block border-b-2 border-primary-dark pb-1.5 mb-1.5">
            <h2 className="text-lg md:text-xl font-bold text-primary-dark">
              SỔ VÀNG
            </h2>
          </div>
          <p className="text-[10px] text-gray-600 italic">
            Bệnh viện Trung ương Thái Nguyên
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center min-h-0 overflow-visible py-1">
          <div className="mb-2.5 w-full flex-shrink-0 flex justify-center">
            <div
              className="certificate-image-wrapper"
              style={{ width: '280px', height: '220px' }}
              onPointerDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
                // Khóa flip NGAY LẬP TỨC trước khi react-pageflip xử lý
                disableFlip()
              }}
              onPointerMove={(e) => {
                // Giữ flip bị khóa khi di chuyển pointer trong vùng ảnh
                e.stopPropagation()
              }}
              onPointerUp={async (e) => {
                e.preventDefault()
                e.stopPropagation()
                try {
                  const src = await loadImageWithAuth(cert.image, token || undefined)
                  setZoomImage(src)
                } catch (err) {
                  setZoomImage(cert.image)
                }
                // Delay để đảm bảo zoom modal mở trước khi enable flip
                setTimeout(() => {
                  enableFlip()
                }, 200)
              }}
              onPointerCancel={(e) => {
                e.stopPropagation()
                enableFlip()
              }}
              onPointerLeave={(e) => {
                e.stopPropagation()
                enableFlip()
              }}
            >
              <div className="certificate-frame" style={{ width: '100%', height: '100%' }}>
                <div className="certificate-frame-inner" style={{ width: '100%', height: '100%' }}>
                  <ProtectedImage
                    src={cert.image}
                    alt={cert.name}
                    className="certificate-image"
                  />
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xs md:text-sm font-bold text-primary-dark text-center mb-2 px-3 break-words line-clamp-2 leading-tight">
            {cert.name}
          </h3>

          <div className="bg-white bg-opacity-80 rounded-lg p-3 w-full max-w-[240px] shadow-md mb-2.5 flex-shrink-0">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="font-semibold text-primary-dark text-sm">Cấp:</span>
                <span className="text-gray-700 text-xs truncate ml-1">{cert.level}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="font-semibold text-primary-dark text-sm">Năm:</span>
                <span className="text-gray-700 text-xs">{cert.year}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-primary-dark text-sm">Khoa:</span>
                <span className="text-gray-700 text-right text-xs truncate ml-1">{cert.department}</span>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-700 italic text-xs max-w-[240px] mb-2 line-clamp-3 flex-shrink-0 leading-relaxed">
            "{cert.description}"
          </p>
        </div>

        <div className="text-center mt-2 pt-2 border-t border-gray-300 flex-shrink-0">
          <p className="text-[10px] text-gray-600">
            Trang {pageNum}
          </p>
        </div>
      </div>
    )
  }

  // Tạo mảng các trang
  const pages = []

  // --- TRANG 0: BÌA NGOÀI (Màu đỏ) ---
  pages.push(
    <div key="cover" className="page">
      
      {renderCoverPage()}
    </div>
  )

  // --- TRANG 1: MẶT SAU CỦA BÌA (Bìa trong) ---
  // Trang này nằm bên TRÁI khi mở sách ra
  pages.push(
    <div key="cover-inside" className="page">
      {renderBackCoverPage()}
    </div>
  )

  // --- CÁC TRANG CHỨNG CHỈ (Nối tiếp nhau liên tục) ---
  // Cert 1 (Trang 2 - Phải) -> Cert 2 (Trang 3 - Trái) -> Cert 3 (Trang 4 - Phải)...
  // react-pageflip sẽ tự động sắp xếp: trang đầu vào bên Phải, trang tiếp theo vào bên Trái (mặt sau tờ 1)
  certificates.forEach((cert, index) => {
    // Số thứ tự trang thực tế để hiển thị (bắt đầu từ 1)
    const displayPageNum = index + 1
    
    pages.push(
      <div key={`cert-${cert.id}`} className="page">
        {renderCertificatePage(cert, displayPageNum)}
      </div>
    )
  })

  // --- XỬ LÝ TRANG CUỐI ---
  // Để sách đóng lại đẹp, cần đảm bảo trang cuối cùng là bìa sau.
  // Logic: 
  // - Bìa trước (1) + Bìa trong (1) = 2 trang đầu.
  // - Nếu tổng số chứng chỉ là LẺ: Trang cuối cùng là chứng chỉ nằm ở bên PHẢI. Bìa sau sẽ ốp vào ngay sau đó (bên TRÁI) -> OK.
  // - Nếu tổng số chứng chỉ là CHẴN: Trang chứng chỉ cuối cùng nằm ở bên TRÁI. Bên PHẢI đang trống.
  //   Cần thêm 1 trang trắng đệm vào bên PHẢI trước khi đóng bìa.
  if (certificates.length % 2 === 0) {
    // Nếu chẵn chứng chỉ, thêm 1 trang trắng để lấp đầy bên phải
    pages.push(
      <div key="filler-page" className="page">
        <div className="h-full w-full bg-gradient-to-br from-yellow-50 via-white to-yellow-50"></div>
      </div>
    )
  }

  // --- BÌA SAU (Mặt trong) ---
  pages.push(
    // <div key="back-cover-inside" className="page">
    //   {renderBackCoverPage()}
    // </div>
  )

  // --- BÌA SAU (Mặt ngoài - Có thể làm giống bìa trước nhưng bỏ chữ) ---
  pages.push(
    <div key="back-cover-outside" className="page">
      
      <div className="p-4 md:p-6 h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-800 via-red-900 to-red-800">
      </div>
      </div>
  )

  if (certificates.length === 0) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <p className="text-gray-600 text-lg">
          Không tìm thấy bằng khen nào phù hợp với bộ lọc
        </p>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        .certificate-image-wrapper {
          position: relative;
          cursor: zoom-in;
          z-index: 1000 !important; 
          pointer-events: auto !important;
          touch-action: none; /* Ngăn default touch behaviors */
        }
        
        .certificate-image-wrapper * {
          pointer-events: auto !important;
          touch-action: none;
        }

        /* Đảm bảo vùng chứa trang không "nuốt" mất click của các phần tử con */
        .stf__item {
          pointer-events: auto !important;
        }

        .certificate-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .certificate-image-wrapper:hover .certificate-frame {
          transform: scale(1.05);
          transition: transform 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .certificate-frame {
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: inline-block;
          padding: 6px;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #f59e0b 75%, #fbbf24 100%);
          box-shadow: 
            0 0 0 1px #92400e,
            0 0 0 2px #fbbf24,
            0 4px 8px rgba(0, 0, 0, 0.3),
            inset 0 1px 2px rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          box-sizing: border-box;
        }

        .certificate-frame-inner {
          position: relative;
          background: white;
          padding: 4px;
          border-radius: 3px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .certificate-frame-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid #fbbf24;
          border-radius: 3px;
          pointer-events: none;
        }

        .page {
          background: white;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Responsive cho mobile */
        @media (max-width: 768px) {
          .page {
            padding: 0;
          }
        }
      `}</style>

      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <HTMLFlipBook
          key={isMobile ? 'mobile' : 'desktop'}
          ref={flipBookRef}
          width={isMobile ? bookSize.width : bookSize.width / 2}
          height={bookSize.height}
          minWidth={300}
          minHeight={400}
          maxWidth={1000}
          maxHeight={1400}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="book-container"
          style={{ margin: '0 auto' }}
          startPage={0}
          size="fixed"
          drawShadow={true}
          flippingTime={800}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={false}
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {pages}
        </HTMLFlipBook>
      </div>

      {/* Overlay hiển thị ảnh to toàn màn hình */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomImage(null)}
        >
          <img 
            src={zoomImage} 
            className="max-w-full max-h-full object-contain animate-in zoom-in duration-300" 
            alt="Zoomed certificate"
            onClick={(e) => e.stopPropagation()}
          />
          {/* <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            onClick={() => setZoomImage(null)}
            aria-label="Đóng"
          >
            &times;
          </button> */}
        </div>
      )}
    </>
  )
}
