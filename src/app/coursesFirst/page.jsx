'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Courses = () => {
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    try {
      const response = await fetch(`http://51.20.200.27:9000/categories/`);
      const category = await response.json();
      setCategories(category);
    } catch (error) {
      console.error('Error searching courses:', error);
    }
  };

  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  const filterOne = [
    { id: 1, title: 'With Certificate', value: '' },
    { id: 2, title: 'Free Course', value: '' },
    { id: 3, title: 'University Course Only', value: '' },
  ];

  const filterTwo = [
    { id: 1, title: 'Beginner', value: 1 },
    { id: 2, title: 'Intermediate', value: 2 },
    { id: 3, title: 'Advanced', value: 3 },
  ];

  const filterThree = [
    { id: 1, title: '1-5 hours' },
    { id: 2, title: '5-10 hours' },
    { id: 3, title: '10+ hours' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  const [filterOneValues, setFilterOneValues] = useState(filterOne);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('')

  const [levelVisible, setLevelVisible] = useState(false);
  const [durationVisible, setDurationVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);

  const toggleLevel = () => setLevelVisible(!levelVisible);
  const toggleDuration = () => setDurationVisible(!durationVisible);
  const toggleCategory = () => setCategoryVisible(!categoryVisible);

  const handleFilterOneToggle = (index) => {
    setFilterOneValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = {
        ...updatedValues[index],
        value: updatedValues[index].value === '' ? true : '',
      };
      return updatedValues;
    });
  };

  const sendDataToBackend = async () => {
    const dataBack = {
      hasCertificate:
        filterOneValues[0].value === '' ? '' : filterOneValues[0].value,
      isFree: filterOneValues[1].value === '' ? '' : filterOneValues[1].value,
      isUniversity:
        filterOneValues[2].value === '' ? '' : filterOneValues[2].value,
      levelID: selectedLevel,
      topicID: searchQuery ? "" : courseId,
      searchQuery: searchQuery,
      categoryID: selectedCategory,
    };

    console.log(dataBack);

    try {
      const response = await fetch('http://51.20.200.27:9000/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataBack),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response Data:', responseData);
        setData(responseData);
      } else {
        console.log('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    sendDataToBackend();
  }, [filterOneValues, selectedLevel, courseId, selectedCategory]);

  useEffect(() => {
    getCategory();
  }, []);

  if (data.length === 0) {
    return <h1>There are no courses for that search and course id</h1>;
  }

  return (
    <>
      <div className='px-4 md:px-10'>
        <div className='flex flex-wrap justify-center max-w-screen mx-auto my-4'>
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
        </div>
        <div className='md:flex'>
          <div className='md:w-1/4 p-4'>
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
                            checked={filters.id === selectedLevel}
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
          </div>
          <div className='md:w-3/4 py-4'>
            <div className='flex flex-wrap overflow-hidden'>
              {data.map((course) => (
                <div
                  className='max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg my-4'
                  key={course.id}
                >
                  <div className='px-6 py-4'>
                    <div className='font-bold text-xl mb-2'>{course.title}</div>
                    <Link href={`/courses?courseId=${course.courseTopicId}`}>
                      <p className='p-2 text-sm text-black bg-blue-100 rounded-md'>
                        {course.courseTopic}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;