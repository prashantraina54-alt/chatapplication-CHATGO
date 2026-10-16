
import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import axios from 'axios';
import { serverUrl } from '../main';
import { setMessages } from '../redux/messageSlice';

function MessageArea() {
  let {selectedUser,userData,socket}=useSelector(state=>state.user)
  let dispatch=useDispatch()
  let [showPicker,setShowPicker]=useState(false)
  let [input,setInput]=useState("")
  let [frontendImage,setFrontendImage]=useState(null)
  let [backendImage,setBackendImage]=useState(null)
  let image=useRef()
  let {messages}=useSelector(state=>state.message)

  const handleImage=(e)=>{
    let file=e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleSendMessage=async (e)=>{
    e.preventDefault()
    if(input.length==0 && backendImage==null){
      return
    }
    try {
      let formData=new FormData()
      formData.append("message",input)
      if(backendImage){
        formData.append("image",backendImage)
      }
      let result=await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,formData,{withCredentials:true})
      dispatch(setMessages([...messages,result.data]))
      setInput("")
      setFrontendImage(null)
      setBackendImage(null)
    } catch (error) {
      console.log(error)
    }
  }

  const onEmojiClick=(emojiData)=>{
    setInput(prevInput=>prevInput+emojiData.emoji)
    setShowPicker(false)
  }

  useEffect(()=>{
    socket?.on("newMessage",(mess)=>{
      dispatch(setMessages([...messages,mess]))
    })
    return ()=>socket?.off("newMessage")
  },[messages,setMessages])

  return (
    <div className={`lg:w-[70%] relative ${selectedUser?"flex":"hidden"} lg:flex w-full h-full overflow-hidden`}
      style={{background:'linear-gradient(160deg,#f8f9ff 0%,#f0f4ff 100%)'}}>

      {selectedUser &&
        <div className='w-full h-[100vh] flex flex-col overflow-hidden'>

          {/* Chat Header */}
          <div className='w-full h-[72px] flex-shrink-0 flex items-center gap-[14px] px-[20px]'
            style={{background:'#ffffff', borderBottom:'1px solid #e8eaf6', boxShadow:'0 2px 12px rgba(99,102,241,0.07)'}}>
            <div className='cursor-pointer p-[6px] rounded-full transition-all duration-200'
              style={{background:'#f0f4ff'}}
              onClick={()=>dispatch(setSelectedUser(null))}>
              <IoIosArrowRoundBack className='w-[26px] h-[26px]' style={{color:'#6366f1'}}/>
            </div>
            <div className='w-[46px] h-[46px] rounded-full overflow-hidden flex-shrink-0'
              style={{border:'2px solid #e8eaf6'}}>
              <img src={selectedUser?.image || dp} alt="" className='h-[100%] w-full object-cover'/>
            </div>
            <div>
              <h1 className='font-bold text-[17px]' style={{color:'#1e1b4b'}}>{selectedUser?.name || "user"}</h1>
              <p className='text-[12px]' style={{color:'#818cf8'}}>Active now</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className='w-full flex-1 flex flex-col py-[20px] px-[20px] overflow-auto gap-[12px]' style={{paddingBottom:'100px'}}>
            {showPicker &&
              <div className='absolute bottom-[100px] left-[20px] z-[100]'>
                <EmojiPicker width={280} height={360} onEmojiClick={onEmojiClick}/>
              </div>
            }
            {messages && messages.map((mess,i)=>(
              mess.sender==userData._id
                ? <SenderMessage key={i} image={mess.image} message={mess.message}/>
                : <ReceiverMessage key={i} image={mess.image} message={mess.message}/>
            ))}
          </div>
        </div>
      }

      {/* Input Bar */}
      {selectedUser &&
        <div className='w-full lg:w-[70%] h-[80px] fixed bottom-0 flex items-center justify-center px-[16px]'
          style={{background:'rgba(255,255,255,0.9)', backdropFilter:'blur(12px)', borderTop:'1px solid #e8eaf6'}}>
          {frontendImage &&
            <img src={frontendImage} alt="" className='w-[70px] absolute bottom-[85px] right-[20px] rounded-[12px]'
              style={{boxShadow:'0 4px 15px rgba(99,102,241,0.2)', border:'2px solid #e8eaf6'}}/>
          }
          <form
            className='w-full h-[52px] flex items-center gap-[14px] px-[18px] rounded-[26px]'
            style={{background:'#f0f4ff', border:'1.5px solid #e0e4ff', boxShadow:'0 2px 12px rgba(99,102,241,0.1)'}}
            onSubmit={handleSendMessage}
          >
            <div onClick={()=>setShowPicker(prev=>!prev)} className='cursor-pointer p-[4px] rounded-full transition-all'
              style={{color:'#818cf8'}}>
              <RiEmojiStickerLine className='w-[22px] h-[22px]'/>
            </div>

            <input type="file" accept="image/*" ref={image} hidden onChange={handleImage}/>
            <input
              type="text"
              className='w-full h-full outline-none border-0 text-[16px] bg-transparent'
              style={{color:'#3730a3'}}
              placeholder='Type a message...'
              onChange={(e)=>setInput(e.target.value)}
              value={input}
            />

            <div onClick={()=>image.current.click()} className='cursor-pointer' style={{color:'#818cf8'}}>
              <FaImages className='w-[22px] h-[22px]'/>
            </div>

            {(input.length>0 || backendImage!=null) &&
              <button className='w-[38px] h-[38px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200'
                style={{background:'linear-gradient(135deg,#6366f1,#818cf8)', boxShadow:'0 4px 12px rgba(99,102,241,0.4)'}}>
                <RiSendPlane2Fill className='w-[18px] h-[18px] text-white'/>
              </button>
            }
          </form>
        </div>
      }

      {/* Welcome Screen */}
      {!selectedUser &&
        <div className='w-full h-full flex flex-col justify-center items-center gap-[12px]'>
          <div className='w-[80px] h-[80px] rounded-full flex items-center justify-center mb-[8px]'
            style={{background:'linear-gradient(135deg,#6366f1,#818cf8)', boxShadow:'0 8px 30px rgba(99,102,241,0.35)'}}>
            <span className='text-white text-[36px]'>💬</span>
          </div>
          <h1 className='font-bold text-[36px]' style={{color:'#1e1b4b'}}>Welcome to ChatGo</h1>
          <span className='text-[18px]' style={{color:'#818cf8'}}>Chat Must Go !</span>
        </div>
      }
    </div>
  )
}

export default MessageArea