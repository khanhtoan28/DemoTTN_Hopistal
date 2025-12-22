'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { QrCode, Filter, Search } from 'lucide-react'

// Dữ liệu mẫu
const artifacts = [
  {
    id: 1,
    name: 'Máy X-quang đầu tiên',
    period: '1951-1965',
    type: 'Thiết bị',
    space: 'Khu A',
    image: '/artifact-1.jpg',
    description: 'Máy X-quang đầu tiên được sử dụng tại bệnh viện',
  },
  {
    id: 2,
    name: 'Sổ sách ghi chép năm 1951',
    period: '1951-1965',
    type: 'Giấy tờ',
    space: 'Khu B',
    image: '/artifact-2.jpg',
    description: 'Sổ sách ghi chép bệnh án đầu tiên của bệnh viện',
  },
  {
    id: 3,
    name: 'Ảnh tập thể năm 1970',
    period: '1965-1975',
    type: 'Hình ảnh',
    space: 'Khu A',
    image: '/artifact-3.jpg',
    description: 'Ảnh chụp tập thể cán bộ nhân viên năm 1970',
  },
  {
    id: 4,
    name: 'Bộ dụng cụ phẫu thuật',
    period: '1976-1995',
    type: 'Thiết bị',
    space: 'Khu C',
    image: '/artifact-4.jpg',
    description: 'Bộ dụng cụ phẫu thuật được sử dụng trong thời kỳ khôi phục',
  },
  {
    id: 5,
    name: 'Giấy phép hoạt động',
    period: '1951-1965',
    type: 'Giấy tờ',
    space: 'Khu B',
    image: '/artifact-5.jpg',
    description: 'Giấy phép hoạt động ban đầu của bệnh viện',
  },
  {
    id: 6,
    name: 'Máy đo huyết áp cổ',
    period: '1951-1965',
    type: 'Thiết bị',
    space: 'Khu A',
    image: '/artifact-6.jpg',
    description: 'Máy đo huyết áp thủy ngân cổ điển',
  },
]

const types = ['Tất cả', 'Thiết bị', 'Giấy tờ', 'Hình ảnh', 'Khác']
const periods = ['Tất cả', '1951-1965', '1965-1975', '1976-1995', '1996-2010', '2011-2025']
const spaces = ['Tất cả', 'Khu A', 'Khu B', 'Khu C']

export default function HienVatPage() {
  const [selectedType, setSelectedType] = useState('Tất cả')
  const [selectedPeriod, setSelectedPeriod] = useState('Tất cả')
  const [selectedSpace, setSelectedSpace] = useState('Tất cả')
  const [searchTerm, setSearchTerm] = useState('')

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            QR Hiện vật – Danh mục hiện vật
          </h1>
          <p className="text-lg text-gray-700">
            Khám phá các hiện vật lịch sử quý giá của bệnh viện
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm hiện vật..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar lọc */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <Filter className="w-5 h-5 mr-2 text-primary-dark" />
                <h2 className="text-xl font-bold text-primary-dark">Bộ lọc</h2>
              </div>

              {/* Lọc theo loại */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-primary-dark mb-2">
                  Loại hiện vật
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
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
                <label className="block text-sm font-semibold text-primary-dark mb-2">
                  Thời kỳ
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
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
                <label className="block text-sm font-semibold text-primary-dark mb-2">
                  Không gian trưng bày
                </label>
                <select
                  value={selectedSpace}
                  onChange={(e) => setSelectedSpace(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent"
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

          {/* Danh sách hiện vật */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtifacts.map((artifact) => (
                <Link
                  key={artifact.id}
                  href={`/artifact/${artifact.id}`}
                  className="card group cursor-pointer"
                >
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <div
                      className="aspect-[4/3] bg-gradient-to-br from-white via-blue-50 to-primary-dark flex items-center justify-center"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(92, 58, 33, 0.05) 10px, rgba(92, 58, 33, 0.05) 20px)',
                      }}
                    >
                      <span className="text-5xl">📦</span>
                    </div>
                    <div className="absolute top-2 right-2 bg-primary-dark text-white px-2 py-1 rounded text-xs font-semibold">
                      {artifact.period}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-primary-dark mb-2">
                    {artifact.name}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p><span className="font-semibold">Loại:</span> {artifact.type}</p>
                    <p><span className="font-semibold">Khu vực:</span> {artifact.space}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-primary-dark">
                      <QrCode className="w-5 h-5 mr-2" />
                      <span className="text-sm font-semibold">QR Code</span>
                    </div>
                    <button className="btn-secondary text-sm">
                      Xem thông tin
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {filteredArtifacts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
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

