import React from 'react';

const Filter = ({
  filterOneValues,
  handleFilterOneToggle,
  filterTwo,
  selectedLevel,
  setSelectedLevel,
  levelVisible,
  toggleLevel,
  filterThree,
  durationVisible,
  toggleDuration,
  categories,
  categoryVisible,
  toggleCategory,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div>
    <div className='flex items-center mb-1 text-2xl'>
      <p className='mr-1'>ttt</p>
      <h2 className='font-semibold'>Filter By</h2>
    </div>
    <div className='p-5 ml-1 bg-white'>
      {filterOneValues.map((filters) => (
        <div className='ml-4' key={filters.id}>
          <label className='flex items-center'>
            <input
              type='checkbox'
              className='form-checkbox mr-2'
              checked={filters.value}
              onChange={() => handleFilterOneToggle(filters.id - 1)}
            />
            {filters.title}
          </label>
        </div>
      ))}

      <div
        className='flex justify-between items-center cursor-pointer'
        onClick={toggleLevel}
      >
        <h2 className='text-lg font-semibold mb-1'>Level</h2>
        {levelVisible ? 'AAA' : 'aaaa'}
      </div>

      {levelVisible && (
        <>
          {filterTwo.map((filters) => (
            <div className='ml-4' key={filters.id}>
              <label className='flex items-center'>
                <input
                  name='level'
                  type='radio'
                  className='form-checkbox mr-2'
                  checked={filters.value === selectedLevel}
                  onChange={() => setSelectedLevel(filters.value)}
                />
                {filters.title}
              </label>
            </div>
          ))}
        </>
      )}

      <div
        className='flex justify-between items-center cursor-pointer'
        onClick={toggleDuration}
      >
        <h2 className='text-lg font-semibold mb-1'>Duration</h2>
        {durationVisible ? 'AAA' : 'aaaa'}
      </div>

      {durationVisible && (
        <>
          {filterThree.map((filters) => (
            <div className='ml-4' key={filters.id}>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox mr-2'
                  checked={false}
                  onChange={() => {}}
                />
                {filters.title}
              </label>
            </div>
          ))}
        </>
      )}

      <div
        className='flex justify-between items-center cursor-pointer'
        onClick={toggleCategory}
      >
        <h2 className='text-lg font-semibold mb-1'>Category</h2>
        {categoryVisible ? 'AAA' : 'aaaa'}
      </div>

      {categoryVisible && (
        <>
          {categories.map((filters) => (
            <div className='ml-4' key={filters.id}>
              <label className='flex items-center'>
                <input
                 type='radio'
                  className='form-checkbox mr-2'
                  checked={filters.id === selectedCategory}
                  onChange={() => setSelectedCategory(filters.id)}
                />
                {filters.categoryName}
              </label>
            </div>
          ))}
        </>
      )}
    </div>
  </div>
  );
};

export default Filter;
