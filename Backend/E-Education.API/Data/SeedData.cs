using E_Education.API.Models;

namespace E_Education.API.Data
{
    public static class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            if (context.Courses.Any())
            {
                return; // Database has been seeded
            }

            var courses = new Course[]
            {
                new Course
                {
                    Title = "Lập trình Web với React",
                    Instructor = "Nguyễn Văn A",
                    Category = "programming",
                    Rating = 4.8m,
                    Reviews = 1234,
                    Students = 5432,
                    Price = 899000,
                    OriginalPrice = 1299000,
                    Duration = "40 giờ",
                    Lessons = 120,
                    Image = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
                    Level = "Cơ bản",
                    Badge = "Bán chạy",
                    Description = "Học React từ cơ bản đến nâng cao"
                },
                new Course
                {
                    Title = "Python từ Zero đến Hero",
                    Instructor = "Trần Thị B",
                    Category = "programming",
                    Rating = 4.9m,
                    Reviews = 2156,
                    Students = 8765,
                    Price = 799000,
                    OriginalPrice = 999000,
                    Duration = "50 giờ",
                    Lessons = 150,
                    Image = "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
                    Level = "Trung cấp",
                    Badge = "Mới",
                    Description = "Khóa học Python toàn diện"
                },
                new Course
                {
                    Title = "UI/UX Design Masterclass",
                    Instructor = "Lê Văn C",
                    Category = "design",
                    Rating = 4.7m,
                    Reviews = 987,
                    Students = 3421,
                    Price = 1299000,
                    OriginalPrice = 1599000,
                    Duration = "60 giờ",
                    Lessons = 180,
                    Image = "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
                    Level = "Nâng cao",
                    Badge = "Hot",
                    Description = "Thiết kế UI/UX chuyên nghiệp"
                },
                new Course
                {
                    Title = "JavaScript Nâng cao",
                    Instructor = "Phạm Thị D",
                    Category = "programming",
                    Rating = 4.8m,
                    Reviews = 1789,
                    Students = 6543,
                    Price = 999000,
                    OriginalPrice = 1199000,
                    Duration = "45 giờ",
                    Lessons = 135,
                    Image = "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
                    Level = "Nâng cao",
                    Badge = null,
                    Description = "Nâng cao kỹ năng JavaScript"
                },
                new Course
                {
                    Title = "Digital Marketing Pro",
                    Instructor = "Hoàng Văn E",
                    Category = "marketing",
                    Rating = 4.6m,
                    Reviews = 1456,
                    Students = 4321,
                    Price = 699000,
                    OriginalPrice = 899000,
                    Duration = "35 giờ",
                    Lessons = 105,
                    Image = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
                    Level = "Cơ bản",
                    Badge = "Giảm giá",
                    Description = "Marketing số hiệu quả"
                },
                new Course
                {
                    Title = "Data Science với Python",
                    Instructor = "Ngô Thị F",
                    Category = "data",
                    Rating = 4.9m,
                    Reviews = 2345,
                    Students = 9876,
                    Price = 1499000,
                    OriginalPrice = 1799000,
                    Duration = "70 giờ",
                    Lessons = 210,
                    Image = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
                    Level = "Nâng cao",
                    Badge = "Bán chạy",
                    Description = "Khoa học dữ liệu với Python"
                },
                new Course
                {
                    Title = "Figma Design từ A-Z",
                    Instructor = "Đỗ Văn G",
                    Category = "design",
                    Rating = 4.7m,
                    Reviews = 1123,
                    Students = 3987,
                    Price = 799000,
                    OriginalPrice = 999000,
                    Duration = "30 giờ",
                    Lessons = 90,
                    Image = "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop",
                    Level = "Trung cấp",
                    Badge = null,
                    Description = "Thiết kế với Figma"
                },
                new Course
                {
                    Title = "Kinh doanh Online",
                    Instructor = "Bùi Thị H",
                    Category = "business",
                    Rating = 4.5m,
                    Reviews = 987,
                    Students = 3210,
                    Price = 599000,
                    OriginalPrice = 799000,
                    Duration = "25 giờ",
                    Lessons = 75,
                    Image = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
                    Level = "Cơ bản",
                    Badge = "Mới",
                    Description = "Kinh doanh online thành công"
                }
            };

            context.Courses.AddRange(courses);
            context.SaveChanges();
        }
    }
}

