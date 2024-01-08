import React from 'react'
import SearchIcon from '../icon/SearchIcon'

const SearchSection = () => {
  return (
    <section className="container mx-20 max-sm:ml-0">
      <p className="text-base text-secondary font-semibold uppercase text-greenFM">
        Verified listings added daily
      </p>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl leading-9 md:text-3xl md:leading-12 text-primary font-archia font-semibold">
          Thousands of Cattle to Browse
        </h2>
      </div>
      <form className="lg:flex flex-col gap-3 justify-end w-12/12 sm:w-11/12">
        <div className="flex">
          <input
            placeholder="What are you looking for?"
            aria-label="What are you looking for?"
            className="flex-grow border border-lightGrey rounded-l-lg text-sm text-[#475467] p-3"
            value=""
          />
          <select
            name="state-select"
            id="state-select"
            className="max-md:hidden border border-lightGrey text-sm text-[#475467] p-3"
          >
            <option value="all">All States</option>
          </select>
          <button className="flex gap-3 items-center justify-center text-lg text-white bg-secondary p-3 rounded-r-lg leading-normal bg-greenFM">
            Search
            <SearchIcon />
          </button>
        </div>
      </form>
    </section>
  )
}

export default SearchSection
