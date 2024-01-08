import React from 'react'
import {
  AboutUsSection,
  Banner,
  BannerSection,
  Footer,
  HowToStartSection,
  LivestockPocketSection,
  Navbar,
  SearchSection,
  SellingSection,
} from '../components'
import useFirebase from '../hooks/useFirebase'
import ChatApp from '../components/ChatApp'

const Landing = () => {
  useFirebase()
  return (
    <div className="flex flex-col">
      <div className="bg-[#FBFAFA] relative min-h-[100dvh] flex w-full flex-col">
        <Banner />
        <Navbar />
        <div className="flex-grow flex justify-center mx-4 mx-0 sm:mx-4 md:mx-64">
          <div className="flex flex-col gap-8 md:gap-16 lg:gap-20 ">
            <BannerSection />
            <SellingSection />
            <SearchSection />
            <HowToStartSection />
            <AboutUsSection />
            <img
              className="self-center"
              src="assets/logo.svg"
              alt="Logo company"
              width="104"
              height="56"
            ></img>
            <LivestockPocketSection />
            <Footer />
          </div>
        </div>
        <ChatApp />
      </div>
    </div>
  )
}

export default Landing
