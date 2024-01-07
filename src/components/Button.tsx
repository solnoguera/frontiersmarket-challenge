import React from 'react'

interface Props {
  title: string
  active?: boolean
  width?: number
}

const Button = ({ title, active, width }: Props) => {
  return (
    <div
      className={`${
        active ? 'bg-blueFM text-white' : 'border border-gray-400'
      } ${
        width ? 'w-' + width : 'w-min'
      } font-bold text-sm sm:text-base rounded-md py-2 px-3 max-md:hidden`}
    >
      <p>{title}</p>
    </div>
  )
}

export default Button
