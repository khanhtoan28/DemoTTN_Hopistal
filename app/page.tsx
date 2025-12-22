import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Award, Archive, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/img/banner.jpg')] bg-cover bg-center"></div>
        {/* Overlay để text dễ đọc */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/100 via-primary-dark/50 to-primary-dark/10"></div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center z-10">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              PHÒNG TRUYỀN THỐNG
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 drop-shadow-lg">
              BỆNH VIỆN TRUNG ƯƠNG THÁI NGUYÊN
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-lg">
              Kỷ niệm 75 năm thành lập – 1951–2026
            </p>
            <Link href="/golden-book" className="btn-primary inline-block hover:bg-white hover:text-primary-dark">
              Khám phá
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Khối giới thiệu */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sổ vàng */}
            <Link href="/golden-book" className="card group cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="opacity-50 group-hover:opacity-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#C9A227' }}>
                  <Award className="w-10 h-10" style={{ color: '#8B6B00' }} />
                </div>
                <h3 className="group-hover:scale-110 transition-transform opacity-50 group-hover:opacity-100 text-2xl font-bold mb-3" style={{ color: '#C9A227' }}>
                  Sổ vàng
                </h3>
                <p className="text-gray-700 mb-4">
                  Thành tựu 75 năm
                </p>
                <p className="text-sm text-gray-600">
                  Xem các bằng khen, giấy khen và thành tích đạt được qua các thời kỳ
                </p>
              </div>
            </Link>

            {/* Hiện vật */}
            <Link href="/artifact" className="card group cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="opacity-50 group-hover:opacity-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#8B5A2B' }}>
                  <Archive className="w-10 h-10" style={{ color: '#5C3A1E' }} />
                </div>
                <h3 className="group-hover:scale-110 transition-transform opacity-50 group-hover:opacity-100 text-2xl font-bold mb-3" style={{ color: '#8B5A2B' }}>
                  Hiện vật
                </h3>
                <p className="text-gray-700 mb-4">
                  Tư liệu quý
                </p>
                <p className="text-sm text-gray-600">
                  Khám phá các hiện vật lịch sử, thiết bị và tư liệu quý giá của bệnh viện
                </p>
              </div>
            </Link>

            {/* Dòng lịch sử */}
            <Link href="/history" className="card group cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="opacity-50 group-hover:opacity-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#0B5ED7' }}>
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="group-hover:scale-110 transition-transform opacity-50 group-hover:opacity-100 text-2xl font-bold mb-3" style={{ color: '#0B5ED7' }}>
                  Dòng lịch sử
                </h3>
                <p className="text-gray-700 mb-4">
                  Các thời kỳ phát triển
                </p>
                <p className="text-sm text-gray-600">
                  Tìm hiểu hành trình 75 năm phát triển qua các cột mốc quan trọng
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Các cột mốc vàng */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Các cột mốc vàng</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1951 */}
            <div className="card text-center">
              <div className="text-4xl font-bold text-primary-dark mb-2">1951</div>
              <div className="w-16 h-1 bg-primary-dark mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Thành lập</h3>
              <p className="text-sm text-gray-700">
                Bệnh viện được thành lập, đánh dấu sự khởi đầu của hành trình phục vụ nhân dân
              </p>
            </div>

            {/* 1970 */}
            <div className="card text-center">
              <div className="text-4xl font-bold text-primary-dark mb-2">1970</div>
              <div className="w-16 h-1 bg-primary-dark mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Thời chiến</h3>
              <p className="text-sm text-gray-700">
                Vượt qua khó khăn trong thời kỳ chiến tranh, tiếp tục phục vụ người dân
              </p>
            </div>

            {/* 1990 */}
            <div className="card text-center">
              <div className="text-4xl font-bold text-primary-dark mb-2">1990</div>
              <div className="w-16 h-1 bg-primary-dark mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Hiện đại hóa</h3>
              <p className="text-sm text-gray-700">
                Bắt đầu quá trình hiện đại hóa trang thiết bị và cơ sở hạ tầng
              </p>
            </div>

            {/* 2025 */}
            <div className="card text-center">
              <div className="text-4xl font-bold text-primary-dark mb-2">2025</div>
              <div className="w-16 h-1 bg-primary-dark mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Kỹ thuật cao</h3>
              <p className="text-sm text-gray-700">
                Ứng dụng công nghệ kỹ thuật cao, trở thành bệnh viện hàng đầu khu vực
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

