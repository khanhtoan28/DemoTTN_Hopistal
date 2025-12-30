'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { QrCode, Filter, Search, MapPin, ArrowRight } from 'lucide-react'
import { artifactsService } from '@/lib/api/services'
import { Artifact } from '@/lib/api/types'
import ProtectedImage from '@/components/ProtectedImage'

interface ArtifactDisplay {
  id: number
  name: string
  period: string
  type: string
  space: string
  image: string
  description: string
}

const types = ['Tất cả', 'Thiết bị', 'Giấy tờ', 'Hình ảnh', 'Khác']
const periods = ['Tất cả', '1951-1965', '1965-1975', '1976-1995', '1996-2010', '2011-2025']
const spaces = ['Tất cả', 'Khu A', 'Khu B', 'Khu C']

export default function HienVatPage() {
  const [artifacts, setArtifacts] = useState<ArtifactDisplay[]>([])
  const [selectedType, setSelectedType] = useState('Tất cả')
  const [selectedPeriod, setSelectedPeriod] = useState('Tất cả')
  const [selectedSpace, setSelectedSpace] = useState('Tất cả')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await artifactsService.getAll()
        
        if (response.success && response.data) {
          console.log('API Response Data:', response.data) // Debug log
          
          // Map dữ liệu từ API format sang format mà component cần
          const mappedArtifacts: ArtifactDisplay[] = response.data.map((artifact: Artifact) => {
            console.log('Mapping artifact:', artifact) // Debug log
            
            return {
              id: artifact.artifactId,
              name: artifact.artifactName,
              period: artifact.period || '1951-2025', // Lấy từ API, fallback nếu không có
              type: artifact.type || 'Khác', // Lấy từ API, fallback nếu không có
              space: artifact.space || 'Khu A', // Lấy từ API, fallback nếu không có
              image: artifact.imageUrl || '',
              description: artifact.description || '',
            }
          })
          
          console.log('Mapped Artifacts:', mappedArtifacts) // Debug log
          setArtifacts(mappedArtifacts)
        } else {
          setError(response.error || 'Không thể tải dữ liệu hiện vật')
        }
      } catch (err) {
        console.error('Error fetching artifacts:', err)
        setError('Đã xảy ra lỗi khi tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    fetchArtifacts()
  }, [])

  const filteredArtifacts = artifacts.filter((artifact) => {
    const matchType = selectedType === 'Tất cả' || artifact.type === selectedType
    const matchPeriod = selectedPeriod === 'Tất cả' || artifact.period === selectedPeriod
    const matchSpace = selectedSpace === 'Tất cả' || artifact.space === selectedSpace
    const matchSearch =
      searchTerm === '' ||
      artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artifact.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchType && matchPeriod && matchSpace && matchSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
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
        <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
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

  // Map type to category label
  const getCategoryLabel = (type: string) => {
    const categoryMap: { [key: string]: string } = {
      'Thiết bị': 'DỤNG CỤ Y KHOA',
      'Giấy tờ': 'TÀI LIỆU LƯU TRỮ',
      'Hình ảnh': 'TƯ LIỆU HÌNH ẢNH',
      'Khác': 'HIỆN VẬT GỐC',
    }
    return categoryMap[type] || 'HIỆN VẬT GỐC'
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-stone-50 to-blue-50/30">
      <Header />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 flex-1">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-family-sans font-bold text-stone-900 mb-4">
            QR Hiện vật – Danh mục hiện vật
          </h1>
          <p className="text-lg text-stone-600 font-sans">
            Khám phá các hiện vật lịch sử quý giá của bệnh viện
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm hiện vật..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar lọc */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24 border border-stone-100">
              <div className="flex items-center mb-6">
                <Filter className="w-5 h-5 mr-2 text-stone-700" />
                <h2 className="text-lg font-semibold text-stone-900 font-sans">Bộ lọc</h2>
              </div>

              {/* Lọc theo loại */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-700 mb-2 font-sans">
                  Loại hiện vật
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-sans text-sm"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lọc theo thời kỳ */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-700 mb-2 font-sans">
                  Thời kỳ
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-sans text-sm"
                >
                  {periods.map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lọc theo không gian */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2 font-sans">
                  Không gian trưng bày
                </label>
                <select
                  value={selectedSpace}
                  onChange={(e) => setSelectedSpace(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-stone-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-sans text-sm"
                >
                  {spaces.map((space) => (
                    <option key={space} value={space}>
                      {space}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Danh sách hiện vật - Museum Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtifacts.map((artifact) => (
                <Link
                  key={artifact.id}
                  href={`/artifact/${artifact.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col h-full hover:-translate-y-2">
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                      {artifact.image ? (
                        <ProtectedImage
                          src={artifact.image}
                          alt={artifact.name}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl opacity-30">📦</span>
                        </div>
                      )}
                      
                      {/* Overlay Elements */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      
                      {/* Top-left: Time Period Pill */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-stone-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium font-sans">
                          {artifact.period}
                        </span>
                      </div>
                      
                      {/* Top-right: QR Icon Button */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm w-10 h-10 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                          <QrCode className="w-5 h-5 text-stone-700" />
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category Label */}
                      <div className="mb-3">
                        <span className="text-[10px] font-sans font-semibold text-blue-600 uppercase tracking-widest">
                          {getCategoryLabel(artifact.type)}
                        </span>
                      </div>

                      {/* Artifact Name */}
                      <h3 className="text-xl font-serif font-bold text-stone-900 mb-4 line-clamp-2 leading-tight">
                        {artifact.name}
                      </h3>

                      {/* Location Line */}
                      <div className="flex items-center text-stone-500 text-sm mb-6 mt-auto">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="font-sans">{artifact.space}</span>
                      </div>

                      {/* Bottom Action Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          window.location.href = `/artifact/${artifact.id}`
                        }}
                        className="w-full bg-primary-dark hover:bg-stone-900 text-white font-sans font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg"
                      >
                        <span>Xem chi tiết</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredArtifacts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-stone-600 text-lg font-sans">
                  Không tìm thấy hiện vật nào phù hợp
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}

