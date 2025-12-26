import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Star, Users, Clock, BookOpen, Grid, List } from 'lucide-react'
import Header from '../cpnents/Header'
import { courseService } from '../services/api'

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'programming', name: 'Lập trình' },
    { id: 'design', name: 'Thiết kế' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'business', name: 'Kinh doanh' },
    { id: 'data', name: 'Data Science' }
  ]

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        setError(null)
        const category = selectedCategory === 'all' ? undefined : selectedCategory
        const search = searchTerm.trim() || undefined
        const data = await courseService.getAllCourses(search, category)
        setCourses(data)
      } catch (err) {
        setError('Không thể tải danh sách khóa học')
        console.error('Error fetching courses:', err)
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchCourses()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedCategory])

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Cơ bản': return 'bg-green-100 text-green-800'
      case 'Trung cấp': return 'bg-yellow-100 text-yellow-800'
      case 'Nâng cao': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case 'Bán chạy': return 'bg-orange-500'
      case 'Mới': return 'bg-green-500'
      case 'Hot': return 'bg-red-500'
      case 'Giảm giá': return 'bg-blue-500'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Danh sách khóa học
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Khám phá hàng nghìn khóa học chất lượng từ các chuyên gia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm sticky top-[73px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học, giảng viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Tìm thấy <span className="font-semibold text-primary-600">{courses.length}</span> khóa học
          </div>
        </div>
      </section>

      {/* Courses Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Lỗi</h3>
              <p className="text-gray-500">{error}</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Không tìm thấy khóa học</h3>
              <p className="text-gray-500">Hãy thử tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }>
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ${
                    viewMode === 'list' ? 'flex' : 'flex flex-col'
                  }`}
                >
                  {/* Course Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-64 h-48 flex-shrink-0' : 'h-48'}`}>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {course.badge && (
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-semibold ${getBadgeColor(course.badge)}`}>
                        {course.badge}
                      </div>
                    )}
                    <div className={`absolute top-3 right-3 ${getLevelColor(course.level)} px-2 py-1 rounded-full text-xs font-semibold`}>
                      {course.level}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className={`p-5 flex flex-col flex-1 ${viewMode === 'list' ? 'w-full' : ''}`}>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>

                    {/* Course Meta */}
                    <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-gray-400">({course.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString('vi-VN')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">{course.lessons}</span> bài học
                      </div>
                      <div className="flex items-center gap-2">
                        {course.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {course.originalPrice.toLocaleString('vi-VN')} đ
                          </span>
                        )}
                        <span className="text-xl font-bold text-primary-600">
                          {course.price.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full btn-primary mt-auto">
                      Xem chi tiết
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

export default Courses
