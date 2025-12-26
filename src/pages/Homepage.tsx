import { motion } from 'framer-motion'
import { BookOpen, Users, Award, ArrowRight, Play, CheckCircle, Star } from 'lucide-react'
import Header from '../cpnents/Header'

const Homepage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Khóa học đa dạng',
      description: 'Hàng nghìn khóa học từ cơ bản đến nâng cao'
    },
    {
      icon: Users,
      title: 'Giảng viên chuyên nghiệp',
      description: 'Đội ngũ giảng viên giàu kinh nghiệm và tâm huyết'
    },
    {
      icon: Award,
      title: 'Chứng chỉ uy tín',
      description: 'Nhận chứng chỉ sau khi hoàn thành khóa học'
    }
  ]

  const courses = [
    {
      id: 1,
      title: 'Lập trình Web với React',
      instructor: 'Nguyễn Văn A',
      rating: 4.8,
      students: 1234,
      price: 899000,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Python từ Zero đến Hero',
      instructor: 'Trần Thị B',
      rating: 4.9,
      students: 2156,
      price: 799000,
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'Lê Văn C',
      rating: 4.7,
      students: 987,
      price: 1299000,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'JavaScript Nâng cao',
      instructor: 'Phạm Thị D',
      rating: 4.8,
      students: 1789,
      price: 999000,
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Học tập không giới hạn, 
              <span className="text-yellow-300"> Mọi lúc mọi nơi</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Khám phá hàng nghìn khóa học chất lượng cao từ các chuyên gia hàng đầu
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
                Bắt đầu học ngay <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-200 flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" /> Xem video giới thiệu
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Khóa học phổ biến</h2>
            <p className="text-xl text-gray-600">Được yêu thích nhất bởi hàng nghìn học viên</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {course.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{course.instructor}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600 text-sm flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students.toLocaleString('vi-VN')}
                    </span>
                    <span className="text-primary-600 font-bold text-lg">
                      {course.price.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                  <button className="w-full btn-primary">Xem chi tiết</button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-secondary">Xem tất cả khóa học</button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">Tại sao chọn E-Education?</h2>
              <div className="space-y-4">
                {[
                  'Học trực tuyến mọi lúc, mọi nơi trên mọi thiết bị',
                  'Nội dung được cập nhật thường xuyên',
                  'Hỗ trợ 24/7 từ đội ngũ chuyên nghiệp',
                  'Cộng đồng học viên sôi động',
                  'Hoàn tiền 100% nếu không hài lòng'
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">10K+</div>
                  <div className="text-xl mb-8">Học viên đang học</div>
                  <div className="text-6xl font-bold mb-2">500+</div>
                  <div className="text-xl mb-8">Khóa học</div>
                  <div className="text-6xl font-bold mb-2">50+</div>
                  <div className="text-xl">Giảng viên chuyên nghiệp</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-6 h-6 text-primary-400" />
                <span className="text-xl font-bold text-white">E-Education</span>
              </div>
              <p className="text-sm">
                Nền tảng học trực tuyến hàng đầu Việt Nam. 
                Giúp bạn phát triển kỹ năng và đạt được mục tiêu học tập.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Khóa học</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Lập trình</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Design</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Marketing</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Kinh doanh</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Công ty</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Tuyển dụng</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Liên hệ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Điều khoản</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Chính sách bảo mật</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 E-Education. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Homepage

