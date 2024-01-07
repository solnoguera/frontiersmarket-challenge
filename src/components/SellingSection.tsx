import React, { useState } from 'react'
import SearchSection from './SearchSection';

const SellingSection = () => {
    const [buying, setBuying] = useState(true);
    return (
        <>
          <section className="container pt-6">
            <p className="text-center text-base text-secondary font-semibold uppercase text-greenFM">Trusted livestock marketplace</p>
            <h2 className="text-center text-2xl leading-9 md:text-[36px] md:leading-12 text-primary font-archia font-semibold">
              Why buy & sell on Frontiers Market?
            </h2>
            <section className="flex flex-col items-center py-6 md:py-8">
              <div className="flex gap-2 border border-slate-300 rounded-3xl p-1">
                <button type="button" className={`font-semibold text-sm lg:text-base px-4 py-2 rounded-3xl bg-secondary ${!buying ? "bg-greenFM text-white": "text-textGreyFM"}`} onClick={()=>setBuying(false)}>
                  I'm here for selling
                </button>
                <button type="button" className={`font-semibold text-sm lg:text-base px-4 py-2 rounded-3xl ${buying ? "bg-greenFM text-white" : "text-textGreyFM"}`} onClick={()=>setBuying(true)}>
                  I'm here for buying
                </button>
              </div>
            </section>
            <section className="bullets flex flex-col md:mt-6">
              <article className="bullet-marker flex flex-col-reverse md:flex-row gap-8 md:gap-28 md:ml-10 md:pl-10 md:pr-4">
                <div className="flex flex-1 flex-col md:gap-2 md:pt-10 lg:pt-20">
                  <p className="font-semibold text-sm text-secondary leading-5 uppercase text-greenFM">
                    { buying ? "Large selection" : "Free to list" }
                  </p>
                  <p className="font-semibold text-xl md:text-[28px] text-primary leading-8 md:leading-15">
                    { buying ? "Top Classes and Breeds" : "Sell to a National Market" }
                  </p>
                  <p className="font-medium text-base md:text-lg text-grey leading-6 md:leading-7">
                    { buying ? 
                    "Find the cattle you're looking for with our large catalog of livestock across the United States. Search for breed, weight, age, and more to add only the highest quality cattle to your ranch." 
                    : "Sell to anyone from industry giants to small-scale operations wanting to buy your product. Ensure fair, competitive prices in the national market with buyers you can trust. Get listings seen for free." }
                  </p>
                </div>
                <div className="flex flex-1 justify-center md:justify-end">
                  <picture>
                    <source srcSet={`${buying ? "assets/d-buying-1.webp" : "assets/d-selling-1.webp"}`} type="image/webp" />
                    <img src={`${buying ? "assets/d-buying-1.webp" : "assets/d-selling-1.webp"}`} width="360px" decoding="async" loading="lazy" alt="Free to list" />
                  </picture>
                </div>
              </article>

              <article className="bullet-marker flex flex-col-reverse md:flex-row gap-8 md:gap-28 md:ml-10 md:pl-10 md:pr-4">
                <div className="flex flex-1 flex-col md:gap-2 md:pt-10 lg:pt-20">
                  <p className="font-semibold text-sm text-secondary leading-5 uppercase text-greenFM">Get more details</p>
                  <p className="font-semibold text-xl md:text-[28px] text-primary leading-8 md:leading-15">
                    { buying ? "Informed Purchasing" : "Make More Sales" }
                  </p>
                  <p className="font-medium text-base md:text-lg text-grey leading-6 md:leading-7">
                    { buying ? 
                    "Discuss animal health and history, negotiate prices, and learn about operations directly from the seller. View reviews from previous buyers." 
                    : "Access to Frontiers Market's marketplace means you are seen by thousands of potential buyers. As soon as you are verified to sell, get offers from all over the country." }
                    
                  </p>
                </div>
                <div className="flex flex-1 justify-center md:justify-end">
                  <picture>
                    <source srcSet={`${buying ? "assets/d-buying-2.webp" : "assets/d-selling-2.webp"}`} type="image/webp" />
                    <img src={`${buying ? "assets/d-buying-2.webp" : "assets/d-selling-2.webp"}`} width="362px" decoding="async" loading="lazy" alt="Get more details" />
                  </picture>
                </div>
              </article>

              <article className="bullet-marker flex flex-col-reverse md:flex-row gap-8 md:gap-28 md:ml-10 md:pl-10 md:pr-4">
                <div className="flex flex-1 flex-col md:gap-2 md:pt-10 lg:pt-20">
                  <p className="font-semibold text-sm text-secondary leading-5 uppercase text-greenFM">
                    { buying ? "Buy & Sell safely" : "Instant messaging" }
                  </p>
                  <p className="font-semibold text-xl md:text-[28px] text-primary leading-8 md:leading-15">
                    { buying ? "Hassle-Free Transactions" : "Quick & Easy Process" }
                  </p>
                  <p className="font-medium text-base md:text-lg text-grey leading-6 md:leading-7">
                    { buying ? "Making an offer and closing a deal with sellers is safe and easy through Frontiers Market. Each listing is verified for authenticity and our team is available for support." 
                    : "Connect quickly with buyers and negotiate directly until you are satisfied. Your cattle don't leave the ranch until you meet a buyer you like." }
                  </p>
                </div>
                <div className="flex flex-1 justify-center md:justify-end">
                  <picture>
                    <source srcSet={`${buying ? "assets/d-buying-3.webp" : "assets/d-selling-3.webp"}`} type="image/webp" />
                    <img src={`${buying ? "assets/d-buying-3.webp" : "assets/d-selling-3.webp"}`} width="374px" decoding="async" loading="lazy" alt="Instant messaging" />
                  </picture>
                </div>
              </article>
            </section>
        </section>
      </>
    );
}

export default SellingSection