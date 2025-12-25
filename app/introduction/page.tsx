'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { introductionService } from '@/lib/api/services'
import { Introduction } from '@/lib/api/types'

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
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mb-4"></div>
            <p className="text-lg text-gray-700">Đang tải dữ liệu...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-8 text-center">
            Giới thiệu
          </h1>

          {introductions.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 text-lg">Chưa có nội dung giới thiệu</p>
            </div>
          ) : (
            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
              {introductions.map((intro) => (
                <div key={intro.introductionId} className="card">
                  <h2 className="text-2xl font-bold text-primary-dark mb-4">
                    {intro.section}
                  </h2>
                  <div className="whitespace-pre-line">
                    {intro.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

