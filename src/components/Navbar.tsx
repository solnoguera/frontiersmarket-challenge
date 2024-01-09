import React from 'react'
import { Link } from 'react-router-dom'
import useFirebase from '../hooks/useFirebase'
import { signOut } from 'firebase/auth'
import PhoneIcon from '../icon/PhoneIcon'

const Navbar = () => {
  const { auth } = useFirebase()
  const isLoggedIn = Boolean(
    auth?.currentUser?.email && auth?.currentUser?.email !== '',
  )
  return (
    <nav className="bg-[#FBFAFA] sticky top-0 z-30 mx-0 md:px-64">
      <div className="sm:py-4 py-6 flex flex-row items-center md:items-end justify-between gap-16">
        <div className="hidden md:flex">
          <Link to="/">
            <img
              src="assets/logo.svg"
              alt="Logo"
              width="100"
              height="32"
              className="hidden md:flex"
            />
          </Link>
        </div>
        <button className="rounded-full bg-white p-2 flex md:hidden items-center md:flex">
          <div className="rounded-full bg-white h-8 w-8 flex items-center justify-center mr-2">
            <img
              src="assets/logo_small.svg"
              alt="Logo"
              className="h-6 w-6 flex md:hidden"
            />
          </div>
        </button>
        <div className="flex flex-1 flex-row items-center justify-end gap-3">
          <div className="hidden md:flex">
            <p className="bg-white border-[#E4E7EC] border-[1px] rounded-md py-2 px-3 font-medium text-sm sm:text-base text-[#1D2939] hover:cursor-pointer">
              Browse livestock
            </p>
          </div>
          <a
            className="hidden md:flex gap-2 text-primary text-base pr-3 items-center"
            href="tel:+15123874314 "
          >
            Call us
            <PhoneIcon />
            512-387-4314
          </a>
          {isLoggedIn ? (
            <p
              className="font-bold text-sm sm:text-base rounded-md py-2 px-3 bg-blueFM text-white hover:cursor-pointer"
              onClick={() => {
                if (auth) {
                  signOut(auth)
                  document.location.reload()
                }
              }}
            >
              Log Out
            </p>
          ) : (
            <div className="flex gap-3 items-center">
              <Link to="/login">
                <p className="font-semibold text-sm sm:text-base rounded-md py-2 px-3 text-primary border border-lightGrey">
                  Log in
                </p>
              </Link>
              <Link to="/register">
                <p className="font-bold text-sm sm:text-base rounded-md py-2 px-3 bg-blueFM text-white hidden md:flex">
                  Register
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
export default Navbar
