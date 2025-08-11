// src/App.jsx
import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { postTweet } from "./services/postService"
import Toast from "./components/Toast"

export default function App() {
  const [text, setText] = useState("")
  const [footerOpen, setFooterOpen] = useState(true)
  const [toast, setToast] = useState(null)
  const textareaRef = useRef()

  // Cmd/Ctrl + H to toggle footer (does NOT block typing 'h')
  useEffect(() => {
    function onKeyDown(e) {
      const key = (e.key || "").toLowerCase()
      const mod = e.ctrlKey || e.metaKey // Ctrl on Win/Linux, Cmd on macOS

      // Only trigger when modifier + h
      if (mod && key === "h") {
        // prevent default browser behaviour for some combos
        e.preventDefault()
        setFooterOpen((v) => !v)
      }
      // do nothing for plain 'h' -> allows typing normally
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  async function handlePost() {
    try {
      const res = await postTweet({ text })
      if (res && res.ok) {
        setToast("Tweet posted")
        setText("")
        setTimeout(() => setToast(null), 2000)
      } else {
        setToast("Failed to post")
        setTimeout(() => setToast(null), 2000)
      }
    } catch (err) {
      setToast("Error posting")
      setTimeout(() => setToast(null), 2000)
    }
  }

  // small animation presets to match Figma feel
  const footerVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.28, ease: [0.2, 0.8, 0.2, 1] } },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] } },
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-start gap-4">
          {/* avatar */}
          <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />

          {/* editor area */}
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
              rows={4}
              className="w-full resize-none outline-none text-lg leading-7 p-3 rounded-md border border-gray-200"
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

        {/* animated footer */}
        <AnimatePresence initial={false}>
          {footerOpen && (
            <motion.div
              key="footer"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={footerVariants}
              className="mt-4 border-t pt-4 text-sm text-gray-600"
            >
              Footer content — shortcuts: <span className="font-medium">Cmd/Ctrl + H</span> to toggle
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {toast && <Toast message={toast} />}
    </div>
  )
}

