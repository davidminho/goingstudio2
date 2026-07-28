'use client'

import { useEffect } from 'react'

export function MotionEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    document.body.classList.add('motion-ready')
    const progress = document.createElement('div')
    progress.className = 'scroll-progress'
    progress.setAttribute('aria-hidden', 'true')
    document.body.prepend(progress)

    const groups: Array<[string, string]> = [
      ['.section-head, .center-head, .page-hero .shell, .about-intro .shell', ''],
      ['.value, .project-card, .value-card, .model, .service-row, .faq-item', ''],
      ['.story img, .contact-info', 'reveal-left'],
      ['.story-grid > div:last-child, .project-form', 'reveal-right'],
      ['.cta-copy, .testimonial blockquote, .footer-grid', ''],
    ]

    groups.forEach(([selector, direction]) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.classList.add('reveal')
        if (direction) element.classList.add(direction)
        element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`)
      })
    })

    document.querySelectorAll('.project-card, .story > .shell, .location').forEach((element) => {
      element.classList.add('image-reveal')
    })

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          currentObserver.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    )

    document.querySelectorAll('.reveal, .image-reveal').forEach((element) => observer.observe(element))

    const hero = document.querySelector<HTMLElement>('.home-hero')
    let ticking = false

    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0
      progress.style.setProperty('--scroll-progress', `${percent}%`)

      if (hero && window.scrollY < hero.offsetHeight + 120) {
        const travel = Math.min(window.scrollY, hero.offsetHeight)
        hero.style.setProperty('--parallax-y', `${travel * 0.18}px`)
        hero.style.setProperty('--hero-y', `${travel * 0.07}px`)
      }
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
      progress.remove()
      document.body.classList.remove('motion-ready')
    }
  }, [])

  return null
}
