import { Code2 } from "lucide-react"
import { Link } from "react-router-dom"
    
const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">UI Components</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">Trang chủ</Link>
            <Link to="/components" className="text-gray-700 hover:text-primary-600 transition-colors">Components</Link>
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">Templates</a>
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">About</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary-600 transition-colors">Login</button>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header