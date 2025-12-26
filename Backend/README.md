# E-Education Backend API

Backend API cho hệ thống E-Education được xây dựng bằng .NET 8.0, Entity Framework Core và PostgreSQL.

## Yêu cầu

- .NET 8.0 SDK
- PostgreSQL 12+ 
- Visual Studio 2022 hoặc Visual Studio Code

## Cài đặt

### 1. Cài đặt PostgreSQL

Đảm bảo PostgreSQL đã được cài đặt và đang chạy. Tạo database mới:

```sql
CREATE DATABASE "EEducationDb";
```

### 2. Cấu hình Connection String

Cập nhật file `appsettings.json` hoặc `appsettings.Development.json` với thông tin kết nối PostgreSQL của bạn:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=EEducationDb;Username=your_username;Password=your_password"
  }
}
```

### 3. Cài đặt EF Core Tools (nếu chưa có)

```bash
dotnet tool install --global dotnet-ef
```

### 4. Tạo Migration và Database

```bash
cd E-Education.API
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Hoặc trong Visual Studio, sử dụng Package Manager Console:
```
Add-Migration InitialCreate
Update-Database
```

### 5. Chạy ứng dụng

```bash
dotnet run
```

Hoặc chạy từ Visual Studio (F5)

API sẽ chạy tại:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger UI: `https://localhost:5001/swagger`

## API Endpoints

### Courses

- `GET /api/Courses` - Lấy danh sách tất cả khóa học
  - Query parameters:
    - `search` (optional): Tìm kiếm theo tên khóa học hoặc giảng viên
    - `category` (optional): Lọc theo category (all, programming, design, marketing, business, data)
  
- `GET /api/Courses/{id}` - Lấy chi tiết khóa học theo ID

- `POST /api/Courses` - Tạo khóa học mới

- `PUT /api/Courses/{id}` - Cập nhật khóa học

- `DELETE /api/Courses/{id}` - Xóa khóa học

## Cấu trúc Project

```
E-Education.API/
├── Controllers/          # API Controllers
├── Data/                # DbContext và Seed Data
├── Models/              # Entity Models
├── Migrations/          # EF Core Migrations
├── Properties/          # Launch settings
└── Program.cs           # Entry point và configuration
```

## Seed Data

Dữ liệu mẫu sẽ được tự động seed khi ứng dụng khởi động lần đầu (nếu database trống).

## CORS

API đã được cấu hình CORS để cho phép frontend (React) kết nối từ:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (React default)

