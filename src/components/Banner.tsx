import React, { useState } from 'react'
import AppleIcon from '../icon/Apple'

const Banner = () => {
  const [show, setShow] = useState(true)
  return (
    <>
      {show && (
        <div className="py-3 flex justify-between h-12 bg-blueFM px-0 sm:px-64 md:px-64">
          <div className="flex max-lg:hidden gap-2 ">
            <img className="w-6" src="assets/flag.webp" />
            <h1 className="text-white text-base">
              Join our Early Access program to test our cattle weight app on
              your ranch.
            </h1>
          </div>
          <div className="flex gap-2 items-center text-white pl-2">
            <p>Available on</p>
            <AppleIcon />
            <img src="assets/android.svg" alt="android icon" />
          </div>
          <img
            src="assets/cross.svg"
            onClick={() => setShow(false)}
          />
        </div>
      )}
    </>
  )
}

export default Banner
