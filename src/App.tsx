import React from 'react';
import { Footer, Banner, Main, Navbar, BannerSection, SellingSection, SearchSection, HowToStartSection, AboutUsSection, LivestockPocketSection } from './components';

function App() {
  return (
    <div className="flex flex-col">
      <div className='bg-[#FBFAFA] relative min-h-[100dvh] flex w-full flex-col'>
        <Banner />
        <Navbar />
        <div className='flex-grow flex justify-center mx-4 sm:mx-32 md:mx-64'>
            <div className='flex flex-col gap-8 md:gap-16 lg:gap-20 '>
              <BannerSection />
              <SellingSection />
              <SearchSection />
              <HowToStartSection />
              <AboutUsSection />
              <img className="self-center" src="assets/logo.svg" alt="Logo company" width="104" height="56"></img>
              <LivestockPocketSection />
              <Footer />

            </div>
        </div>
        {/* <Main /> */}
      </div>
    </div>
  );
}

export default App;
