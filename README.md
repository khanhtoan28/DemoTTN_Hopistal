# Phòng Truyền Thống - Bệnh viện Trung ương Thái Nguyên

Website trưng bày kỷ niệm 75 năm thành lập bệnh viện (1951-2026).

## Tính năng

- 🏠 **Home**: Trang chủ với hero banner, các khối giới thiệu và cột mốc vàng
- 🏆 **Sổ vàng**: Gallery bằng khen, giấy khen với bộ lọc và trang chi tiết
- 📦 **Hiện vật**: Danh mục hiện vật với QR code và bộ lọc
- 📱 **Chi tiết hiện vật**: Trang chi tiết với QR code để đặt tại phòng trưng bày
- ⏰ **Lịch sử**: Dòng lịch sử 75 năm phát triển
- ℹ️ **Giới thiệu**: Thông tin về phòng truyền thống

## Công nghệ

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React QR Code
- Lucide React Icons

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Chạy production
npm start
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## Cấu trúc dự án

```
├── app/
│   ├── page.tsx              # Trang chủ
│   ├── golden-book/              # Sổ vàng - Bằng khen
│   ├── artifact/             # Danh mục hiện vật
│   │   └── [id]/             # Chi tiết hiện vật
│   ├── history/              # Lịch sử 75 năm
│   └── introduction/           # Giới thiệu
├── components/
│   ├── Header.tsx            # Header với menu
│   └── Footer.tsx            # Footer
└── ...
```

## Màu sắc

- Primary Dark: `#5C3A21`
- Primary Light: `#E7D7B2`

## Ghi chú

- Dữ liệu hiện tại là dữ liệu mẫu, cần thay thế bằng dữ liệu thực từ API hoặc database
- Ảnh placeholder cần được thay thế bằng ảnh thực tế
- QR code sẽ link đến trang chi tiết hiện vật trên website

