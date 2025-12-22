'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowLeft, QrCode, Calendar, MapPin } from 'lucide-react'
import QRCode from 'react-qr-code'

// Dữ liệu mẫu - trong thực tế sẽ fetch từ API
const artifactsData: Record<string, any> = {
  '1': {
    id: 1,
    name: 'Máy X-quang đầu tiên',
    period: '1951-1965',
    year: 1952,
    type: 'Thiết bị',
    space: 'Khu A',
    department: 'Khoa Chẩn đoán hình ảnh',
    description: 'Máy X-quang đầu tiên được sử dụng tại bệnh viện. Đây là thiết bị quan trọng trong việc chẩn đoán bệnh, được nhập khẩu từ nước ngoài và đánh dấu bước tiến lớn trong công nghệ y tế của bệnh viện.',
    history: 'Máy X-quang này được đưa vào sử dụng năm 1952, là một trong những thiết bị y tế hiện đại đầu tiên của bệnh viện. Trong suốt nhiều năm, nó đã phục vụ hàng nghìn lượt bệnh nhân, góp phần quan trọng vào công tác chẩn đoán và điều trị.',
    context: 'Thời kỳ đầu thành lập, bệnh viện đang trong quá trình xây dựng và phát triển cơ sở vật chất. Việc có được máy X-quang là một thành tựu lớn, thể hiện sự quan tâm của nhà nước đối với công tác y tế.',
    images: ['/artifact-1.jpg', '/artifact-1-2.jpg'],
  },
  '2': {
    id: 2,
    name: 'Sổ sách ghi chép năm 1951',
    period: '1951-1965',
    year: 1951,
    type: 'Giấy tờ',
    space: 'Khu B',
    department: 'Phòng Hành chính',
    description: 'Sổ sách ghi chép bệnh án đầu tiên của bệnh viện, chứa đựng những thông tin quý giá về những ngày đầu hoạt động.',
    history: 'Đây là cuốn sổ đầu tiên được sử dụng để ghi chép thông tin bệnh nhân khi bệnh viện mới thành lập. Mỗi trang sổ là một câu chuyện, một kỷ niệm về những ngày đầu khó khăn nhưng đầy nhiệt huyết.',
    context: 'Trong điều kiện thiếu thốn về trang thiết bị, việc ghi chép thủ công là phương pháp duy nhất để lưu trữ thông tin bệnh nhân.',
    images: ['/artifact-2.jpg'],
  },
  '3': {
    id: 3,
    name: 'Ảnh tập thể năm 1970',
    period: '1965-1975',
    year: 1970,
    type: 'Hình ảnh',
    space: 'Khu A',
    department: 'Toàn bệnh viện',
    description: 'Ảnh chụp tập thể cán bộ nhân viên năm 1970, ghi lại khoảnh khắc đoàn kết của đội ngũ y bác sĩ trong thời kỳ khó khăn.',
    history: 'Bức ảnh này được chụp nhân dịp kỷ niệm 19 năm thành lập bệnh viện, thể hiện tinh thần đoàn kết và quyết tâm vượt qua khó khăn.',
    context: 'Thời kỳ chiến tranh, mặc dù gặp nhiều khó khăn nhưng đội ngũ cán bộ nhân viên vẫn kiên cường phục vụ nhân dân.',
    images: ['/artifact-3.jpg'],
  },
  '4': {
    id: 4,
    name: 'Bộ dụng cụ phẫu thuật',
    period: '1976-1995',
    year: 1980,
    type: 'Thiết bị',
    space: 'Khu C',
    department: 'Khoa Ngoại',
    description: 'Bộ dụng cụ phẫu thuật được sử dụng trong thời kỳ khôi phục, là công cụ quan trọng trong các ca phẫu thuật.',
    history: 'Bộ dụng cụ này đã phục vụ hàng trăm ca phẫu thuật, góp phần cứu sống nhiều bệnh nhân.',
    context: 'Thời kỳ sau chiến tranh, bệnh viện bắt đầu khôi phục và mở rộng hoạt động.',
    images: ['/artifact-4.jpg'],
  },
  '5': {
    id: 5,
    name: 'Giấy phép hoạt động',
    period: '1951-1965',
    year: 1951,
    type: 'Giấy tờ',
    space: 'Khu B',
    department: 'Phòng Hành chính',
    description: 'Giấy phép hoạt động ban đầu của bệnh viện, đánh dấu sự ra đời chính thức.',
    history: 'Đây là tài liệu pháp lý đầu tiên, cho phép bệnh viện chính thức đi vào hoạt động.',
    context: 'Ngày thành lập bệnh viện - một cột mốc quan trọng trong lịch sử.',
    images: ['/artifact-5.jpg'],
  },
  '6': {
    id: 6,
    name: 'Máy đo huyết áp cổ',
    period: '1951-1965',
    year: 1953,
    type: 'Thiết bị',
    space: 'Khu A',
    department: 'Khoa Nội',
    description: 'Máy đo huyết áp thủy ngân cổ điển, là thiết bị cơ bản nhưng quan trọng trong khám bệnh.',
    history: 'Máy đo huyết áp này đã phục vụ hàng nghìn lượt khám bệnh trong nhiều năm.',
    context: 'Thiết bị y tế cơ bản nhưng không thể thiếu trong công tác khám chữa bệnh.',
    images: ['/artifact-6.jpg'],
  },
}

export default function ArtifactDetailPage() {
  const params = useParams()
  const artifactId = params.id as string
  const artifact = artifactsData[artifactId]

  if (!artifact) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-primary-dark mb-4">
            Không tìm thấy hiện vật
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1">
        <Link
          href="/artifact"
          className="inline-flex items-center text-primary-dark hover:text-primary-dark mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại danh sách
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ảnh chính */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-xl p-6 border-4 border-primary-dark">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-white via-blue-50 to-primary-dark rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                <span className="text-8xl">📦</span>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 italic">
                  Hiện vật được trưng bày tại {artifact.space}
                </p>
              </div>
            </div>

            {/* Ảnh phụ */}
            {artifact.images && artifact.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {artifact.images.slice(1).map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="aspect-square bg-blue-50 rounded-lg overflow-hidden flex items-center justify-center"
                  >
                    <span className="text-3xl">📷</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Thông tin bên phải */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                {artifact.name}
              </h1>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 text-primary-dark mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-primary-dark">Năm sử dụng</p>
                    <p className="text-gray-700">{artifact.year}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-primary-dark mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-primary-dark">Khoa phòng / Bối cảnh</p>
                    <p className="text-gray-700">{artifact.department}</p>
                    <p className="text-sm text-gray-600 mt-1">{artifact.context}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary-dark mb-4">
                Mô tả lịch sử
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {artifact.description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {artifact.history}
              </p>
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-primary-dark">
              <div className="flex items-center mb-4">
                <QrCode className="w-6 h-6 mr-2 text-primary-dark" />
                <h3 className="text-lg font-bold text-primary-dark">
                  QR Code hiện vật
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Quét mã QR để xem thông tin hiện vật này trên điện thoại
              </p>
              <div className="bg-white p-4 rounded-lg flex justify-center border-2 border-gray-200">
                <QRCode
                  value={qrValue}
                  size={200}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  viewBox="0 0 256 256"
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                Dùng để đặt tại phòng trưng bày thật
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
