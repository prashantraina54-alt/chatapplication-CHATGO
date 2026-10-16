// import React, { useEffect, useRef } from 'react'
// import dp from "../assets/dp.webp"
// import { useSelector } from 'react-redux'
// function ReceiverMessage({image,message}) {
//   let scroll=useRef()
//   let {selectedUser}=useSelector(state=>state.user)
//   useEffect(()=>{
//     scroll?.current.scrollIntoView({behavior:"smooth"})
//   },[message,image])
  
//   const handleImageScroll=()=>{
//     scroll?.current.scrollIntoView({behavior:"smooth"})
//   }
//   return (
//     <div className='flex items-start gap-[10px]' >
//            <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg ' >
//          <img src={selectedUser.image || dp} alt="" className='h-[100%]'/>
//          </div>
//           <div ref={scroll} className='w-fit max-w-[500px] px-[20px] py-[10px]  bg-[rgb(23,151,194)] text-white text-[19px] rounded-tl-none rounded-2xl relative left-0  shadow-gray-400 shadow-lg gap-[10px] flex flex-col'>
//         {image &&  <img src={image} alt="" className='w-[150px] rounded-lg' onLoad={handleImageScroll}/>}
//        {message && <span >{message}</span>}
//        </div>
     
//         </div>
//   )
// }

// export default ReceiverMessage
import React, { useEffect, useRef } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux'

function ReceiverMessage({image,message}) {
  let scroll=useRef()
  let {selectedUser}=useSelector(state=>state.user)

  useEffect(()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"})
  },[message,image])

  const handleImageScroll=()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"})
  }

  return (
    <div className='flex items-end gap-[8px]'>
      <div className='w-[36px] h-[36px] rounded-full overflow-hidden flex-shrink-0'
        style={{border:'2px solid #e8eaf6', boxShadow:'0 2px 8px rgba(99,102,241,0.15)'}}>
        <img src={selectedUser.image || dp} alt="" className='h-[100%] w-full object-cover'/>
      </div>
      <div
        ref={scroll}
        className='w-fit max-w-[480px] px-[16px] py-[10px] rounded-[18px] rounded-tl-[4px] gap-[8px] flex flex-col'
        style={{
          background:'#ffffff',
          border:'1.5px solid #e8eaf6',
          boxShadow:'0 4px 15px rgba(99,102,241,0.08)',
          color:'#1e1b4b',
          fontSize:'16px'
        }}
      >
        {image && <img src={image} alt="" className='w-[160px] rounded-[10px]' onLoad={handleImageScroll}/>}
        {message && <span>{message}</span>}
      </div>
    </div>
  )
}

export default ReceiverMessage