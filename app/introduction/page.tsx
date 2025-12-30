'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { introductionService } from '@/lib/api/services'
import { Introduction } from '@/lib/api/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Heart, Award, Users, Target, Eye } from 'lucide-react'

export default function GioiThieuPage() {
  const [introductions, setIntroductions] = useState<Introduction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIntroductions = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await introductionService.getAll()
        
        if (response.success && response.data) {
          setIntroductions(response.data)
        } else {
          setError(response.error || 'Không thể tải dữ liệu giới thiệu')
        }
      } catch (err) {
        console.error('Error fetching introductions:', err)
        setError('Đã xảy ra lỗi khi tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    fetchIntroductions()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col hospital-base-bg">
        <Header />
        <div className="container mx-auto px-4 py-16 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mb-4"></div>
            <p className="text-lg text-blue-700">Đang tải dữ liệu...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col hospital-base-bg">
        <Header />
        <div className="container mx-auto px-4 py-16 flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Thử lại
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Helper functions to detect section types
  const isHistorySection = (section: string, content: string) => {
    const historyKeywords = ['lịch sử', 'thành lập', 'phát triển', 'năm', 'thời kỳ', 'giai đoạn']
    const text = (section + ' ' + content).toLowerCase()
    return historyKeywords.some(keyword => text.includes(keyword))
  }

  const isValuesSection = (section: string) => {
    const valuesKeywords = ['sứ mệnh', 'tầm nhìn', 'giá trị', 'mục tiêu', 'triết lý']
    const text = section.toLowerCase()
    return valuesKeywords.some(keyword => text.includes(keyword))
  }

  // Parse history content into timeline items (simple heuristic)
  const parseTimeline = (content: string) => {
    const lines = content.split(/\n|\.|\r/).map(l => l.trim()).filter(Boolean)
    const items: { year: string; text: string }[] = []
    const yearRegex = /\b(18|19|20)\d{2}\b/
    for (const ln of lines) {
      const m = ln.match(yearRegex)
      if (m) {
        const year = m[0]
        const text = ln.replace(yearRegex, '').trim().replace(/^[:\-–—]+/, '').trim()
        items.push({ year, text: text || ln })
      }
    }
    // fallback: if no explicit years found, try to split by sentences and create a single panel
    if (items.length === 0 && content.trim()) {
      items.push({ year: '', text: content.trim() })
    }
    return items
  }

  const heroSection = introductions[0]
  const otherSections = introductions.slice(1)

  return (
    <div className="min-h-screen flex flex-col hospital-base-bg">
      <Header />

      {introductions.length === 0 ? (
        <div className="container mx-auto px-4 py-16 flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Chưa có nội dung giới thiệu</p>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section - First Introduction (surface only changed) */}
          <div className="hospital-hero-bg mb-8 mt-0 text-center py-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Giới thiệu chung
            </h1>
          </div>

          {/* Story Sections */}
          <div className="py-0 md:py-0 space-y-0 md:space-y-0">
            {otherSections.map((intro, index) => {
              const isHistory = isHistorySection(intro.section, intro.content)
              const isValues = isValuesSection(intro.section)

              // History Timeline Section
              if (isHistory) {
                const timeline = parseTimeline(intro.content)
                return (
                  <section key={intro.introductionId} className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                      <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-12 text-center">
                        {intro.section}
                      </h2>

                              <div className="history-gallery rounded-3xl p-6 md:p-10 shadow-lg border border-blue-100">
                        {timeline.length > 1 ? (
                          <div className="flex items-start gap-8 overflow-x-auto py-6">
                            {timeline.map((t, i) => (
                              <div key={i} className="min-w-[220px] md:min-w-[260px] bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-50 shadow-sm">
                                {t.year ? (
                                  <div className="text-blue-800 font-serif font-bold text-2xl mb-2">{t.year}</div>
                                ) : (
                                  <div className="text-sm text-gray-500 mb-2">Thời điểm</div>
                                )}
                                <div className="text-sm md:text-base text-gray-800 leading-relaxed font-sans whitespace-pre-line">
                                  {t.text}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-lg leading-relaxed text-gray-800 font-sans whitespace-pre-line p-4">
                            {timeline[0].text}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                )
              }

              // Values & Mission Panels
              if (isValues) {
                return (
                  <section key={intro.introductionId} className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                      <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-12 text-center">
                        {intro.section}
                      </h2>
                      <div className="mission-engraved p-10 md:p-16">
                        <div className="text-xl md:text-2xl leading-relaxed text-blue-900 font-serif whitespace-pre-line text-center">
                          {intro.content}
                        </div>
                      </div>
                    </div>
                  </section>
                )
              }

              // Regular Story Section - Alternating Layout and visual rhythm
              return (
                <section
                  key={intro.introductionId}
                  className={`container mx-auto px-4 md:px-6 lg:px-8 ${
                    index % 3 === 0 ? 'surface-white' : index % 3 === 1 ? 'surface-blue' : 'strip-gradient'
                  } rounded-2xl py-12 md:py-20`}
                >
                  <div className={`max-w-7xl mx-auto ${index % 3 === 0 ? '' : 'floating-surface p-6 md:p-10'}`}>
                    <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                      {/* Text Content */}
                      <div className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-6">
                          {intro.section}
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mb-6"></div>
                        <div className="text-lg md:text-xl leading-relaxed text-gray-700 font-sans whitespace-pre-line">
                          {intro.content}
                        </div>
                      </div>

                      {/* Image/Illustration Placeholder */}
                      <div className={index % 2 === 0 ? 'md:order-2' : 'md:order-1'}>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-100 to-blue-200">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-8">
                              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-600/20 flex items-center justify-center">
                                {index % 3 === 0 && <Heart className="w-12 h-12 text-blue-600" />}
                                {index % 3 === 1 && <Users className="w-12 h-12 text-blue-600" />}
                                {index % 3 === 2 && <Award className="w-12 h-12 text-blue-600" />}
                              </div>
                              <p className="text-blue-800 font-serif text-lg font-semibold">
                                {intro.section}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )
            })}
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}

