import React, { useState } from 'react'
import ArrowIcon from '../icon/ArrowIcon'
import VerifiedIcon from '../icon/VerifiedIcon'
import GoogleIcon from '../icon/GoogleIcon'
import EyeIcon from '../icon/EyeIcon'
import { Link, useNavigate } from 'react-router-dom'
import useFirebase from '../hooks/useFirebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {
  regexEmail,
  regexPassword,
  transformEmailIntoUsername,
} from '../utils/constants'
import { toast } from 'react-toastify'

interface ErrorState {
  name?: string
  email?: string
  password?: string
}

const Login = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [errorMsg, setErrorMsg] = useState<ErrorState>({
    name: '',
    email: '',
    password: '',
  })
  const { auth, loginWithGoogle } = useFirebase()
  const navigate = useNavigate()
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      e.preventDefault()
      if (auth && email && password) {
        if (!regexEmail.test(email)) {
          setErrorMsg((prevState) => {
            return { ...prevState, email: 'Provide a valid email' }
          })
          return
        } else {
          setErrorMsg((prevState) => {
            return { ...prevState, email: '' }
          })
        }
        if (!regexPassword.test(password)) {
          setErrorMsg((prevState) => {
            return { ...prevState, password: 'Provide a valid password' }
          })
          return
        } else {
          setErrorMsg((prevState) => {
            return { ...prevState, password: '' }
          })
        }
        const user = await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
        const userName: string = transformEmailIntoUsername(email)
        localStorage.setItem('uid', user.user.uid)
        localStorage.setItem('username', userName)
        toast.success('Logged in successfuly!')
      }
    } catch (error: any) {
      toast.error(`${error?.name}: ${error?.code}`)
    }
  }
  return (
    <main className="flex flex-col bg-[#FBFAFA] md:flex-row min-h-screen">
      <section className="flex flex-1 justify-center">
        <div className="container pt-4 flex flex-col lg:max-w-[400px] gap-6">
          <div className="flex flex-col justify-center basis-full gap-6">
            <Link to="/">
              <p className="w-fit">
                <img
                  src="assets/logo.svg"
                  alt="logo 1"
                  width="105"
                  height="56"
                  style={{ aspectRatio: '1.875 / 1' }}
                />
              </p>
            </Link>
            <section className="flex flex-col justify-center gap-10 max-md:py-4">
              <div>
                <h1 className="font-archia font-semibold text-2xl lg:text-3xl leading-11 text-primary">
                  Welcome back
                </h1>
                <h3 className="flex items-center gap-1 font-medium text-base text-[#475467]">
                  Don't have an account?
                  <Link to="/register">
                    <p className="flex items-center gap-1 font-semibold text-base text-[#1D2939]">
                      Register now
                      <ArrowIcon />
                    </p>
                  </Link>
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <form className="flex flex-col gap-8" data-cy="form-login">
                  <fieldset className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 relative">
                      <input
                        name="email"
                        required
                        placeholder="Email"
                        type="email"
                        data-cy="input-email"
                        className="gap-1 border rounded-lg text-sm text-darkerGrey p-3 lg:p-4 flex-grow border-lightGrey bg-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {errorMsg?.email && (
                      <p className="text-redFM text-xs">{errorMsg?.email}</p>
                    )}
                    <div></div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-center relative items-center">
                        <input
                          className="gap-1 border rounded-lg bg-white text-sm text-[#475467] p-3 lg:p-4 flex-grow border-lightGrey"
                          name="password"
                          required
                          placeholder="Password"
                          data-cy="input-password"
                          type={`${passwordVisibility ? 'password' : 'text'}`}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-5"
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setPasswordVisibility(!passwordVisibility)
                          }
                        >
                          <EyeIcon />
                        </button>
                      </div>
                    </div>
                    <p
                      data-cy="link-forgot"
                      className="lg:self-end font-semibold text-sm md:text-base text-[#1D2939]"
                      aria-label="Forgot password"
                      onClick={()=>toast.error("Sorry! Please create a new account. Didnt have the time to implement everything")}
                    >
                      Forgot password?
                    </p>
                  </fieldset>
                  <div className="flex flex-col gap-3">
                    <button
                      data-cy="btn-login"
                      type="submit"
                      className="flex gap-3 items-center justify-center font-bold text-lg text-white bg-secondary p-3 lg:p-4 rounded-lg leading-normal disabled:opacity-25 bg-greenFM"
                      onClick={(e) => handleLogin(e)}
                    >
                      Log in
                    </button>
                    <div className="flex flex-row items-center gap-3 font-semibold text-beigeGrey">
                      <hr className="w-full" />
                      <span>OR</span>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                      <button
                        type="button"
                        className="flex items-center justify-center w-full gap-3 p-3 lg:p-4 font-semibold lg:text-lg text-[#1D2939] rounded-lg bg-white border border-lightGrey"
                        onClick={loginWithGoogle}
                      >
                        <GoogleIcon />
                        Continue with Google
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
          <section className="flex flex-col gap-4 font-medium text-beigeGrey border-t border-lightGrey py-8">
            <div className="flex flex-row gap-4 text-sm">
              <p>Terms of Service</p>
              <p>Privacy Policy</p>
            </div>
            <p className="text-xs md:text-sm">
              Copyright © Frontiers Market 2023. All Rights Reserved.
            </p>
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
              <p className="text-base leading-8">
                Verified Seller on Frontiers Market
              </p>
              <VerifiedIcon />
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Login
