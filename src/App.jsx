import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { postTweet } from './services/postService'
import Toast from './components/Toast'

export default function App() {
  const [text, setText] = useState('')
  const [footerOpen, setFooterOpen] = useState(true)
  const [toast, setToast] = useState(null)
  const textareaRef = useRef()

  // Ctrl/Cmd + Enter to toggle footer
  useEffect(() => {
    function onKeyDown(e) {
      const isEnter = e.key === 'Enter'
      const modifier = e.ctrlKey || e.metaKey
      if (modifier && isEnter) {
        e.preventDefault()
        setFooterOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  async function handlePost() {
    try {
      const res = await postTweet({ text })
      if (res && res.ok) {
        setToast('Tweet posted')
        setText('')
        setTimeout(() => setToast(null), 2000)
      } else {
        setToast('Failed to post')
        setTimeout(() => setToast(null), 2000)
      }
    } catch (err) {
      setToast('Error posting')
      setTimeout(() => setToast(null), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
              className="w-full resize-none outline-none text-lg leading-7 p-3 rounded-md border border-gray-200"
              rows={4}
            />
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">Characters: {text.length}</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePost}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:opacity-95"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {footerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.2,0.8,0.2,1] }}
              className="mt-4 border-t pt-4 text-sm text-gray-600"
            >
              Footer content — shortcuts: <span className="font-medium">Ctrl/Cmd + Enter</span> to toggle
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {toast && <Toast message={toast} />}
    </div>
  )
}
