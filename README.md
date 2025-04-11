# Quản Lý Thành Viên FCJ

Dự án quản lý thành viên FCJ bao gồm hệ thống quản trị viên và API backend.

## 🚀 Tính năng

- Quản lý thành viên
- Quản lý sự kiện
- Quản lý khóa học
- Dashboard thống kê
- Xác thực và phân quyền người dùng

## 🛠 Công nghệ sử dụng

### Backend (aptisAPI)
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- JWT Authentication
- Swagger API Documentation

### Frontend (quanLyThanhVienAdmin)
- Next.js
- TypeScript
- Tailwind CSS
- React Query
- React Hook Form

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 18.x
- PostgreSQL >= 14.x
- Yarn hoặc npm

### Backend Setup

1. Cài đặt dependencies:
```bash
cd aptisAPI
yarn install
```

2. Cấu hình môi trường:
```bash
cp .env.example .env
```
Chỉnh sửa các biến môi trường trong file `.env`

3. Chạy migrations:
```bash
yarn prisma migrate dev
```

4. Khởi động server:
```bash
yarn start:dev
```

### Frontend Setup

1. Cài đặt dependencies:
```bash
cd quanLyThanhVienAdmin
yarn install
```

2. Cấu hình môi trường:
```bash
cp .env.example .env
```
Chỉnh sửa các biến môi trường trong file `.env`

3. Khởi động development server:
```bash
yarn dev
```

## 📚 API Documentation

API documentation có sẵn tại `/swagger` khi chạy backend server.

## 🧪 Testing

### Backend Tests
```bash
cd aptisAPI
yarn test
```

### Frontend Tests
```bash
cd quanLyThanhVienAdmin
yarn test
```

## 🏗 Cấu trúc dự án

### Backend (aptisAPI)
```
src/
├── auth/           # Authentication module
├── users/          # User management
├── events/         # Event management
├── courses/        # Course management
├── dashboard/      # Dashboard statistics
├── strategy/       # Authentication strategies
├── app.module.ts   # Main module
└── main.ts         # Application entry point
```

### Frontend (quanLyThanhVienAdmin)
```
src/
├── app/            # Next.js app directory
│   ├── api/        # API routes
│   ├── dashboard/  # Dashboard pages
│   ├── events/     # Event pages
│   └── users/      # User pages
├── components/     # Reusable components
├── services/       # API services
└── styles/         # Global styles
```

## 🔒 Security

- JWT Authentication
- Role-based Access Control
- Input Validation
- CORS Protection
- Rate Limiting

## 📈 Performance

- Caching
- Lazy Loading
- Code Splitting
- Database Indexing
- Query Optimization

## 🤝 Contributing

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Hayden - Initial work

## 🙏 Acknowledgments

- NestJS Team
- Next.js Team
- All contributors 
