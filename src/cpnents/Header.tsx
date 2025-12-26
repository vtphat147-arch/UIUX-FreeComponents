import { BookOpen } from "lucide-react"
import { Link } from "react-router-dom"
    
const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">E-Education</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">Trang chủ</Link>
            <Link to="/courses" className="text-gray-700 hover:text-primary-600 transition-colors">Khóa học</Link>
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">Về chúng tôi</a>
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">Liên hệ</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary-600 transition-colors">Đăng nhập</button>
            <button className="btn-primary">Đăng ký</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header