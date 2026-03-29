import { useState, useEffect } from 'react'

export function usePropertyImages(images = [], coverImage) {
  const [activeImage, setActiveImage] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const gallery = images.length > 0 ? images : [coverImage].filter(Boolean)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && activeImage < gallery.length - 1) {
      setActiveImage(prev => prev + 1)
    }
    if (isRightSwipe && activeImage > 0) {
      setActiveImage(prev => prev - 1)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsGalleryOpen(false)
      if (e.key === 'ArrowRight' && activeImage < gallery.length - 1) setActiveImage(prev => prev + 1)
      if (e.key === 'ArrowLeft' && activeImage > 0) setActiveImage(prev => prev - 1)
    }
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden' // Bloquea scroll
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isGalleryOpen, activeImage, gallery.length])

  return {
    gallery,
    activeImage,
    setActiveImage,
    isGalleryOpen,
    setIsGalleryOpen,
    touchHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd
    }
  }
}
