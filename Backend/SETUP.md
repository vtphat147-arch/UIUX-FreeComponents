# Hướng dẫn Setup Backend API

## Vấn đề đã gặp và cách xử lý

Nếu bạn gặp lỗi về NuGet packages như:
- "Unable to find fallback package folder"
- "IServiceCollection does not contain a definition for 'AddDbContext'"

## Giải pháp:

### 1. Mở Terminal/PowerShell trong Visual Studio
Tools → Command Line → Developer PowerShell

### 2. Di chuyển vào thư mục project
```powershell
cd Backend\E-Education.API
```

### 3. Clear NuGet cache và restore packages
```powershell
dotnet nuget locals all --clear
dotnet restore --no-cache
```

### 4. Build project
```powershell
dotnet build
```

### 5. Hoặc trong Visual Studio:
- Right-click vào solution → Restore NuGet Packages
- Hoặc Build → Rebuild Solution

## Cấu hình Database

1. Đảm bảo PostgreSQL đang chạy
2. Tạo database:
```sql
CREATE DATABASE "EEducationDb";
```

3. Cập nhật `appsettings.json` với password PostgreSQL của bạn:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=EEducationDb;Username=postgres;Password=your_password"
}
```

## Tạo Migration và Database

Trong Package Manager Console (Tools → NuGet Package Manager → Package Manager Console):

```
Add-Migration InitialCreate
Update-Database
```

Hoặc dùng command line:
```powershell
dotnet ef migrations add InitialCreate
dotnet ef database update
```

**Lưu ý**: Cần cài đặt EF Core Tools trước:
```powershell
dotnet tool install --global dotnet-ef
```

## Chạy ứng dụng

- Nhấn F5 trong Visual Studio
- Hoặc chạy: `dotnet run`

API sẽ chạy tại:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger UI: `https://localhost:5001/swagger`

