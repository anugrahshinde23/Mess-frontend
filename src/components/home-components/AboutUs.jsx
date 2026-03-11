import React from 'react'

const AboutUs = () => {
  return (
    // 1. Set container to h-screen and hide overflow to prevent all scrolling
    <div className='h-screen w-full p-20 flex flex-col gap-5 overflow-hidden'>
      
      {/* 2. Top section (Title and Text) */}
      <div className='flex justify-between gap-5 shrink-0'> 
        <div className='w-1/2'>
          <p className='text-7xl '>About Us</p>
        </div>
        <div className='flex-1'>
          <p className='text-sm font-medium line-clamp-10'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis nemo ex eum tenetur? Quia nobis incidunt molestiae. Sunt minus ex molestiae tenetur, labore ea vel ad praesentium asperiores repudiandae laboriosam fugiat, recusandae sint. Distinctio id, facere culpa cupiditate eligendi minus vero inventore corporis facilis harum deleniti quas error asperiores labore dolore minima illum, voluptatibus reiciendis, molestiae voluptatum suscipit. Eum iure quam tempora inventore totam eius ab, veniam consequatur vitae quos minus omnis beatae nesciunt ullam temporibus aliquam? Rerum tenetur in ullam magnam, earum ea alias aliquid, velit minus ducimus quidem excepturi consequuntur molestias deleniti qui ab, error autem nam porro!
          </p>
        </div>
      </div>

      {/* 3. Image container - uses flex-1 to take up ALL remaining space */}
      <div className="flex-1 overflow-hidden rounded-2xl shadow-xl border border-gray-100">
        <img 
          className="w-full h-full object-fill object-center" 
          src="https://images.unsplash.com/photo-1772089003225-6eccf98ddbf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYzfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" 
          alt="Nature scene" 
        />
      </div>
      
    </div>
  )
}

export default AboutUs
