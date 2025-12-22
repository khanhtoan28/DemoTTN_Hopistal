'use client'

import { useState, useEffect, useRef } from 'react'
import HTMLFlipBook from 'react-pageflip'

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

export default function Book({ certificates, onPageClick }: BookProps) {
  const [zoomImage, setZoomImage] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const flipBookRef = useRef<any>(null)

  // Kiểm tra mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Tính toán số trang
  // Trang 0 = bìa, Trang 1 = mặt sau bìa (cert[0]), 
  // Trang 2 = cert[0] mặt trước, Trang 3 = cert[0] mặt sau (cert[1]), ...
  const totalPages = 1 + certificates.length * 2 // 1 bìa + mỗi cert 2 trang

  // Render trang bìa
  const renderCoverPage = () => {
    return (
      <div className="p-4 md:p-6 h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-800 via-red-900 to-red-800">
        <div className="text-center mb-4">
          <div className="inline-block border-b-3 border-white pb-2 mb-3">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              SỔ VÀNG
            </h1>
            <h2 className="text-lg md:text-xl font-semibold text-white">
              BỆNH VIỆN TRUNG ƯƠNG THÁI NGUYÊN
            </h2>
          </div>
          <p className="text-sm text-white text-opacity-90 italic mt-2">
            Kỷ niệm 75 năm thành lập
          </p>
          <p className="text-base font-bold text-white mt-1">
            1951 - 2026
          </p>
        </div>
        <div className="mb-20">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-5xl">🏆</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-white text-opacity-90 text-sm max-w-md">
            Thành tựu và vinh dự qua 75 năm phát triển
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mt-3 mx-auto"></div>
        </div>
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setZoomImage(cert.image);
              }}
            >
              <div className="certificate-frame" style={{ width: '100%', height: '100%' }}>
                <div className="certificate-frame-inner" style={{ width: '100%', height: '100%' }}>
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="certificate-image"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
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
  
  // Trang 0: Bìa
  pages.push(
    <div key="cover" className="page">
      {renderCoverPage()}
    </div>
  )

  // Trang 1: Mặt sau bìa (certificate đầu tiên)
  if (certificates.length > 0) {
    pages.push(
      <div key="cover-back" className="page">
        {renderCertificatePage(certificates[0], 2)}
      </div>
    )
  }

  // Các trang certificate (mỗi cert 2 trang)
  for (let i = 0; i < certificates.length; i++) {
    // Trang chẵn: mặt trước
    if (i > 0 || certificates.length === 1) {
      pages.push(
        <div key={`cert-${i}-front`} className="page">
          {renderCertificatePage(certificates[i], i * 2 + 2)}
        </div>
      )
    }
    
    // Trang lẻ: mặt sau (certificate tiếp theo)
    if (i < certificates.length - 1) {
      pages.push(
        <div key={`cert-${i}-back`} className="page">
          {renderCertificatePage(certificates[i + 1], i * 2 + 3)}
        </div>
      )
    }
  }

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
          z-index: 9999;
          transform: translateZ(50px);
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

      <div className="flex justify-center items-center w-full py-8">
        <HTMLFlipBook
          ref={flipBookRef}
          width={isMobile ? 350 : 550}
          height={isMobile ? 500 : 800}
          minWidth={300}
          minHeight={400}
          maxWidth={800}
          maxHeight={1200}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="book-container"
          style={{}}
          startPage={0}
          size="stretch"
          drawShadow={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
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
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            onClick={() => setZoomImage(null)}
            aria-label="Đóng"
          >
            &times;
          </button>
        </div>
      )}
    </>
  )
}
