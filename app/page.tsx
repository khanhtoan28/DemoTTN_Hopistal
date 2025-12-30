'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { Award, Archive, Clock, Medal, Trophy, Star, ArrowUp } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer cho scroll animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id')
          if (sectionId) {
            setVisibleSections((prev) => new Set(prev).add(sectionId))
          }
        }
      })
    }, observerOptions)

    // Observe tất cả các section
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) {
          observer.unobserve(ref)
        }
      })
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full min-h-[500px] md:min-h-[500px] pb-30 md:pb-42 z-20">
        {/* Background Image - Bọc trong div riêng có overflow-hidden để ảnh không tràn */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-[url('/img/banner.jpg')] bg-cover bg-center"></div>
          {/* Dark blue gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/50 via-primary-dark/60 to-primary-dark/50"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full min-h-[600px] md:min-h-[700px] flex items-center z-10">
          <div className="text-left text-white max-w-3xl">
            {/* Yellow Badge */}
            <div className="inline-block bg-[#D4AF37] text-primary-dark px-4 py-2 rounded-md text-sm font-bold mb-6 shadow-lg">
              BỆNH VIỆN HẠNG ĐẶC BIỆT
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
              PHÒNG TRUYỀN THỐNG
            </h1>
            
            {/* Subheadline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 drop-shadow-lg">
              BỆNH VIỆN TRUNG ƯƠNG THÁI NGUYÊN
            </h2>
            
            {/* Subtext */}
            <p className="text-lg md:text-xl mb-8 text-white/90 drop-shadow-lg">
              Kỷ niệm 75 năm thành lập: 1951–2026
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="http://dkkbtx.bvdktuthainguyen.gov.vn/#/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark/90 transition-all duration-300 shadow-lg text-center"
              >
                Đặt lịch khám ngay
              </Link>
              <Link 
                href="https://youtu.be/aAh88_28P8M?si=dobStcH_rkVG3BR5" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-dark transition-all duration-300 text-center"
              >
                Xem Video Giới Thiệu
              </Link>
            </div>
          </div>
        </div>

        {/* Stat Cards - Floating on bottom of hero */}
        <div 
          ref={(el) => { sectionRefs.current['stats'] = el }}
          data-section-id="stats"
          className="absolute -bottom-5 left-0 w-full translate-y-1/2"
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
              {/* Card 1: Năm phát triển */}
              <div className={`bg-white rounded-[20px] shadow-2xl p-6 md:p-8 text-center hover:shadow-10xl transition-all duration-700 delay-0 ${
                visibleSections.has('stats')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-700 mb-2 leading-tight">
                  75
                </div>
                <div className="text-xs md:text-base text-gray-600">
                  Năm phát triển
                </div>
              </div>

              {/* Card 2: Cán bộ nhân viên */}
              <div className={`bg-white rounded-[20px] shadow-2xl p-6 md:p-8 text-center hover:shadow-10xl transition-all duration-700 delay-100 ${
                visibleSections.has('stats')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-700 mb-2 leading-tight">
                  1000+
                </div>
                <div className="text-xs md:text-base text-gray-600">
                  Cán bộ nhân viên
                </div>
              </div>

              {/* Card 3: Bệnh nhân/năm */}
              <div className={`bg-white rounded-[20px] shadow-2xl p-6 md:p-8 text-center hover:shadow-10xl transition-all duration-700 delay-200 ${
                visibleSections.has('stats')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-700 mb-2 leading-tight">
                  500K+
                </div>
                <div className="text-xs md:text-base text-gray-600">
                  Lượt khám/năm
                </div>
              </div>

              {/* Card 4: Khoa phòng */}
              <div className={`bg-white rounded-[20px] shadow-2xl p-6 md:p-8 text-center hover:shadow-10xl transition-all duration-700 delay-300 ${
                visibleSections.has('stats')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-700 mb-2 leading-tight">
                  50+
                </div>
                <div className="text-xs md:text-base text-gray-600">
                  Khoa phòng
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History & Mission Section */}
      <section 
        ref={(el) => { sectionRefs.current['history'] = el }}
        data-section-id="history"
        className={`mt-20 py-24 md:py-32 bg-white transition-all duration-1000 ${
          visibleSections.has('history')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="order-2 lg:order-1">
              
              
              {/* Headline */}
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                Lịch sử & Sứ mệnh
              </h2>
              {/* Golden Accent Line */}
              <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
              {/* Paragraph 1 */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Được thành lập vào năm 1951, Bệnh viện Trung ương Thái Nguyên là một trong những trung tâm y tế hàng đầu của Việt Nam. Với truyền thống lâu đời và tinh thần đổi mới sáng tạo, chúng tôi không ngừng đầu tư vào công nghệ y tế tiên tiến nhất.
              </p>
              
              {/* Paragraph 2 */}
              <p className="text-gray-700 text-lg leading-relaxed">
                Chúng tôi không chỉ là nơi điều trị, mà còn là trung tâm đào tạo, nghiên cứu khoa học uy tín, đóng góp to lớn vào sự nghiệp bảo vệ sức khỏe nhân dân toàn quốc.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl shadow-2xl overflow-hidden aspect-[3/2]">
                <Image 
                  src="/img/anh3.jpg" 
                  alt="Bác sĩ và bệnh nhân" 
                  width={700}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Timeline Hành trình 75 năm */}
       <section 
        ref={(el) => { sectionRefs.current['timeline'] = el }}
        data-section-id="timeline"
        className={`pt-40 md:pt-20 pb-20 bg-[#0A2F57] relative overflow-hidden z-10 transition-all duration-1000 ${
          visibleSections.has('timeline')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-1">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hành trình 75 năm phát triển
            </h2>
            <div className="flex items-center justify-start md:justify-center max-w-4xl mx-auto">
              <div className="w-24 h-0.5 bg-[#D4AF37]"></div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Horizontal Line - Hidden on mobile, shown on desktop */}
            <div className="hidden md:block absolute left-0 right-0 top-24 h-0.5 bg-white/30"></div>

            {/* Timeline Items */}
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4">
              {/* 1951 */}
              <div className={`relative group transition-all duration-700 delay-0 ${
                visibleSections.has('timeline')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
                <div className="flex flex-col items-center">
                  {/* Year */}
                  <div className="text-5xl md:text-6xl font-bold text-[#D4AF37] mb-6 group-hover:text-[#E5C158] transition-colors duration-300">
                    1951
                  </div>
                  
                  {/* Gold Dot */}
                  <div className="relative z-10 mb-8">
                    <div className="w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-[#0A2F57] group-hover:bg-[#E5C158] group-hover:shadow-lg group-hover:shadow-[#D4AF37]/50 transition-all duration-300"></div>
                  </div>
                  
                  {/* Description */}
                  <div className="text-center group-hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-lg font-semibold text-white mb-3">Thành lập</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Bệnh viện được thành lập, đánh dấu sự khởi đầu của hành trình phục vụ nhân dân
                    </p>
                  </div>
                </div>
              </div>

              {/* 1970 */}
              <div className={`relative group transition-all duration-700 delay-200 ${
                visibleSections.has('timeline')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
                <div className="flex flex-col items-center">
                  {/* Year */}
                  <div className="text-5xl md:text-6xl font-bold text-[#D4AF37] mb-6 group-hover:text-[#E5C158] transition-colors duration-300">
                    1970
                  </div>
                  
                  {/* Gold Dot */}
                  <div className="relative z-10 mb-8">
                    <div className="w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-[#0A2F57] group-hover:bg-[#E5C158] group-hover:shadow-lg group-hover:shadow-[#D4AF37]/50 transition-all duration-300"></div>
                  </div>
                  
                  {/* Description */}
                  <div className="text-center group-hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-lg font-semibold text-white mb-3">Thời chiến</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Vượt qua khó khăn trong thời kỳ chiến tranh, tiếp tục phục vụ người dân
                    </p>
                  </div>
                </div>
              </div>

              {/* 1990 */}
              <div className={`relative group transition-all duration-700 delay-400 ${
                visibleSections.has('timeline')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
                <div className="flex flex-col items-center">
                  {/* Year */}
                  <div className="text-5xl md:text-6xl font-bold text-[#D4AF37] mb-6 group-hover:text-[#E5C158] transition-colors duration-300">
                    1990
                  </div>
                  
                  {/* Gold Dot */}
                  <div className="relative z-10 mb-8">
                    <div className="w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-[#0A2F57] group-hover:bg-[#E5C158] group-hover:shadow-lg group-hover:shadow-[#D4AF37]/50 transition-all duration-300"></div>
                  </div>
                  
                  {/* Description */}
                  <div className="text-center group-hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-lg font-semibold text-white mb-3">Hiện đại hóa</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Bắt đầu quá trình hiện đại hóa trang thiết bị và cơ sở hạ tầng
                    </p>
                  </div>
                </div>
              </div>

              {/* 2025 */}
              <div className={`relative group transition-all duration-700 delay-600 ${
                visibleSections.has('timeline')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
                <div className="flex flex-col items-center">
                  {/* Year */}
                  <div className="text-5xl md:text-6xl font-bold text-[#D4AF37] mb-6 group-hover:text-[#E5C158] transition-colors duration-300">
                    2025
                  </div>
                  
                  {/* Gold Dot */}
                  <div className="relative z-10 mb-8">
                    <div className="w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-[#0A2F57] group-hover:bg-[#E5C158] group-hover:shadow-lg group-hover:shadow-[#D4AF37]/50 transition-all duration-300"></div>
                  </div>
                  
                  {/* Description */}
                  <div className="text-center group-hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-lg font-semibold text-white mb-3">Kỹ thuật cao</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Ứng dụng công nghệ kỹ thuật cao, trở thành bệnh viện hàng đầu khu vực
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Khối giới thiệu */}
      <section 
        ref={(el) => { sectionRefs.current['intro'] = el }}
        data-section-id="intro"
        className={`mt-20 py-20 bg-white transition-all duration-1000 ${
          visibleSections.has('intro')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Sổ vàng */}
            <Link 
              href="/golden-book" 
              className={`group relative bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 ease-out cursor-pointer ${
                visibleSections.has('intro')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0ms' }}
            >
              <div className="flex flex-col items-center text-center h-full">
                {/* Icon Circle - Gold */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-yellow-200/50 transition-all duration-300">
                  <Award className="w-10 h-10 text-yellow-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors duration-300">
                  Sổ vàng
                </h3>
                
                {/* Subtitle */}
                <p className="text-base font-medium text-gray-600 mb-4">
                  Thành tựu 75 năm
                </p>
                
                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  Xem các bằng khen, giấy khen và thành tích đạt được qua các thời kỳ
                </p>
              </div>
              
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-50/0 to-yellow-50/0 group-hover:from-yellow-50/30 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
            </Link>

            {/* Hiện vật */}
            <Link 
              href="/artifact" 
              className={`group relative bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 ease-out cursor-pointer ${
                visibleSections.has('intro')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <div className="flex flex-col items-center text-center h-full">
                {/* Icon Circle - Brown */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-amber-200/50 transition-all duration-300">
                  <Archive className="w-10 h-10 text-amber-700 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">
                  Hiện vật
                </h3>
                
                {/* Subtitle */}
                <p className="text-base font-medium text-gray-600 mb-4">
                  Tư liệu quý
                </p>
                
                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  Khám phá các hiện vật lịch sử, thiết bị và tư liệu quý giá của bệnh viện
                </p>
              </div>
              
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-50/0 to-amber-50/0 group-hover:from-amber-50/30 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
            </Link>

            {/* Dòng lịch sử */}
            <Link 
              href="/history" 
              className={`group relative bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-700 ease-out cursor-pointer ${
                visibleSections.has('intro')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex flex-col items-center text-center h-full">
                {/* Icon Circle - Hospital Blue */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-200/50 transition-all duration-300">
                  <Clock className="w-10 h-10 text-primary-dark group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-dark transition-colors duration-300">
                  Dòng lịch sử
                </h3>
                
                {/* Subtitle */}
                <p className="text-base font-medium text-gray-600 mb-4">
                  Các thời kỳ phát triển
                </p>
                
                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  Tìm hiểu hành trình 75 năm phát triển qua các cột mốc quan trọng
                </p>
              </div>
              
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/30 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
            </Link>
          </div>
        </div>
      </section>

      <section 
        ref={(el) => { sectionRefs.current['awards'] = el }}
        data-section-id="awards"
        className={`mt-10 py-20 md:py-10 bg-gray-50 transition-all duration-1000 ${
          visibleSections.has('awards')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                title: "Anh hùng Lao động",
                icon: Award,
              },
              {
                title: "Huân chương Độc lập",
                icon: Medal,
              },
              {
                title: "Bệnh viện xuất sắc",
                icon: Trophy,
              },
              {
                title: "Cờ thi đua của Chính phủ",
                icon: Star,
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center transition-all duration-700 ${
                    visibleSections.has('awards')
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <IconComponent
                    className="w-16 h-16 text-[#D4AF37] mb-4"
                    strokeWidth={1.5}
                    // fill="#D4AF37"
                  />
                  <h3 className="text-gray-800 font-medium text-lg mt-2">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section 
        ref={(el) => { sectionRefs.current['directors'] = el }}
        data-section-id="directors"
        className={`mt-20 py-20 bg-white transition-all duration-1000 ${
          visibleSections.has('directors')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-40 h-1 bg-[#D4AF37]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900">
              Ban Giám đốc Bệnh viện
            </h2>
          </div>

          {/* Directors Grid */}
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  name: "PGS.TS. Nguyễn Công Hoàng",
                  role: "Bí thư Đảng ủy - Giám đốc Bệnh viện",
                  image: "/img/giamdoc moi.jpg",
                },
                {
                  name: "BSCKII. Hà Tiến Quang",
                  role: "Phó Bí thư TT Đảng ủy - Phó Giám đốc Bệnh viện",
                  image: "/img/2_quang.jpg",
                },
                {
                  name: "TS. Lê Thị Hương Lan",
                  role: "Ủy viên BTV Đảng ủy - Trưởng Ban Tuyên giáo - Phó Giám đốc Bệnh viện",
                  image: "/img/le thi huong lan.jpg",
                },
                {
                  name: "BSCKII. Đồng Quang Sơn",
                  role: "Ủy viên BTV Đảng ủy - Phó Giám đốc Bệnh viện",
                  image: "/img/ss (1).jpg",
                },
              ].map((director, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 ${
                    visibleSections.has('directors')
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Image Section - 70-75% of card height */}
                  <div className="relative h-[430px] md:h-[400px] bg-gray-200">
                    {director.image ? (
                      <Image
                        src={director.image}
                        alt={director.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Info Section - White background */}
                  <div className="bg-white p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                      {director.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {director.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={(el) => { sectionRefs.current['cta'] = el }}
        data-section-id="cta"
        className={`mt-20 pt-20 bg-white pb-0 transition-all duration-1000 ${
          visibleSections.has('cta')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Blue Card Container */}
          <div className="bg-[#004795] rounded-t-[80px] py-16 px-8 md:px-20 text-center shadow-lg">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Chúng tôi luôn sẵn sàng lắng nghe bạn
            </h2>
            
            {/* Sub-headline */}
            <p className="text-blue-100 text-lg mb-10 font-normal">
              Hệ thống hỗ trợ trực tuyến 24/7 và cổng thông tin bệnh nhân hiện đại.
            </p>
            
            {/* Buttons Group */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {/* Button 1: Đặt lịch hẹn (Màu vàng) */}
            <Link
              href="http://dkkbtx.bvdktuthainguyen.gov.vn/#/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#dca835] hover:bg-[#c9962a] text-[#003b7a] font-bold py-3 px-8 rounded-full transition-colors duration-300 uppercase text-sm tracking-wide min-w-[180px] text-center"
            >
              Đặt lịch hẹn
            </Link>
            
            {/* Button 2: Cổng thông tin (Viền trắng) */}
            <Link
              href="http://dkkbtx.bvdktuthainguyen.gov.vn/#/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border border-white text-white hover:bg-white hover:text-[#004795] font-bold py-3 px-8 rounded-full transition-all duration-300 uppercase text-sm tracking-wide text-center"
            >
              Cổng thông tin bệnh nhân
            </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-[#004795] hover:bg-[#003b7a] text-white p-4 rounded-full shadow-lg hover:shadow-xl z-50 flex items-center justify-center group transition-all duration-300 ${
          showScrollTop 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </div>
  )
}

