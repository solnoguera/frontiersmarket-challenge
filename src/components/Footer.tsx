import React from 'react'
import FacebookIcon from '../icon/FacebookIcon'
import InstagramIcon from '../icon/InstagramIcon'
import LinkedinIcon from '../icon/LinkedinIcon'
const Footer = () => {
  return (
    <footer className="container flex flex-col gap-10 pt-16 bottom-0 justify-center">
      <section className="flex flex-col gap-8 md:flex-row">
        <div className="flex flex-1 flex-col text-primary">
          <p className="text-borderGreen font-semibold text-base leading-10 md:text-lg md:leading-10">
            Let's keep in touch!
          </p>
          <a
            className="font-archia font-semibold text-xl md:text-2xl leading-8 md:leading-9"
            href="mailto:info@frontiersmarket.com"
          >
            info@frontiersmarket.com
          </a>
          <a
            className="font-archia font-semibold text-xl md:text-2xl leading-8 md:leading-9"
            href="tel:+1 512-387-4314"
          >
            +1 512-387-4314
          </a>
        </div>
        <div className="flex flex-1 md:justify-end items-end gap-5">
          <a
            aria-label="facebook social link"
            href="https://www.facebook.com/FrontiersMarket"
          >
            <FacebookIcon />
          </a>
          <a
            aria-label="instagram social link"
            href="https://www.instagram.com/frontiersmarket/"
          >
            <InstagramIcon />
          </a>
          <a
            aria-label="linkedin social link"
            href="https://www.linkedin.com/company/frontiersmarket"
          >
            <LinkedinIcon />
          </a>
        </div>
      </section>
      <section className="flex flex-col gap-4 font-medium text-beigeGrey border-t border-lightGrey py-8 md:flex-row md:justify-between">
        <div className="flex flex-row gap-4 text-sm">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
        <p className="text-xs md:text-sm">
          Copyright © Frontiers Market 2023. All Rights Reserved.
        </p>
      </section>
    </footer>
  )
}

export default Footer
