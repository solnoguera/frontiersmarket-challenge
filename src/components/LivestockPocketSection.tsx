import React from 'react'
import AppleIcon from '../icon/Apple'
import ArrowRightIcon from '../icon/ArrowRightIcon'

const LivestockPocketSection = () => {
  return (
    <section className="container">
      <div className="z-10 relative bg-livestockFM grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 rounded-lg">
        <div className="row-start-2 md:row-start-1 flex flex-col justify-between gap-1 md:pt-28 md:pl-8 lg:pb-9 lg:pl-16">
          <div className="z-10 max-md:px-4 flex flex-col gap-2 text-primary">
            <p className="font-medium leading-6 text-base md:text-xl md:font-semibold md:leading-8">
              Livestock in your pocket
            </p>
            <h2 className="font-archia font-semibold text-2xl leading-9 lg:text-[40px] lg:leading-10">
              Weigh your livestock <br />
              with our free app
            </h2>
            <p className="bg-blueFM flex items-center justify-center gap-2 mt-5 md:self-start font-bold text-base md:text-lg leading-7 bg-primary text-white rounded-lg px-4 py-3 md:px-9 md:py-4">
              Get Early Access
              <ArrowRightIcon />
            </p>
          </div>
          <div className="md:hidden flex self-center items-center gap-1 p-1 rounded-lg">
            <span className="text-primary font-medium text-base">
              Available on
            </span>
            <AppleIcon color="#000" />
            <img src="assets/android.svg" alt="android icon" />
          </div>
          <div className="rounded-b-lg flex items-center justify-center md:justify-start flex-row gap-2 bg-tertiary md:bg-transparent">
            <img
              className="hidden lg:block"
              src="assets/ranchers.webp"
              alt="Ranchers"
              width="84"
              height="32"
            />
            <p className="flex items-center gap-1 text-grey text-base xlg:text-[20px] leading-8 font-semibold py-3">
              Trusted by the biggest U.S. ranchers
              <img src="assets/flag.webp" width="24" height="24" alt="flag" />
            </p>
          </div>
        </div>
        <picture className="row-start-1 flex justify-center md:justify-end">
          <source
            className="rounded-lg"
            srcSet="assets/pocket_mobile.webp"
            type="image/webp"
            media="(max-width: 768px)"
            width="100%"
          />
          <source
            className="rounded-lg"
            srcSet="assets/pocket_desktop.webp"
            type="image/webp"
            width="522"
            height="470"
          />
          <source
            className="rounded-lg"
            media="(max-width: 768px)"
            srcSet="assets/pocket_mobile.webp"
            width="100%"
          />
          <img
            className="rounded-lg"
            src="assets/pocket_desktop.webp"
            alt="Phone"
            width="522"
            height="470"
          />
        </picture>
        <picture className="absolute max-md:hidden">
          <source
            className="object-fill object-top"
            srcSet="assets/map.webp"
            type="image/webp"
            style={{ aspectRatio: '1120 / 470' }}
            width="100%"
          />
          <img
            className="object-fill object-top"
            src="assets/map.webp"
            alt="frame-desktop"
            style={{ aspectRatio: '1120 / 470' }}
            width="100%"
          />
        </picture>
      </div>
    </section>
  )
}
export default LivestockPocketSection
