'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  // Tổng số trang: 1 trang bìa + certificates
  const totalPages = certificates.length + 1

  const handleNext = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true)
      setCurrentPage((prev) => prev + 1)
      setTimeout(() => setIsFlipping(false), 600)
    }
  }

  const handlePrev = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true)
      setCurrentPage((prev) => prev - 1)
      setTimeout(() => setIsFlipping(false), 600)
    }
  }

  useEffect(() => {
    setCurrentPage(0)
    setIsFlipping(false)
  }, [certificates.length])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isFlipping) return
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentPage, totalPages, isFlipping])

  if (certificates.length === 0) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <p className="text-gray-600 text-lg">
          Không tìm thấy bằng khen nào phù hợp với bộ lọc
        </p>
      </div>
    )
  }

  // Render trang bìa
  const renderCoverPage = () => {
    return (
      <>
        <div className="page-front">
          <div className="p-8 md:p-12 h-full flex flex-col items-center justify-center">
            <div className="text-center mb-8">
              <div className="inline-block border-b-4 border-primary-dark pb-4 mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-2">
                  SỔ VÀNG
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-primary-dark">
                  BỆNH VIỆN TRUNG ƯƠNG THÁI NGUYÊN
                </h2>
              </div>
              <p className="text-lg text-gray-600 italic mt-4">
                Kỷ niệm 75 năm thành lập
              </p>
              <p className="text-xl font-bold text-primary-dark mt-2">
                1951 - 2026
              </p>
            </div>

            <div className="mb-8">
              <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-7xl">🏆</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-700 text-lg max-w-md">
                Thành tựu và vinh dự qua 75 năm phát triển
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary-dark to-transparent mt-6 mx-auto"></div>
            </div>
          </div>
        </div>
        <div className="page-back">
          {certificates[0] && renderCertificatePage(certificates[0], 1)}
        </div>
      </>
    )
  }

  // Render trang certificate
  const renderCertificatePage = (cert: Certificate, pageNum: number) => {
    return (
      <div className="p-4 md:p-5 h-full flex flex-col overflow-visible">
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
            <div className="certificate-frame" style={{ width: '280px', height: '220px' }}>
              <div className="certificate-frame-inner" style={{ width: '100%', height: '100%' }}>
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-contain block"
                />
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

  // Xác định trang bên trái và bên phải
  // Luôn hiển thị 2 trang như một cuốn sách thật
  const getLeftPage = () => {
    if (currentPage === 0) {
      // Trang đầu: trái trống hoặc trang bìa trong
      return { type: 'empty', index: -1 }
    }
    if (currentPage === 1) {
      // Trang 2: trái = mặt sau của bìa (certificate đầu tiên)
      return { type: 'cover-back', index: 0 }
    }
    // Các trang sau: trái = certificate trước đó
    return { type: 'cert', index: currentPage - 2 }
  }

  const getRightPage = () => {
    if (currentPage === 0) {
      // Trang đầu: phải = bìa
      return { type: 'cover', index: 0 }
    }
    // Các trang sau: phải = certificate hiện tại
    return { type: 'cert', index: currentPage - 1 }
  }

  const leftPage = getLeftPage()
  const rightPage = getRightPage()

  return (
    <>
      <style jsx global>{`
        .book-container {
          position: relative;
          perspective: 2000px;
          perspective-origin: center center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .book {
          position: relative;
          width: 100%;
          max-width: 1100px;
          height: 550px;
          margin: 0 auto;
          transform-style: preserve-3d;
          overflow: visible;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
        }

        .book-page {
          position: relative;
          width: 50%;
          height: 550px;
          flex-shrink: 0;
          margin: 0;
          padding: 0;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
          transform-origin: left center;
          box-sizing: border-box;
          border: none;
          outline: none;
        }

        .book-page.left {
          order: 1;
          z-index: 1;
        }

        .book-page.right {
          order: 2;
          z-index: 2;
        }

        .book-page-front,
        .book-page-back {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          margin: 0;
          padding: 0;
          background: linear-gradient(to bottom right, #fef3c7, #fde68a, #fef3c7);
          border: none;
          overflow: visible;
          box-sizing: border-box;
        }

        .book-page.left .book-page-back {
          display: none;
        }

        .book-page.right .book-page-back {
          display: none;
        }

        .book-page.left .book-page-front {
          box-shadow: 5px 0 15px rgba(0, 0, 0, 0.15) inset, 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .book-page.right .book-page-front {
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.15) inset, 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .book-page.flipping {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
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

        .certificate-frame {
          position: relative;
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
      `}</style>

      <div className="book-container">
        <div className="book">
          {/* Trang bên trái (luôn hiển thị) */}
          <div
            className={`book-page left ${isFlipping && currentPage > 0 ? 'flipping' : ''}`}
          >
            <div className="book-page-front">
              {leftPage.type === 'empty' ? (
                <div className="p-8 md:p-12 h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm italic">Trang bìa trong</p>
                  </div>
                </div>
              ) : leftPage.type === 'cover-back' ? (
                certificates[0] && renderCertificatePage(certificates[0], 1)
              ) : leftPage.type === 'cert' && leftPage.index >= 0 && leftPage.index < certificates.length ? (
                renderCertificatePage(certificates[leftPage.index], leftPage.index + 1)
              ) : (
                <div className="p-8 md:p-12 h-full flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Trang trống</p>
                </div>
              )}
            </div>
            <div className="book-page-back">
              {leftPage.type === 'empty' ? (
                <div className="p-8 md:p-12 h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm italic">Trang bìa trong</p>
                  </div>
                </div>
              ) : leftPage.type === 'cover-back' && certificates[1] ? (
                renderCertificatePage(certificates[1], 2)
              ) : leftPage.type === 'cert' && leftPage.index + 1 < certificates.length ? (
                renderCertificatePage(certificates[leftPage.index + 1], leftPage.index + 2)
              ) : (
                <div className="p-8 md:p-12 h-full flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Trang trống</p>
                </div>
              )}
            </div>
          </div>

          {/* Trang bên phải (luôn hiển thị) */}
          <div
            className={`book-page right ${isFlipping ? 'flipping' : ''}`}
          >
            <div className="book-page-front">
              {rightPage.type === 'cover' ? (
                <div className="p-4 md:p-6 h-full flex flex-col items-center justify-center">
                  <div className="text-center mb-4">
                    <div className="inline-block border-b-3 border-primary-dark pb-2 mb-3">
                      <h1 className="text-2xl md:text-3xl font-bold text-primary-dark mb-1">
                        SỔ VÀNG
                      </h1>
                      <h2 className="text-lg md:text-xl font-semibold text-primary-dark">
                        BỆNH VIỆN TRUNG ƯƠNG THÁI NGUYÊN
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600 italic mt-2">
                      Kỷ niệm 75 năm thành lập
                    </p>
                    <p className="text-base font-bold text-primary-dark mt-1">
                      1951 - 2026
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-5xl">🏆</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-700 text-sm max-w-md">
                      Thành tựu và vinh dự qua 75 năm phát triển
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary-dark to-transparent mt-3 mx-auto"></div>
                  </div>
                </div>
              ) : rightPage.type === 'cert' && rightPage.index >= 0 && rightPage.index < certificates.length ? (
                renderCertificatePage(certificates[rightPage.index], rightPage.index + 1)
              ) : (
                <div className="p-8 md:p-12 h-full flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Trang trống</p>
                </div>
              )}
            </div>
            <div className="book-page-back">
              {rightPage.type === 'cover' ? (
                certificates[0] && renderCertificatePage(certificates[0], 1)
              ) : rightPage.type === 'cert' && rightPage.index + 1 < certificates.length ? (
                renderCertificatePage(certificates[rightPage.index + 1], rightPage.index + 2)
              ) : (
                <div className="p-8 md:p-12 h-full flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Trang trống</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nút lật trang bên trái */}
        {currentPage > 0 && !isFlipping && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 bg-primary-dark text-white rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-110"
            aria-label="Trang trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Nút lật trang bên phải */}
        {currentPage < totalPages - 1 && !isFlipping && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 bg-primary-dark text-white rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-110"
            aria-label="Trang sau"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </>
  )
}
