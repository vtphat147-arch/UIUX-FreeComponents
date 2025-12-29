import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Eye, Heart, Code2, Layout, Type, Menu, Navigation, Grid, Crown } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import Header from '../cpnents/Header'
import { designService, DesignComponent } from '../services/api'
import ComponentPreview from '../components/ComponentPreview'

const Components = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(() => {
    // Read category from URL query params
    return searchParams.get('category') || 'all'
  })
  const [selectedFramework, setSelectedFramework] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [components, setComponents] = useState<DesignComponent[]>([])
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = [
    { value: 'all', label: 'Tất cả', icon: Grid },
    { value: 'header', label: 'Headers', icon: Navigation },
    { value: 'footer', label: 'Footers', icon: Menu },
    { value: 'sidebar', label: 'Sidebars', icon: Layout },
    { value: 'layout', label: 'Layouts', icon: Grid },
    { value: 'typography', label: 'Typography', icon: Type },
  ]

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', selectedCategory)
    }
    setSearchParams(searchParams, { replace: true })
  }, [selectedCategory, searchParams, setSearchParams])

  // Read category from URL on mount and when URL changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl)
      setPagination(prev => ({ ...prev, page: 1 }))
    }
  }, [searchParams])

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        setLoading(true)
        setError(null)
        // selectedCategory === 'all' means show ALL components, not filter by category
        const category = selectedCategory === 'all' ? undefined : selectedCategory
        const framework = selectedFramework === 'all' ? undefined : selectedFramework
        const search = searchTerm.trim() || undefined
        const response = await designService.getAllComponents(
          category, 
          undefined, // type
          search, 
          undefined, // tags
          framework,
          sortBy, // sortBy parameter
          pagination.page,
          pagination.pageSize
        )
        setComponents(response.data)
        setPagination(response.pagination)
      } catch (err) {
        setError('Không thể tải danh sách components')
        console.error('Error fetching components:', err)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchComponents()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedCategory, selectedFramework, sortBy, pagination.page])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Design Components Library
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Tìm kiếm và khám phá hàng nghìn mẫu thiết kế đẹp mắt
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-6 bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-[80px] z-40">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Search Bar - Full Width */}
            <div className="mb-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm component, tags, hoặc framework..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-base"
                />
              </div>
            </div>

            {/* Filters Grid - Aligned và đẹp */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 px-1">Danh mục</label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer text-base text-gray-900"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Framework Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 px-1">Framework</label>
                <div className="relative">
                  <select
                    value={selectedFramework}
                    onChange={(e) => {
                      setSelectedFramework(e.target.value)
                      setPagination(prev => ({ ...prev, page: 1 }))
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer text-base text-gray-900"
                  >
                    <option value="all">Tất cả Framework</option>
                    <option value="react">React</option>
                    <option value="vue">Vue</option>
                    <option value="html">HTML</option>
                    <option value="tailwind">Tailwind</option>
                  </select>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 px-1">Sắp xếp</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value)
                      setPagination(prev => ({ ...prev, page: 1 }))
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer text-base text-gray-900"
                  >
                    <option value="popular">Phổ biến nhất</option>
                    <option value="newest">Mới nhất</option>
                    <option value="mostLiked">Được yêu thích nhất</option>
                    <option value="name">Tên A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count - Centered */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
                <span className="text-sm text-gray-900">
                  Tìm thấy <span className="font-bold text-indigo-600">{pagination.total}</span> components
                </span>
                {pagination.totalPages > 1 && (
                  <span className="text-sm text-gray-700">
                    • Trang <span className="font-semibold text-gray-900">{pagination.page}/{pagination.totalPages}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <Code2 className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Lỗi</h3>
              <p className="text-gray-500">{error}</p>
            </div>
          ) : components.length === 0 ? (
            <div className="text-center py-20">
              <Code2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Không tìm thấy component</h3>
              <p className="text-gray-500">Hãy thử tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {components.map((component, index) => (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col"
                >
                  {/* Preview */}
                  <Link to={`/components/${component.id}`} className="relative bg-white overflow-hidden group block">
                    <div className="relative w-full aspect-video bg-gradient-to-br from-gray-50 to-gray-100">
                      {component.htmlCode && component.cssCode ? (
                        <ComponentPreview
                          htmlCode={component.htmlCode}
                          cssCode={component.cssCode}
                          jsCode={component.jsCode || undefined}
                          name={component.name}
                          height={192}
                          lazy={true}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <Code2 className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                        {component.category}
                      </div>
                      {component.isPremium && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold z-10 flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          Premium
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" />
                    </div>
                  </Link>

                  {/* Component Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <Link to={`/components/${component.id}`}>
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-900 hover:text-indigo-600 transition-colors">
                        {component.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{component.description}</p>

                    {/* Tags */}
                    {component.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {component.tags.split(',').slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-200 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{component.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{component.likes}</span>
                      </div>
                      {component.framework && (
                        <span className="ml-auto text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                          {component.framework}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (() => {
            const currentPage = pagination.page
            const totalPages = pagination.totalPages
            const pages: (number | string)[] = []
            const showEllipsis = totalPages > 7

            if (!showEllipsis) {
              // Hiển thị tất cả các trang nếu tổng số trang <= 7
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
              }
            } else {
              // Logic hiển thị với ellipsis
              pages.push(1) // Luôn hiển thị trang đầu

              if (currentPage <= 3) {
                // Gần trang đầu: 1, 2, 3, 4, ..., totalPages
                for (let i = 2; i <= 4; i++) {
                  pages.push(i)
                }
                pages.push('ellipsis-start')
                pages.push(totalPages)
              } else if (currentPage >= totalPages - 2) {
                // Gần trang cuối: 1, ..., totalPages-3, totalPages-2, totalPages-1, totalPages
                pages.push('ellipsis-start')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                  pages.push(i)
                }
              } else {
                // Ở giữa: 1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages
                pages.push('ellipsis-start')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                  pages.push(i)
                }
                pages.push('ellipsis-end')
                pages.push(totalPages)
              }
            }

            return (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-gray-900"
                >
                  Trước
                </button>
                {pages.map((pageItem, index) => {
                  if (pageItem === 'ellipsis-start' || pageItem === 'ellipsis-end') {
                    return <span key={`ellipsis-${index}`} className="px-2 text-gray-900">...</span>
                  }
                  const page = pageItem as number
                  return (
                    <button
                      key={page}
                      onClick={() => setPagination(prev => ({ ...prev, page }))}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'border-gray-300 hover:bg-gray-50 text-gray-900'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-gray-900"
                >
                  Sau
                </button>
              </div>
            )
          })()}
        </div>
      </section>
    </div>
  )
}

export default Components


