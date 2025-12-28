import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, ArrowRight } from 'lucide-react'
import Header from '../cpnents/Header'

const RegisterSuccess = () => {
  const location = useLocation()
  const email = location.state?.email || 'email của bạn'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      <div className="flex items-center justify-center min-h-screen pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h1>
            <p className="text-gray-600 mb-6">
              Chúng tôi đã gửi email xác thực đến <span className="font-semibold text-gray-900">{email}</span>
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Vui lòng kiểm tra email của bạn</p>
                  <p className="text-sm text-blue-800">
                    Click vào link trong email để xác thực tài khoản. Link sẽ hết hạn sau 24 giờ.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/login"
                className="block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Đăng nhập ngay
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-gray-500">
                Bạn có thể đăng nhập ngay, nhưng một số tính năng sẽ bị hạn chế cho đến khi xác thực email.
              </p>
            </div>
          </div>

          {/* Help section */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700">
            <p className="font-semibold mb-2">Không nhận được email?</p>
            <ul className="text-left space-y-1 list-disc list-inside">
              <li>Kiểm tra thư mục spam/junk</li>
              <li>Đợi vài phút, email có thể đến chậm</li>
              <li>Đảm bảo địa chỉ email chính xác</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterSuccess

