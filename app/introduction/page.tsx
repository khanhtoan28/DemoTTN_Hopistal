import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function GioiThieuPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-8 text-center">
            Giới thiệu
          </h1>

          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <div className="card">
              <h2 className="text-2xl font-bold text-primary-dark mb-4">
                Phòng Truyền Thống
              </h2>
              <p>
                Phòng Truyền Thống Bệnh viện Trung ương Thái Nguyên được thành lập
                nhân dịp kỷ niệm 75 năm thành lập bệnh viện (1951-2026). Đây là không gian
                lưu giữ và trưng bày những giá trị lịch sử, thành tựu và kỷ vật quý giá
                của bệnh viện qua các thời kỳ phát triển.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-primary-dark mb-4">
                Sứ mệnh
              </h2>
              <p>
                Phòng Truyền Thống có sứ mệnh bảo tồn, lưu giữ và phát huy những giá trị
                lịch sử của bệnh viện, giáo dục truyền thống cho thế hệ cán bộ nhân viên
                hiện tại và tương lai, đồng thời là điểm đến tham quan, học tập cho mọi
                người quan tâm đến lịch sử y tế.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-primary-dark mb-4">
                Nội dung trưng bày
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Sổ vàng:</strong> Các bằng khen, giấy khen, huân chương và thành
                  tích đạt được qua các thời kỳ
                </li>
                <li>
                  <strong>Hiện vật:</strong> Các thiết bị y tế, tư liệu, hình ảnh và kỷ vật
                  lịch sử quý giá
                </li>
                <li>
                  <strong>Lịch sử:</strong> Dòng lịch sử 75 năm phát triển với các cột mốc
                  quan trọng
                </li>
                <li>
                  <strong>Tư liệu:</strong> Các tài liệu, sách báo, hình ảnh ghi lại quá
                  trình phát triển
                </li>
              </ul>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-primary-dark mb-4">
                Liên hệ
              </h2>
              <p>
                Để biết thêm thông tin hoặc đóng góp hiện vật, tư liệu cho Phòng Truyền
                Thống, vui lòng liên hệ:
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Địa chỉ:</strong> Bệnh viện Trung ương Thái Nguyên
                </p>
                <p>
                  <strong>Email:</strong> info@bvtwthainguyen.vn
                </p>
                <p>
                  <strong>Điện thoại:</strong> (028) 1234 5678
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

