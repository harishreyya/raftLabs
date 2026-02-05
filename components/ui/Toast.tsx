"use client"

import { useEffect } from "react"

export default function Toast({
  message,
  onClose
}: {
  message: string
  onClose: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 2000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="rounded-xl bg-gray-900 px-4 py-3 text-sm text-white shadow-lg animate-in fade-in slide-in-from-bottom-2">
        {message}
      </div>
    </div>
  )
}