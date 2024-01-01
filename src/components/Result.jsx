import React from 'react';
import Link from 'next/link';

const Result = ({ data }) => {
  return (
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
  );
};

export default Result;
