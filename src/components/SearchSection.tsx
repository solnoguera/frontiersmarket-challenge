import React from 'react'

const SearchSection = () => {
  return (
    <section className="container mx-20 max-sm:ml-0">
      <p className="text-base text-secondary font-semibold uppercase text-greenFM">Verified listings added daily</p>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl leading-9 md:text-3xl md:leading-12 text-primary font-archia font-semibold">Thousands of Cattle to Browse</h2>
      </div>
      <form className="lg:flex flex-col gap-3 justify-end w-12/12 sm:w-11/12">
        <div className="flex">
          <input
            placeholder="What are you looking for?"
            aria-label="What are you looking for?"
            className="flex-grow border border-lightGrey rounded-l-lg text-sm text-[#475467] p-3"
            value=""
          />
          <select name="state-select" id="state-select" className="max-md:hidden border border-lightGrey text-sm text-[#475467] p-3">
            <option value="all">All States</option>
            {/* Agrega las opciones de estados aquí según tu necesidad */}
          </select>
          <button type="submit" className="flex gap-3 items-center justify-center text-lg text-white bg-secondary p-3 rounded-r-lg leading-normal bg-greenFM">
            Search
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchSection