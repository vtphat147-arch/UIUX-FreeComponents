# E-Education Backend API

Backend API - .NET 8.0 với PostgreSQL

## Setup

1. Copy `appsettings.example.json` → `appsettings.json`
2. Cập nhật connection string trong `appsettings.json`
3. Tạo database: `EEducationDb`
4. Chạy `CreateTable.sql` để tạo bảng
5. Chạy `InsertCourses.sql` để insert data
6. `dotnet restore` và `dotnet run`

## API

- `GET /api/Courses` - Danh sách khóa học
- `GET /api/Courses/{id}` - Chi tiết khóa học
- `POST /api/Courses` - Tạo mới
- `PUT /api/Courses/{id}` - Cập nhật
- `DELETE /api/Courses/{id}` - Xóa
