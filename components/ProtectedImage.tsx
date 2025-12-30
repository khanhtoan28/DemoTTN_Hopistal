'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { loadImageWithAuth } from '@/lib/utils/loadImageWithAuth'

interface ProtectedImageProps {
  src?: string
  alt?: string
  className?: string
}

export default function ProtectedImage({ src, alt = '', className = '' }: ProtectedImageProps) {
  const { token } = useAuth()
  const [imgSrc, setImgSrc] = useState<string>('')
  const ref = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const objectUrlRef = useRef<string | null>(null)

  useEffect(() => {
    let mounted = true

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(async (entry) => {
        if (!mounted) return
        if (entry.isIntersecting) {
          try {
            const loaded = await loadImageWithAuth(src, token || undefined)
            if (!mounted) return
            // revoke previous object URL if any
            if (objectUrlRef.current && objectUrlRef.current.startsWith('blob:')) {
              URL.revokeObjectURL(objectUrlRef.current)
            }
            if (loaded.startsWith('blob:')) {
              objectUrlRef.current = loaded
            } else {
              objectUrlRef.current = null
            }
            setImgSrc(loaded)
          } catch (err) {
            setImgSrc(src || '')
          }
          // stop observing after load
          if (observerRef.current && ref.current) {
            observerRef.current.unobserve(ref.current)
          }
        }
      })
    }

    if (ref.current) {
      observerRef.current = new IntersectionObserver(onIntersect, { rootMargin: '200px' })
      observerRef.current.observe(ref.current)
    } else {
      // if no ref, load immediately
      loadImageWithAuth(src, token || undefined).then((loaded) => {
        setImgSrc(loaded)
      }).catch(() => setImgSrc(src || ''))
    }

    return () => {
      mounted = false
      if (observerRef.current && ref.current) {
        try { observerRef.current.unobserve(ref.current) } catch {}
      }
      if (objectUrlRef.current && objectUrlRef.current.startsWith('blob:')) {
        try { URL.revokeObjectURL(objectUrlRef.current) } catch {}
      }
    }
  }, [src, token])

  return (
    <div ref={ref} className={className}>
      {imgSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgSrc} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
          <span className="text-4xl opacity-30">📷</span>
        </div>
      )}
    </div>
  )
}
