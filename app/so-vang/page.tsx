'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Book from '@/components/Book'
import { Download, X } from 'lucide-react'

// Dữ liệu mẫu
const certificates = [
  {
    id: 1,
    name: 'Tập thể lao động xuất sắc - Khoa Ngoại Nhi',
    level: 'Bộ Y tế',
    year: 2019,
    department: 'Khoa Ngoại Nhi',
    image: '/img/sovang1.png',
    description: 'Đã có thành tích xuất sắc thực hiện nhiệm vụ, kế hoạch công tác Y tế năm 2018',
  },
  {
    id: 2,
    name: 'Bằng khen của Bộ Công An',
    level: 'Bộ Công An',
    year: 2019,
    department: 'Toàn bệnh viện',
    image: '/img/sovang2.png',
    description: 'Đã có thành tích xuất sắc trong công tác phối hợp thực hiện nhiệm vụ bảo vệ an ninh quốc gia và bảo đảm trật tự, an toàn xã hội',
  },
  {
    id: 3,
    name: 'Bằng khen Khoa Ngoại Nhi',
    level: 'Bộ Y tế',
    year: 2020,
    department: 'Khoa Ngoại Nhi',
    image: '/img/sovang3.png',
    description: 'Đã có thành tích xuất sắc thực hiện nhiệm vụ, kế hoạch công tác Y tế năm 2018-2019',
  },
  {
    id: 4,
    name: 'Chứng nhận Liên đội mạnh xuất sắc',
    level: 'Hội đồng Đội tỉnh',
    year: 2024,
    department: 'Toàn bệnh viện',
    image: '/img/sovang4.png',
    description: 'Đạt danh hiệu Liên đội mạnh xuất sắc cấp tỉnh năm học 2023-2024',
  },
]

export default function SoVangPage() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            Sổ vàng – Bằng khen
          </h1>
          <p className="text-lg text-gray-700">
            Thành tựu và vinh dự qua 75 năm phát triển
          </p>
        </div>

        {/* Book Component */}
        <Book
          certificates={certificates}
          onPageClick={(cert) => setSelectedCert(cert)}
        />
      </main>

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
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.name}
                      className="w-full h-full object-contain"
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
