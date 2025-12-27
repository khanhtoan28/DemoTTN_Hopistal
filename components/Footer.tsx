import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo và thông tin */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <Image 
                  src="/img/logo.webp" 
                  alt="Logo Bệnh viện Trung ương Thái Nguyên"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-semibold">BỆNH VIỆN TRUNG ƯƠNG</div>
                <div className="text-sm">THÁI NGUYÊN</div>
              </div>
            </div>
            <p className="text-sm text-white opacity-80">
              Phòng Truyền Thống
            </p>
          </div>

          {/* Địa chỉ */}
          <div>
            <h3 className="font-semibold mb-4">Địa chỉ</h3>
            <p className="text-sm text-white opacity-80">
              Thái Nguyên, Việt Nam
            </p>
            <p className="text-sm text-white opacity-80 mt-2">
              Email: info@bvtwthainguyen.vn
            </p>
          </div>

          {/* Kỷ niệm */}
          <div>
            <h3 className="font-semibold mb-4">Kỷ niệm 75 năm</h3>
            <p className="text-2xl font-bold text-white">
              1951 - 2026
            </p>
            <p className="text-sm text-white opacity-80 mt-2">
              Hành trình 75 năm phục vụ nhân dân
            </p>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <p className="text-sm text-white opacity-60">
            © 2026 Bệnh viện Trung ương Thái Nguyên. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}

