import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

/**
 * ScrollSplash — Dynamic liquid splash & ripple particle system on scroll.
 *
 * Emits reactive fluid droplets, specular highlights, and expanding water
 * ripples proportional to scroll velocity and direction.
 *
 * - Zero pointer-events interference (pointer-events: none)
 * - Retina / high-DPI crispness via devicePixelRatio
 * - Low-power idle state: stops RAF loop when particles settle
 * - Fully respects prefers-reduced-motion
 */
export default function ScrollSplash() {
  const canvasRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId = null
    let isRunning = false
    let width = 0
    let height = 0
    let dpr = 1

    // Theme color palette: electric lime, neon cyan, pearlescent aqua, water white
    const COLORS = [
      { r: 198, g: 241, b: 53 },  // lime #c6f135
      { r: 111, g: 211, b: 231 }, // cyan #6fd3e7
      { r: 168, g: 244, b: 238 }, // aqua
      { r: 235, g: 245, b: 255 }, // white sheen
    ]

    const droplets = []
    const ripples = []
    const MAX_DROPLETS = 90
    const MAX_RIPPLES = 16

    let lastScrollY = window.scrollY
    let lastScrollTime = performance.now()
    const mouse = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      hasMoved: false,
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    const onPointerMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.hasMoved = true
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true
        animationFrameId = requestAnimationFrame(render)
      }
    }

    const createRipple = (x, y, maxR, color, speed = 2.4) => {
      if (ripples.length >= MAX_RIPPLES) ripples.shift()
      ripples.push({
        x,
        y,
        r: 3,
        maxR,
        speed,
        color,
        alpha: 0.65,
        lineWidth: Math.min(Math.max(maxR * 0.04, 1.2), 2.5),
      })
    }

    const spawnDroplet = (x, y, vx, vy, size, color) => {
      if (droplets.length >= MAX_DROPLETS) droplets.shift()
      droplets.push({
        x,
        y,
        vx,
        vy,
        size,
        color,
        alpha: 0.85 + Math.random() * 0.15,
        gravity: 0.22 + Math.random() * 0.12,
        friction: 0.965,
        decay: 0.012 + Math.random() * 0.015,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.1 + Math.random() * 0.15,
      })
    }

    const triggerSplash = (originX, originY, intensity, dir) => {
      const count = Math.min(Math.floor(intensity * 0.35) + 3, 10)
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]

      // Create expanding water ripple
      const rippleRadius = Math.min(25 + intensity * 1.8, 110)
      createRipple(originX, originY, rippleRadius, color, 1.8 + intensity * 0.04)

      // Emit splash droplets
      for (let i = 0; i < count; i++) {
        // Spray angle biased opposite to scroll direction with wide cone
        const baseAngle = dir > 0 ? -Math.PI / 2 : Math.PI / 2
        const spread = (Math.random() - 0.5) * 1.8
        const angle = baseAngle + spread
        const speed = (Math.random() * 0.7 + 0.3) * (intensity * 0.28 + 3.5)

        const vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 2
        const vy = Math.sin(angle) * speed - dir * 1.5

        const dropletSize = Math.random() * 3.5 + 2
        const dropColor = COLORS[Math.floor(Math.random() * COLORS.length)]

        spawnDroplet(
          originX + (Math.random() - 0.5) * 16,
          originY + (Math.random() - 0.5) * 8,
          vx,
          vy,
          dropletSize,
          dropColor,
        )
      }
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY
      const now = performance.now()
      const dt = Math.max(now - lastScrollTime, 10)
      const deltaY = currentScrollY - lastScrollY

      lastScrollY = currentScrollY
      lastScrollTime = now

      const absDelta = Math.abs(deltaY)
      if (absDelta < 1.5) return

      const dir = deltaY > 0 ? 1 : -1 // 1: scrolling down, -1: scrolling up
      const intensity = Math.min((absDelta / dt) * 120, 48)

      // Primary splash near pointer or screen focal point
      const focalX = mouse.hasMoved
        ? mouse.x + (Math.random() - 0.5) * 40
        : width * (0.35 + Math.random() * 0.3)
      const focalY = mouse.hasMoved
        ? mouse.y
        : dir > 0
          ? height * 0.75
          : height * 0.25

      triggerSplash(focalX, focalY, intensity, dir)

      // On energetic scrolling, spawn secondary flanking spray splashes along left/right margins
      if (intensity > 14) {
        const sideX = Math.random() > 0.5 ? width * (0.05 + Math.random() * 0.15) : width * (0.8 + Math.random() * 0.15)
        const sideY = dir > 0 ? height * (0.65 + Math.random() * 0.25) : height * (0.1 + Math.random() * 0.25)
        triggerSplash(sideX, sideY, intensity * 0.7, dir)
      }

      startAnimation()
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Interactive click/tap splash burst
    const onPointerDown = (e) => {
      // Don't trigger if right-clicking
      if (e.button && e.button !== 0) return
      const burstX = e.clientX
      const burstY = e.clientY

      // Radial burst
      const burstCount = 14
      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3
        const speed = Math.random() * 4.5 + 2.5
        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed - 1.2
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        spawnDroplet(burstX, burstY, vx, vy, Math.random() * 3.8 + 2.2, color)
      }

      createRipple(burstX, burstY, 55, COLORS[1], 2.2)
      createRipple(burstX, burstY, 90, COLORS[0], 2.8)
      startAnimation()
    }

    window.addEventListener('pointerdown', onPointerDown, { passive: true })

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw and update water ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        r.r += r.speed
        r.alpha -= 0.016

        if (r.r >= r.maxR || r.alpha <= 0) {
          ripples.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r.color.r}, ${r.color.g}, ${r.color.b}, ${r.alpha})`
        ctx.lineWidth = r.lineWidth
        ctx.shadowColor = `rgba(${r.color.r}, ${r.color.g}, ${r.color.b}, 0.5)`
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.restore()
      }

      // 2. Draw and update splash droplets
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i]

        d.x += d.vx
        d.y += d.vy
        d.vy += d.gravity
        d.vx *= d.friction
        d.vy *= d.friction
        d.wobble += d.wobbleSpeed
        d.alpha -= d.decay

        if (d.alpha <= 0 || d.y > height + 40 || d.x < -30 || d.x > width + 30) {
          droplets.splice(i, 1)
          continue
        }

        const speed = Math.sqrt(d.vx * d.vx + d.vy * d.vy)
        const angle = Math.atan2(d.vy, d.vx)
        const stretch = Math.min(speed * 0.28, 2.2)
        const radiusX = d.size * (1 + stretch)
        const radiusY = Math.max(d.size * (1 - stretch * 0.25), 1.2)

        ctx.save()
        ctx.translate(d.x, d.y)
        ctx.rotate(angle)

        // Droplet body with subtle glow
        ctx.beginPath()
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${d.color.r}, ${d.color.g}, ${d.color.b}, ${d.alpha})`
        ctx.shadowColor = `rgba(${d.color.r}, ${d.color.g}, ${d.color.b}, 0.7)`
        ctx.shadowBlur = 6
        ctx.fill()

        // Liquid specular gleam highlight
        ctx.beginPath()
        ctx.ellipse(
          -radiusX * 0.25,
          -radiusY * 0.25,
          Math.max(radiusX * 0.35, 0.8),
          Math.max(radiusY * 0.35, 0.8),
          0,
          0,
          Math.PI * 2,
        )
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(d.alpha * 1.2, 0.9)})`
        ctx.shadowBlur = 0
        ctx.fill()

        ctx.restore()
      }

      // If active elements remain, continue rendering; otherwise sleep
      if (ripples.length > 0 || droplets.length > 0) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        isRunning = false
      }
    }

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointerdown', onPointerDown)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="scroll-splash-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 85,
      }}
    />
  )
}
