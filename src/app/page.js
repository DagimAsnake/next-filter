'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const fetchPopularCourses = () => {
  return fetch('http://51.20.200.27:9000/courses').then((res) => {
    if (!res.ok) {
      throw new Error('Fetching courses failed!!!');
    }
    return res.json();
  });
};

const CoursePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularCourses = await fetchPopularCourses();
        setData(popularCourses);
      } catch (error) {
        console.error('Error fetching courses:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
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
  );
};

export default CoursePage;
