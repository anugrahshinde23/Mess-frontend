import React, { useState } from 'react'

const ContactUs = () => {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")



  const handleCreateFeedBack = async (e) => {
    e.preventDefault()

    alert(name)
    console.log(name, email, phone,message);
    

  }


  return (
    <>
    
    <div className='bg-indigo-100 w-full h-screen flex flex-col px-20 py-5 gap-20' >
        <div className=''>
            <p className='text-xl font-medium text-indigo-500'>MessMate</p>
        </div>
        <div className='flex-1 flex gap-40 '>
            <div id='contact-head' className='flex flex-col gap-5  justify-center'>
                <p className='text-5xl font-semibold'>Contact Us</p>
                <p className='text-zinc-600'>Email, call, or complete the form to learn how<br></br> MessMate can solve your problems</p>
                <p className='text-zinc-600'>info@messmate.in</p>
                <p className='text-zinc-600'>+91 9359631019</p>

                <div className="flex gap-7 mt-15">
                    <div className='flex flex-col gap-2'>
                        <p className='text-md font-bold'>Customer Support</p>
                        <p className='text-sm text-zinc-600'>Our support team is available<br></br>around the clock to address any<br></br>concern or queries you may<br></br> have.</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-md font-bold'>FeedBack And Suggestions</p>
                        <p className='text-sm text-zinc-600'>We value your feedback and are <br></br>continously working to improve <br></br> MessMate. Your input is crucial in <br></br> shaping the future of MessMate.</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-md font-bold'>Verity Inqueries</p>
                        <p className='text-sm text-zinc-600' >For Verity AI related queries <br></br> please contact on phone <br></br> 9359631019.</p>
                    </div>
                </div>
            </div>
            <div id='contact-form' className=' flex-1  flex  justify-center'>
                <div className='bg-white w-3/4 h-fit p-10 flex flex-col gap-10 rounded-2xl shadow-2xl'>
                    <div className='flex flex-col gap-2'>
                    <p className='text-3xl font-medium'>Get In Touch</p>
                    <p className='text-zinc-600'>You can reach us anytime</p>
                    </div>

                    <form className='flex flex-col gap-5'>
                        <input onChange={(e) => setName(e.target.value)} name='name' type="text" placeholder='Full Name' className='border border-zinc-300 p-3 rounded-2xl' />
                        <input onChange={(e) => setEmail(e.target.value)} name='email' type="text" placeholder='Email' className='border border-zinc-300 p-3 rounded-2xl' />
                        <input onChange={(e) => setPhone(e.target.value)} name='phone' type="text" placeholder='Phone' className='border border-zinc-300 p-3 rounded-2xl' />
                        <textarea onChange={(e) => setMessage(e.target.value)} name='message' rows="5" placeholder='Leave a message'  id="" className='border border-zinc-300 p-3 rounded-2xl'>

                        </textarea>
                    </form>
                    <div className='flex flex-col gap-2'>
                        <button onClick={handleCreateFeedBack} className='bg-indigo-500 rounded-2xl hover:bg-indigo-400 text-sm font-bold cursor-pointer p-3 text-white'>Submit</button>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default ContactUs