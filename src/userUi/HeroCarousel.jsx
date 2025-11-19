import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroCarousel({ className = "" }) {
  return (
    <div className={`w-full rounded-2xl overflow-hidden shadow bg-white ${className}`}>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        spaceBetween={12}
        slidesPerView={1}
      >
        {[
          { title: "Fresh from Farm", subtitle: "Up to 20% OFF on leafy greens", img: "https://media.tehrantimes.com/d/t/2021/06/20/4/3808608.jpg" },
          { title: "Organic Picks", subtitle: "Certified organic vegetables", img: "https://www.timeoutsharjah.com/cloud/timeoutsharjah/2021/09/09/EpOxSCN3-Online-bulk-buying-now-available-at-NRTC-UAE-1200x800.jpg" },
          { title: "Bulk Orders", subtitle: "Best mandi rates for kg/quintal", img: "https://i0.wp.com/fruitandvegdirect.com/wp-content/uploads/2024/05/wholesale.webp?fit=800%2C800&ssl=1" },
        ].map((b, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-48 md:h-64">
              <img src={b.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 text-white">
                <h2 className="text-2xl md:text-3xl font-bold">{b.title}</h2>
                <p className="text-sm md:text-base mt-1">{b.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
