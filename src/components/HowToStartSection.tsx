import React from 'react'
import { Link } from 'react-router-dom'

const HowToStartSection = () => {
  return (
    <section className="bg-how-to-start py-14 md:py-24">
      <div className="relative container flex flex-col items-center justify-center py-4">
        <p className="z-10 text-center text-base text-secondary font-semibold uppercase text-greenFM">
          How to start
        </p>
        <h2 className="z-10 text-center text-2xl leading-9 md:text-3xl md:leading-12 text-primary font-archia font-semibold">
          Start selling around the country
        </h2>
        <div className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 md:py-16">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className="flex flex-col gap-2 p-4 bg-tertiary md:bg-transparent"
            >
              <div className="flex items-center flex-row md:flex-col gap-2">
                <span className="text-secondary text-lg md:text-4xl font-bold text-greenFM">
                  {step}
                </span>
                <span className="text-primary text-base md:text-lg font-semibold">
                  {step === 1 && 'Create a free account'}
                  {step === 2 && 'Get approved to sell'}
                  {step === 3 && 'Add cattle listing'}
                  {step === 4 && 'Appear in our catalog'}
                </span>
              </div>
              <p className="text-sm md:text-base md:text-center text-grey">
                {step === 1 &&
                  "We don't collect any fee for listing livestock."}
                {step === 2 && 'We strive for providing the highest security.'}
                {step === 3 &&
                  'We help you create a listing including breed, age, weight.'}
                {step === 4 &&
                  'Thousands of nationwide buyers searching for livestock every day!'}
              </p>
            </div>
          ))}
        </div>
        <Link to="/register">
          <p
            className="z-10 text-white text-base text-center md:text-lg font-bold rounded-lg py-3 px-4 max-sm:w-full md:px-18 bg-secondary bg-greenFM mt-32"
            aria-disabled="false"
          >
            Create Account
          </p>
        </Link>
        <picture className="z-0 absolute">
          <source srcSet="assets/us_country.webp" type="image/webp" />
          <img
            className="object-contain sm:object-cover max-md:object-bottom object-top max-md:translate-y-9 md:scale-x-110"
            src="assets/us_country.webp"
            alt="map"
            width="90%"
          />
        </picture>
      </div>
    </section>
  )
}

export default HowToStartSection
