import React from 'react'
import VerifiedIcon from '../icon/VerifiedIcon'
import FacebookIcon from '../icon/FacebookIcon'
import GoogleIcon from '../icon/GoogleIcon'
import EyeIcon from '../icon/EyeIcon'
import ArrowIcon from '../icon/ArrowIcon'
import { Link } from 'react-router-dom'
import CrossIcon from '../icon/CrossIcon'

const Register = () => {
  return (
    <main className='flex flex-col bg-[#FBFAFA] md:flex-row min-h-screen'>
    <section className="flex flex-1 justify-center">
  <div className="container pt-4 flex flex-col lg:max-w-[400px] gap-6">
    <div className="flex flex-col justify-center basis-full gap-6">
      <a className="w-fit" href="/">
        <img src="assets/logo.svg" alt="logo 1" width="105" height="56" 
        // style="aspect-ratio: 1.875 / 1;"
        style={{aspectRatio: "1.875 / 1"}}
        />
      </a>
      <section className="flex flex-col justify-center gap-10 max-md:py-4">
        <div>
          <h1 className="font-archia font-semibold text-2xl lg:text-3xl leading-11 text-primary">Create account</h1>
          <h2 className="flex items-center gap-1 font-medium text-base text-[#475467]">
            Already a user?
            <Link to="/login">
                <a className="flex items-center gap-1 font-semibold text-base text-[#1D2939]" href="/login">
                Log in here
                <ArrowIcon />
                </a>
            </Link>
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          <form className="flex flex-col" data-cy="form-register">
            <fieldset className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 relative">
                <input name="name" 
                // required="" 
                placeholder="Name" type="text" className="gap-1 border rounded-lg text-sm text-darkerGrey p-3 lg:p-4 flex-grow border-lightGrey bg-white" value=""/>
              </div>
              <div></div>
              <div className="flex flex-col gap-1 relative">
                <input name="email" 
                // required="" 
                placeholder="Email" type="email" className="gap-1 border rounded-lg text-sm text-darkerGrey p-3 lg:p-4 flex-grow border-lightGrey bg-white" value="" />
              </div>
              <div></div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-center relative items-center">
                  <input className="gap-1 border rounded-lg bg-white text-sm text-[#475467] p-3 lg:p-4 flex-grow border-lightGrey" name="password" 
                //   required="" 
                //   control="[object Object]" 
                  placeholder="Password" type="password" value=""/>
                  <button type="button" className="absolute right-5" aria-label="toggle password visibility">
                    <EyeIcon />
                  </button>
                </div>
              </div>
            </fieldset>
            <div className="px-4 pb-6 pt-2 text-xs">
              <ul>
                <li className="flex items-center gap-3 text-gray-500">
                    <CrossIcon />
                    <span>At least 8 characters</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500">
                    <CrossIcon />
                    <span>Contains a number or symbol</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500">
                    <CrossIcon />
                    <span>Contains a letter</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <button data-cy="btn-login" type="submit" className="flex gap-3 items-center justify-center font-bold text-lg text-white bg-secondary p-3 lg:p-4 rounded-lg leading-normal disabled:opacity-25 bg-greenFM">
                Register
              </button>
              <div className="flex flex-row items-center gap-3 font-semibold text-beigeGrey">
                <hr className="w-full"/>
                <span>OR</span>
                <hr className="w-full"/>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <button type="button" className="flex items-center justify-center w-full gap-3 p-3 lg:p-4 font-semibold lg:text-lg text-[#1D2939] rounded-lg bg-white border border-lightGrey">
                    <GoogleIcon />
                     Continue with Google
                </button>
                <button type="button" className="flex items-center justify-center w-full gap-3 p-3 lg:p-4 font-semibold lg:text-lg text-[#1D2939] rounded-lg bg-white border border-lightGrey">
                    <FacebookIcon />
                    Continue with Facebook
                </button>
              </div>
              <p className="font-medium text-sm text-center text-[#202427] pt-4">
                By selecting Register, I agree to
                <a href="/terms-of-service"> Terms of Service.</a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
    <section className="flex flex-col gap-4 font-medium text-beigeGrey border-t border-lightGrey py-8">
      <div className="flex flex-row gap-4 text-sm">
        <a href="/terms-of-service">Terms of Service</a>
        <a href="/privacy-policy">Privacy Policy</a>
      </div>
      <p className="text-xs md:text-sm">Copyright © Frontiers Market 2023. All Rights Reserved.</p>
    </section>
  </div>
</section>
    
    <section className="relative max-lg:hidden flex flex-1">
        <img
            src="assets/login_1350x1800.webp"
            alt="verified"
            className="absolute w-full h-full object-cover"
        />
        <article className="z-10 flex flex-col gap-1 justify-end basis-full p-5 pb-14 md:p-10 lg:p-20 xl:pr-40">
            <div className="font-semibold text-right text-white lg:text-left">
            <p className="font-archia text-xl leading-8">John Graham</p>
            <p className="text-base leading-8">Golden Ranch, Texas</p>
            <div className="flex items-center gap-2 justify-end lg:justify-start">
                <p className="text-base leading-8">Verified Seller on Frontiers Market</p>
                <VerifiedIcon />
            </div>
            </div>
        </article>
    </section>
    </main>
  )
}

export default Register