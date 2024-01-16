import React from 'react';
import thePic from '../../../public/thePic.png';
import Image from 'next/image';

const univer = [
  {
    id: 1,
    name: 'Stanford',
    courses: '1474 courses',
  },
  {
    id: 2,
    name: 'Stanford',
    courses: '1474 courses',
  },
  {
    id: 3,
    name: 'Stanford',
    courses: '1474 courses',
  },
  {
    id: 4,
    name: 'Stanford',
    courses: '1474 courses',
  },
  {
    id: 5,
    name: 'Stanford',
    courses: '1474 courses',
  },
];

const page = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 m-10'>
        {univer.map((uni) => (
          <div key={uni.id}>
            <div className='flex items-center border-b-2 mb-4 p-2'>
              <div>
                <Image
                  className='w-8 h-8 rounded-full'
                  src={thePic}
                  alt='Neil image'
                />
              </div>
              <p className='text-sm font-medium text-gray-900 mx-3'>
                {uni.name}
              </p>
              <p className='text-sm text-gray-500'>
                {uni.courses}
              </p>
              <div className='text-base font-semibold text-gray-900 ml-auto'>
                next
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
