import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import useFirebase from '../hooks/useFirebase'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'

const Navbar = () => {
  const { auth } = useFirebase()
  const isLoggedIn = auth?.currentUser?.email
  return (
    <nav className="bg-[#FBFAFA] sticky top-0 z-30">
      <div className="sm:py-4 py-6 flex flex-row items-center md:items-end justify-between gap-16">
        <div className="hidden md:flex">
          <a href="/">
            <picture>
              <img
                src="assets/logo.svg"
                alt="Logo"
                width="100"
                height="32"
                className="hidden md:flex"
              />
            </picture>
          </a>
        </div>
        <button className="rounded-full bg-white p-2 flex md:hidden items-center md:flex">
          <div className="rounded-full bg-white h-8 w-8 flex items-center justify-center mr-2">
            <img
              src="assets/logo_small.svg"
              alt="Logo"
              className="h-6 w-6 flex md:hidden"
            />
          </div>
          <svg
            className="flex sm:hidden"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="22"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            ></path>
          </svg>
        </button>
        <div className="flex flex-1 flex-row items-center justify-end gap-3">
          <div className="hidden md:flex">
            <a
              className="bg-white border-[#E4E7EC] border-[1px] rounded-md py-2 px-3 font-medium text-sm sm:text-base text-[#1D2939]"
              href="/browse"
            >
              Browse livestock
            </a>
          </div>
          <a
            className="hidden md:flex gap-2 text-primary text-base pr-3 items-center"
            href="tel:+15123874314 "
          >
            Call us
            <svg
              width="11"
              height="16"
              viewBox="0 0 11 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 1.5V2C7.5 2.28125 7.25 2.5 7 2.5H4C3.71875 2.5 3.5 2.28125 3.5 2V1.5H2.5C1.9375 1.5 1.5 1.96875 1.5 2.5V13.5C1.5 14.0625 1.9375 14.5 2.5 14.5H8.5C9.03125 14.5 9.5 14.0625 9.5 13.5V2.5C9.5 1.96875 9.03125 1.5 8.5 1.5H7.5ZM0 2.5C0 1.125 1.09375 0 2.5 0H8.5C9.875 0 11 1.125 11 2.5V13.5C11 14.9062 9.875 16 8.5 16H2.5C1.09375 16 0 14.9062 0 13.5V2.5Z"
                fill="#008627"
              ></path>
            </svg>
            512-387-4314
          </a>
          {isLoggedIn ? (
            <a
              className="font-bold text-sm sm:text-base rounded-md py-2 px-3 bg-blueFM text-white hidden md:flex"
              onClick={() => {
                signOut(auth)
                document.location.reload()
              }}
            >
              Log Out
            </a>
          ) : (
            <div className="flex gap-3 items-center">
              <Link to="/login">
                <a className="font-semibold text-sm sm:text-base rounded-md py-2 px-3 text-primary border border-lightGrey">
                  Log in
                </a>
              </Link>
              <Link to="/register">
                <a className="font-bold text-sm sm:text-base rounded-md py-2 px-3 bg-blueFM text-white hidden md:flex">
                  Register
                </a>
              </Link>
            </div>
          )}

          {/* <Button title="Log In" />
            <Button title="Register" /> */}
        </div>
      </div>
    </nav>
  )
}
export default Navbar
