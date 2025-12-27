import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, Heart, Copy, Check, Code2, ExternalLink } from 'lucide-react'
import Header from '../cpnents/Header'
import { designService, DesignComponent } from '../services/api'

const ComponentDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [component, setComponent] = useState<DesignComponent | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html')
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const fetchComponent = async () => {
      if (!id) return
      try {
        setLoading(true)
        const data = await designService.getComponentById(parseInt(id))
        setComponent(data)
      } catch (err) {
        console.error('Error fetching component:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchComponent()
  }, [id])

  const handleLike = async () => {
    if (!id || !component) return
    try {
      const result = await designService.likeComponent(parseInt(id))
      setComponent({ ...component, likes: result.likes })
    } catch (err) {
      console.error('Error liking component:', err)
    }
  }

  const handleCopy = async (code: string, type: string) => {
    await navigator.clipboard.writeText(code)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const getCodeByTab = () => {
    if (!component) return ''
    switch (activeTab) {
      case 'html':
        return component.htmlCode
      case 'css':
        return component.cssCode
      case 'js':
        return component.jsCode || '// No JavaScript code'
      default:
        return ''
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!component) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Component không tồn tại</h2>
            <Link to="/components" className="text-primary-600 hover:underline">
              Quay lại danh sách
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/components"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Preview Image */}
            <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src={component.preview}
                alt={component.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>

            {/* Component Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{component.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                      {component.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {component.type}
                    </span>
                    {component.framework && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {component.framework}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{component.description}</p>

              {/* Stats */}
              <div className="flex items-center gap-6 mb-6">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span>{component.likes}</span>
                </button>
                <div className="flex items-center gap-2 text-gray-600">
                  <Eye className="w-5 h-5" />
                  <span>{component.views}</span>
                </div>
              </div>

              {/* Tags */}
              {component.tags && (
                <div className="flex flex-wrap gap-2">
                  {component.tags.split(',').map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Code Tabs */}
            <div className="border-b border-gray-200 flex">
              {(['html', 'css', 'js'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Code Display */}
            <div className="p-6 bg-gray-900 min-h-[400px] max-h-[600px] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <Code2 className="w-5 h-5 text-gray-400" />
                <button
                  onClick={() => handleCopy(getCodeByTab(), activeTab)}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors text-sm"
                >
                  {copied === activeTab ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="text-gray-300 text-sm font-mono">
                <code>{getCodeByTab()}</code>
              </pre>
            </div>

            {/* Live Preview Link */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <ExternalLink className="w-5 h-5" />
                Xem Live Preview
              </button>
            </div>
          </motion.div>
        </div>

        {/* Live Preview Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Live Preview</h3>
          </div>
          <div className="p-8 bg-gray-100 min-h-[400px]">
            <iframe
              srcDoc={`
                <!DOCTYPE html>
                <html>
                  <head>
                    <style>${component.cssCode}</style>
                  </head>
                  <body>
                    ${component.htmlCode}
                    ${component.jsCode ? `<script>${component.jsCode}</script>` : ''}
                  </body>
                </html>
              `}
              className="w-full h-[400px] border border-gray-300 rounded bg-white"
              title="Component Preview"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ComponentDetail

