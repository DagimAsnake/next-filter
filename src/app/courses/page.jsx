'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Filter from '@/components/Filter';
import Search from '@/components/Search';
import Result from '@/components/Result';

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
        levelID: searchQuery ? "" : selectedLevel,
        topicID: searchQuery ? "" : courseId,
        searchQuery: searchQuery,
        categoryID: searchQuery ? "" : selectedCategory,
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
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sendDataToBackend={sendDataToBackend}
          />
        </div>
        <div className='md:flex'>
          <Filter
            filterOneValues={filterOneValues}
            handleFilterOneToggle={handleFilterOneToggle}
            filterTwo={filterTwo}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            levelVisible={levelVisible}
            toggleLevel={toggleLevel}
            filterThree={filterThree}
            durationVisible={durationVisible}
            toggleDuration={toggleDuration}
            categories={categories}
            categoryVisible={categoryVisible}
            toggleCategory={toggleCategory}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Result data={data} />
        </div>
      </div>
    </>
  );
};

export default Courses;
