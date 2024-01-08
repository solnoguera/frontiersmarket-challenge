import React from 'react'

const BannerSection = () => {
  return (
    <section className="max-md:px-0">
      <div
        className="relative flex flex-col items-center justify-center py-10 md:pt-24 md:pb-40"
        style={{
          backgroundImage: 'url("assets/banner.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <span className="text-sm sm:text-base bg-white text-primary font-medium gap-2 py-1 px-4 rounded-3xl">
          Trusted by 10,000+ livestock owners 🐄
        </span>
        <h1 className="text-3xl md:text-[56px] md:leading-[4rem] text-primary text-center font-archia font-semibold p-5 pb-10">
          Search Livestock For Sale
        </h1>
        <a
          className="bg-secondary text-white text-base md:text-lg font-bold rounded-lg py-4 px-11"
        >
          Browse livestock
        </a>
      </div>
    </section>
  )
}

export default BannerSection
