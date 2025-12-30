 'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
const Book = dynamic(() => import('@/components/Book'), { ssr: false })
import { Download, X, BookOpen } from 'lucide-react'
import { goldenBookService } from '@/lib/api/services'
import { GoldenBook } from '@/lib/api/types'

interface Certificate {
  id: number
  name: string
  level: string
  year: number
  department: string
  image: string
  description: string
}

export default function SoVangPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const [showBookModal, setShowBookModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await goldenBookService.getAll()
        
        if (response.success && response.data) {
          // Map dữ liệu từ API format sang format mà component cần
          const mappedCertificates: Certificate[] = response.data.map((book: GoldenBook) => ({
            id: book.goldenBookId,
            name: book.goldenBookName,
            level: book.level,
            year: book.year,
            department: book.department,
            image: book.image || '/img/sovang1.png', // Fallback image
            description: book.description || '',
          }))
          setCertificates(mappedCertificates)
        } else {
          setError(response.error || 'Không thể tải dữ liệu sổ vàng')
        }
      } catch (err) {
        console.error('Error fetching golden books:', err)
        setError('Đã xảy ra lỗi khi tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  // selectedCert image loading with auth is handled inside client components (Book/ProtectedImage)

  // Xử lý phím ESC để đóng modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showBookModal) {
        setShowBookModal(false)
      }
    }

    if (showBookModal) {
      document.addEventListener('keydown', handleEscape)
      // Ngăn scroll body khi modal mở
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showBookModal])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mb-4"></div>
            <p className="text-lg text-gray-700">Đang tải dữ liệu...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Thử lại
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Sổ vàng – Bằng khen
          </h1>
          <p className="text-lg text-gray-700">
            Thành tựu và vinh dự qua 75 năm phát triển
          </p>
        </div>

        {certificates.length > 0 ? (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-4">
                Nhấn vào nút bên dưới để xem sổ vàng dạng sách
              </p>
              <button
                onClick={() => setShowBookModal(true)}
                className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
              >
                <BookOpen className="w-6 h-6" />
                <span>Xem Sổ Vàng</span>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Chưa có dữ liệu sổ vàng</p>
          </div>
        )}
      </main>

      {/* Modal hiển thị sổ vàng */}
      {showBookModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setShowBookModal(false)}
        >
          {/* Nút đóng */}
          {/* <button
            onClick={() => setShowBookModal(false)}
            className="absolute top-4 right-4 z-[60] bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button> */}

          {/* Sổ vàng - fit với màn hình */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Book
              certificates={certificates}
              onPageClick={(cert) => {
                setSelectedCert(cert)
                setShowBookModal(false)
              }}
            />
          </div>
        </div>
      )}

      {/* Modal chi tiết */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-primary-dark">
                  {selectedCert.name}
                </h2>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-lg">
                    <ProtectedImage
                      src={selectedCert.image}
                      alt={selectedCert.name}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="font-semibold text-primary-dark">Cấp khen:</span>
                      <p className="text-gray-700">{selectedCert.level}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-primary-dark">Năm nhận:</span>
                      <p className="text-gray-700">{selectedCert.year}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-primary-dark">Khoa phòng:</span>
                      <p className="text-gray-700">{selectedCert.department}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-primary-dark mb-2">Mô tả:</h3>
                    <p className="text-gray-700">{selectedCert.description}</p>
                  </div>

                  <button className="btn-primary w-full flex items-center justify-center">
                    <Download className="w-5 h-5 mr-2" />
                    Tải PDF
                  </button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-primary-dark mb-3">
                  Câu chuyện đằng sau thành tích
                </h3>
                <p className="text-gray-700">
                  {selectedCert.description} Đây là một thành tích đáng tự hào, thể hiện sự nỗ lực không ngừng
                  của toàn thể cán bộ, nhân viên bệnh viện trong công tác chăm sóc sức khỏe nhân dân.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
