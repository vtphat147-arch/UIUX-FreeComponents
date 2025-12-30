import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Maximize2 } from 'lucide-react'

interface FullscreenPreviewProps {
  isOpen: boolean
  onClose: () => void
  htmlCode: string
  cssCode: string
  jsCode?: string
  name: string
}

const FullscreenPreview = ({
  isOpen,
  onClose,
  htmlCode,
  cssCode,
  jsCode = '',
  name
}: FullscreenPreviewProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const previewDoc = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            width: 100%;
            height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            overflow: auto;
          }
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
        ${jsCode ? `<script>${jsCode}</script>` : ''}
      </body>
    </html>
  `

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full h-full max-w-[95vw] max-h-[95vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 ml-2">
                  {name}
                </h3>
                <div className="ml-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-semibold">
                  Fullscreen Preview
                </div>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                aria-label="Close fullscreen preview"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950 p-6">
              <div className="w-full h-full min-h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-inner border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                <iframe
                  srcDoc={previewDoc}
                  title={`Fullscreen Preview: ${name}`}
                  className="w-full h-full border-0"
                  style={{ minHeight: '600px' }}
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>

            {/* Footer Info */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nhấn <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">ESC</kbd> để đóng
              </p>
              <Maximize2 className="w-4 h-4 text-gray-400" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FullscreenPreview




