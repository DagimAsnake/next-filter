import React from 'react';

const Search = ({ searchQuery, setSearchQuery, sendDataToBackend }) => {
  return (
    <div className='md:flex items-center w-full '>
    <div className='md:w-1/4'></div>
    <div className='md:w-3/4 flex items-center justify-center'>
      <div className='flex items-center justify-between border bg-white border-gray-300 w-full max-w-screen-sm border-opacity-100 shadow-md rounded-full px-4 md:mx-5 mt-5 md:mt-0'>
        <input
          type='text'
          className='w-full border-none rounded-full py-5 px-4 text-xl focus:outline-none'
          placeholder='Search courses and more...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendDataToBackend();
            }
          }}
        />
        <p
          className='text-4xl text-gray-500 cursor-pointer'
          onClick={sendDataToBackend}
        >
          {' '}
          search{' '}
        </p>
      </div>
    </div>
  </div>
  );
};

export default Search;
