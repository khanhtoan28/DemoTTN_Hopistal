'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { Heart, Building, Rocket, Award } from 'lucide-react'

const milestones = [
  {
    year: 1951,
    title: 'Thành lập',
    period: '1951',
    description: 'Bệnh viện Trung ương Thái Nguyên được thành lập, đánh dấu sự khởi đầu của hành trình phục vụ nhân dân. Với đội ngũ y bác sĩ đầu tiên và cơ sở vật chất còn đơn sơ, bệnh viện bắt đầu sứ mệnh chăm sóc sức khỏe cho nhân dân khu vực.',
    icon: Building,
    color: 'bg-primary-dark',
    image: '/img/ảnh 3.png', // Ảnh đen trắng lịch sử
  },
  {
    year: 1965,
    title: 'Thời chiến',
    period: '1965-1975',
    description: 'Trong thời kỳ chiến tranh, bệnh viện vượt qua muôn vàn khó khăn, tiếp tục phục vụ nhân dân và thương binh. Đội ngũ y bác sĩ kiên cường, làm việc trong điều kiện thiếu thốn nhưng vẫn giữ vững tinh thần phục vụ.',
    icon: Heart,
    color: 'bg-red-600',
    image: '/img/ảnh1.png', // Ảnh thời chiến
  },
  {
    year: 1976,
    title: 'Khôi phục',
    period: '1976-1995',
    description: 'Sau chiến tranh, bệnh viện bắt đầu quá trình khôi phục và mở rộng. Đầu tư vào cơ sở hạ tầng, trang thiết bị và đào tạo đội ngũ nhân lực. Số lượng giường bệnh tăng lên, chất lượng dịch vụ được cải thiện đáng kể.',
    icon: Building,
    color: 'bg-green-600',
    image: '/img/ảnh2.png', // Ảnh khôi phục
  },
  {
    year: 1996,
    title: 'Hiện đại hóa',
    period: '1996-2010',
    description: 'Bệnh viện bước vào giai đoạn hiện đại hóa với việc đầu tư mạnh mẽ vào trang thiết bị y tế hiện đại. Áp dụng các kỹ thuật mới, mở rộng các chuyên khoa, nâng cao chất lượng khám chữa bệnh. Trở thành bệnh viện tuyến trung ương hàng đầu khu vực.',
    icon: Rocket,
    color: 'bg-blue-600',
    image: '/img/ảnh 4.png', // Ảnh hiện đại hóa
  },
  {
    year: 2011,
    title: 'Kỹ thuật cao',
    period: '2011-2025',
    description: 'Ứng dụng công nghệ kỹ thuật cao trong chẩn đoán và điều trị. Đầu tư vào các thiết bị hiện đại như MRI, CT scan, hệ thống phẫu thuật nội soi. Phát triển các chuyên khoa sâu, thực hiện nhiều ca phẫu thuật phức tạp. Đạt nhiều thành tựu trong nghiên cứu khoa học và đào tạo.',
    icon: Award,
    color: 'bg-purple-600',
    image: '/img/ảnh 4.png', // Ảnh kỹ thuật cao
  },
  {
    year: 2026,
    title: '75 năm ngày thành lập',
    period: '2026',
    description: 'Kỷ niệm 75 năm thành lập - một hành trình đầy tự hào. Từ những ngày đầu khó khăn đến nay trở thành bệnh viện tuyến trung ương hiện đại, phục vụ hàng triệu lượt bệnh nhân. Tiếp tục phát triển, đổi mới, nâng cao chất lượng dịch vụ y tế.',
    icon: Award,
    color: 'bg-yellow-600',
    image: '/img/ảnh 5.png', // Ảnh 75 năm thành lập
  },
]

function MilestoneItem({ milestone, Icon, isEven }: { milestone: typeof milestones[0], Icon: any, isEven: boolean }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className={`relative flex flex-col lg:flex-row items-center ${
        isEven ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Nội dung */}
      <div
        className={`w-full lg:w-5/12 ${
          isEven ? 'lg:pr-8' : 'lg:pl-8'
        }`}
      >
        <div className="card">
          <div className="flex items-center mb-4">
            <div
              className={`w-12 h-12 ${milestone.color} rounded-full flex items-center justify-center mr-4`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-dark">
                {milestone.year}
              </div>
              <div className="text-sm text-gray-600">
                {milestone.period}
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-primary-dark mb-3">
            {milestone.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {milestone.description}
          </p>
        </div>
      </div>


      {/* Ảnh minh họa */}
      <div
        className={`w-full lg:w-5/12 ${
          isEven ? 'lg:pl-8' : 'lg:pr-8'
        }`}
      >
        {milestone.image && !imageError ? (
          <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg relative">
            <Image
              src={milestone.image}
              alt={`${milestone.title} - ${milestone.year}`}
              width={800}
              height={600}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-white to-primary-dark rounded-lg overflow-hidden flex items-center justify-center">
            <span className="text-6xl">📸</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LichSuPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            Lịch sử 75 năm
          </h1>
          <p className="text-lg text-gray-700">
            Dòng lịch sử bệnh viện – 1951–2026
          </p>
        </div>

        {/* Timeline dọc cho mobile, ngang cho desktop */}
        <div className="relative">
          {/* Đường timeline */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-dark opacity-30"></div>
          <div className="lg:hidden absolute left-8 w-1 h-full bg-primary-dark opacity-30"></div>

          {/* Các mốc */}
          <div className="space-y-12 lg:space-y-24">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              const isEven = index % 2 === 0
              
              return (
                <MilestoneItem 
                  key={milestone.year}
                  milestone={milestone}
                  Icon={Icon}
                  isEven={isEven}
                />
              )
            })}
          </div>
        </div>

        {/* Thống kê */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-dark mb-2">75</div>
            <div className="text-sm text-gray-600">Năm phát triển</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-dark mb-2">1000+</div>
            <div className="text-sm text-gray-600">Cán bộ nhân viên</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-dark mb-2">500K+</div>
            <div className="text-sm text-gray-600">Bệnh nhân/năm</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-dark mb-2">50+</div>
            <div className="text-sm text-gray-600">Khoa phòng</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

