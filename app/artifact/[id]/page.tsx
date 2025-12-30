'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft, QrCode, Calendar, MapPin, Download, Printer } from 'lucide-react'
import QRCode from 'react-qr-code'
import { artifactsService } from '@/lib/api/services'
import { Artifact } from '@/lib/api/types'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { loadImageWithAuth } from '@/lib/utils/loadImageWithAuth'

interface ArtifactDetail {
  id: number
  name: string
  period: string
  year: number
  type: string
  space: string
  department: string
  description: string
  history: string
  context: string
  images: string[]
}

export default function ArtifactDetailPage() {
  const params = useParams()
  const artifactId = params.id as string
  const [artifact, setArtifact] = useState<ArtifactDetail | null>(null)
  const { token } = useAuth()
  const [imageSrc, setImageSrc] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArtifact = async () => {
      if (!artifactId) return

      try {
        setLoading(true)
        setError(null)
        const id = parseInt(artifactId)
        
        if (isNaN(id)) {
          setError('ID không hợp lệ')
          return
        }

        const response = await artifactsService.getById(id)
        
        console.log('API Response:', response) // Debug log
        
        if (response.success && response.data) {
          const data = response.data
          console.log('Artifact Data:', data) // Debug log
          
          // Parse year from period (e.g., "1951-2025" -> 1951, or "1951" -> 1951)
          let year = 1951 // Default
          if (data.period) {
            const yearMatch = data.period.match(/^(\d{4})/)
            if (yearMatch) {
              year = parseInt(yearMatch[1])
            }
          }
          
          // Map dữ liệu từ API format sang format mà component cần
          const mappedArtifact: ArtifactDetail = {
            id: data.artifactId,
            name: data.artifactName,
            period: data.period || '1951-2025',
            year: year,
            type: data.type || 'Khác',
            space: data.space || 'Khu A',
            department: 'Phòng trưng bày', // Default value
            description: data.description || '',
            history: data.description || '', // Dùng description cho history nếu không có
            context: 'Hiện vật được trưng bày tại phòng truyền thống của bệnh viện.',
            images: data.imageUrl ? [data.imageUrl] : [],
          }
          setArtifact(mappedArtifact)
        } else {
          setError(response.error || 'Không tìm thấy hiện vật')
        }
      } catch (err) {
        console.error('Error fetching artifact:', err)
        setError('Đã xảy ra lỗi khi tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    fetchArtifact()
  }, [artifactId])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        if (artifact && artifact.images && artifact.images[0]) {
          const src = await loadImageWithAuth(artifact.images[0], token || undefined)
          if (mounted) setImageSrc(src)
        } else {
          if (mounted) setImageSrc('')
        }
      } catch (err) {
        if (mounted) setImageSrc(artifact && artifact.images && artifact.images[0] ? artifact.images[0] : '')
      }
    }

    load()
    return () => { mounted = false }
  }, [artifact, token])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mb-4"></div>
            <p className="text-lg text-gray-700">Đang tải dữ liệu...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !artifact) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-primary-dark mb-4">
            {error || 'Không tìm thấy hiện vật'}
          </h1>
          <Link href="/artifact" className="btn-primary inline-block">
            Quay lại danh sách
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const qrValue = `${typeof window !== 'undefined' ? window.location.origin : ''}/artifact/${artifactId}`

  // Download QR Code
  const handleDownloadQR = () => {
    const svgElement = document.getElementById('qr-code-svg')?.querySelector('svg')
    if (!svgElement) return

    const svgData = new XMLSerializer().serializeToString(svgElement)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = document.createElement('img')

    img.onload = () => {
      canvas.width = img.width || 256
      canvas.height = img.height || 256
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = `QR-${artifact.name.replace(/\s+/g, '-')}.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }
    }

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    img.src = url
  }

  // Print artifact info
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-stone-50 via-stone-100/30 to-stone-50">
      <style jsx>{`
        /* Museum spotlight effect */
        .museum-spotlight {
          position: relative;
        }
        .museum-spotlight::before {
          content: '';
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 120%;
          height: 60%;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
        
        /* Museum wall texture */
        .museum-wall {
          background: 
            linear-gradient(135deg, rgba(0,0,0,0.02) 0%, transparent 50%),
            linear-gradient(45deg, rgba(0,0,0,0.01) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.01) 75%),
            linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 50%, #f5f5f4 100%);
          background-size: 100% 100%, 20px 20px, 100% 100%;
        }
        
        /* Vignette effect */
        .museum-vignette {
          box-shadow: 
            inset 0 0 150px rgba(0,0,0,0.1),
            inset 0 0 80px rgba(0,0,0,0.05);
        }
        
        /* Pedestal shadow */
        .pedestal-shadow {
          box-shadow: 
            0 20px 60px rgba(0,0,0,0.15),
            0 10px 30px rgba(0,0,0,0.1),
            0 0 0 1px rgba(0,0,0,0.05);
        }
        
        /* Timeline marker */
        .timeline-marker {
          position: relative;
          display: flex;
          align-items: center;
        }
        .timeline-marker::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: 100%;
          background: #3b82f6;
        }
        
        /* Museum plaque frame */
        .museum-plaque {
          border: 2px solid #d4af37;
          border-radius: 4px;
          background: linear-gradient(to bottom, #fefce8, #fef9c3);
          box-shadow: 
            inset 0 1px 0 rgba(255,255,255,0.5),
            inset 0 -1px 0 rgba(0,0,0,0.1),
            0 2px 8px rgba(0,0,0,0.1);
        }
        
        /* Glass panel effect */
        .glass-panel {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 
            0 8px 32px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.5);
        }
      `}</style>
      <Header />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 flex-1">
        <div className="grid lg:grid-cols-[65%_35%] gap-12 lg:gap-16">
          {/* Left Side - Museum Exhibit Area */}
          <div className="space-y-8">
            {/* Breadcrumb - Subtle navigation */}
            <div>
              <nav className="flex items-center text-xs text-stone-500 tracking-wider uppercase">
                <Link href="/artifact" className="hover:text-stone-700 transition-colors">
                  DANH SÁCH
                </Link>
                <span className="mx-2">/</span>
                <span className="text-stone-700 font-medium">{artifact.name.toUpperCase()}</span>
              </nav>
            </div>

            {/* Museum Exhibit - Pedestal with Artifact */}
            <div className="relative flex flex-col items-center">
              {/* Museum Wall Background */}
              <div className="museum-wall museum-vignette w-full max-w-[800px] rounded-3xl p-16 relative">
                {/* Spotlight Effect */}
                <div className="museum-spotlight absolute inset-0 rounded-3xl overflow-hidden">
                  {/* Artifact on Pedestal */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Pedestal Base */}
                    <div className="w-full max-w-[700px] h-5 bg-gradient-to-b from-stone-300 to-stone-400 rounded-t-lg pedestal-shadow mb-3"></div>
                    
                    {/* Artifact Image */}
                    <div className="relative w-full max-w-[700px] aspect-[4/3] rounded-lg overflow-hidden bg-white shadow-2xl">
                      {artifact.images && artifact.images.length > 0 && artifact.images[0] ? (
                        <img
                          src={imageSrc || artifact.images[0]}
                          alt={artifact.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
                          <span className="text-8xl opacity-30">📦</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Pedestal Base Bottom */}
                    <div className="w-full max-w-[700px] h-4 bg-gradient-to-b from-stone-400 to-stone-500 rounded-b-lg pedestal-shadow mt-3"></div>
                  </div>
                </div>
              </div>
              
              {/* Museum Caption */}
              <div className="mt-6 w-full max-w-[800px] text-center">
                <p className="text-sm text-stone-600 italic tracking-wide">
                  Hiện vật trưng bày tại {artifact.space}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Museum Information Board */}
          <div className="bg-stone-50 rounded-2xl shadow-xl p-8 space-y-8 border border-stone-200">
            {/* Title with Timeline Marker */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 leading-tight tracking-tight">
                {artifact.name}
              </h1>
              
              {/* Timeline Marker for Year */}
              <div className="timeline-marker pl-8 relative">
                <div className="flex items-center relative z-10">
                  <span className="text-2xl font-serif text-blue-600 font-bold">
                    {artifact.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Metadata Grid - Museum Style */}
            <div className="grid grid-cols-2 gap-6 pb-6 border-b border-stone-200">
              <div className="space-y-2">
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-medium">Năm hình thành</p>
                <p className="text-base font-sans font-medium text-stone-900 border-b border-stone-300 pb-2">{artifact.year}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-medium">Phân loại</p>
                <p className="text-base font-sans font-medium text-stone-900 border-b border-stone-300 pb-2">{artifact.type}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-medium">Không gian</p>
                <p className="text-base font-sans font-medium text-stone-900 border-b border-stone-300 pb-2">{artifact.space}</p>
              </div>
            </div>

            {/* Description - Museum Plaque */}
            {artifact.description && (
              <div className="museum-plaque p-6 space-y-3">
                <h3 className="text-xs font-serif text-stone-700 uppercase tracking-wider font-semibold">
                  Mô tả lịch sử
                </h3>
                <p className="text-sm font-sans text-stone-800 leading-relaxed">
                  {artifact.description}
                </p>
              </div>
            )}

            {/* QR Code - Museum Guide Station */}
            <div className="glass-panel rounded-xl p-6 space-y-4">
              <div className="text-center space-y-3">
                <h3 className="text-xs font-serif text-stone-600 uppercase tracking-wider">
                  Hướng dẫn số
                </h3>
                <div id="qr-code-svg" className="flex justify-center">
                  <div className="bg-white p-3 rounded-lg shadow-inner">
                    <QRCode
                      value={qrValue}
                      size={180}
                      style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                      viewBox="0 0 256 256"
                    />
                  </div>
                </div>
                <p className="text-xs text-stone-600 font-sans">
                  Quét để mở trên điện thoại
                </p>
              </div>

              {/* Museum Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleDownloadQR}
                  className="w-full bg-stone-800 hover:bg-stone-900 text-white font-sans text-sm font-medium py-3 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 tracking-wide"
                >
                  <Download className="w-4 h-4" />
                  Tải xuống mã QR
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-sans text-sm font-medium py-3 px-4 rounded-md border border-stone-300 shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 tracking-wide"
                >
                  <Printer className="w-4 h-4" />
                  In thông tin
                </button>
              </div>
            </div>

            {/* Back Link - Subtle */}
            <Link
              href="/artifact"
              className="inline-flex items-center text-stone-500 hover:text-stone-700 transition-colors text-xs font-sans uppercase tracking-wider"
            >
              <ArrowLeft className="w-3 h-3 mr-2" />
              Quay lại danh sách
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
