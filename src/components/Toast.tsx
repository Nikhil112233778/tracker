'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
}

const toastColors = {
  success: { bg: '#10B981', icon: '✓' },
  error: { bg: '#EF4444', icon: '✕' },
  info: { bg: '#3B82F6', icon: 'ℹ' },
}

// Global toast queue
let toastQueue: ToastMessage[] = []
let listeners: Array<(toasts: ToastMessage[]) => void> = []

function notifyListeners() {
  listeners.forEach((listener) => listener([...toastQueue]))
}

export const toast = {
  success: (message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    toastQueue.push({ id, type: 'success', message })
    notifyListeners()

    setTimeout(() => {
      toastQueue = toastQueue.filter((t) => t.id !== id)
      notifyListeners()
    }, 3000)
  },
  error: (message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    toastQueue.push({ id, type: 'error', message })
    notifyListeners()

    setTimeout(() => {
      toastQueue = toastQueue.filter((t) => t.id !== id)
      notifyListeners()
    }, 3000)
  },
  info: (message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    toastQueue.push({ id, type: 'info', message })
    notifyListeners()

    setTimeout(() => {
      toastQueue = toastQueue.filter((t) => t.id !== id)
      notifyListeners()
    }, 3000)
  },
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    const listener = (newToasts: ToastMessage[]) => {
      setToasts(newToasts)
    }

    listeners.push(listener)

    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center gap-2 px-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const config = toastColors[toast.type]

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="pointer-events-auto shadow-2xl rounded-xl px-4 py-3 flex items-center gap-3 max-w-md w-full"
              style={{ backgroundColor: config.bg }}
            >
              <span className="text-xl text-white font-bold">{config.icon}</span>
              <span className="flex-1 text-white font-medium text-sm">
                {toast.message}
              </span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
