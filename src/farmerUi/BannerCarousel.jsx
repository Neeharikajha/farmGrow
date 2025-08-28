"use client"

import { useEffect, useState } from "react"

export default function BannerCarousel() {
  const banners = [
    {
      title: "Offer 1",
      desc: "Get the best deals of the season.",
      bg: "bg-pink-100",
      titleColor: "text-pink-800",
      descColor: "text-pink-600",
    },
    {
      title: "Offer 2",
      desc: "Exclusive discounts just for you.",
      bg: "bg-purple-100",
      titleColor: "text-purple-800",
      descColor: "text-purple-600",
    },
    {
      title: "Offer 3",
      desc: "Limited time — don’t miss out!",
      bg: "bg-green-100",
      titleColor: "text-green-800",
      descColor: "text-green-600",
    },
  ]

  const [current, setCurrent] = useState(0)

  // Auto-slide every 3 seconds (instead of 1s)
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % banners.length)
  }, 5000)
    return () => clearInterval(interval)
  }, [banners.length])

  return (
    <div className="w-full rounded-xl overflow-hidden shadow mb-6 relative">
      {/* Slide Container */}
      <div
        className="flex transition-transform duration-[1500ms] ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner, idx) => (
          <div
            key={idx}
            className={`w-full flex-shrink-0 flex items-center justify-between px-8 h-[120px] sm:h-[130px] md:h-[140px] lg:h-[140px] xl:h-[140px] ${banner.bg}`}
          >
            <div>
              <h2 className={`text-2xl font-bold ${banner.titleColor}`}>
                {banner.title}
              </h2>
              <p className={`${banner.descColor} mt-2`}>{banner.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === current ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
