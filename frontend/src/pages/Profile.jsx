
import React, { useRef, useState } from 'react'
import dp from "../assets/dp.webp"
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';

function Profile() {
    let {userData}=useSelector(state=>state.user)
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let [name,setName]=useState(userData.name || "")
    let [frontendImage,setFrontendImage]=useState(userData.image || dp)
    let [backendImage,setBackendImage]=useState(null)
    let image=useRef()
    let [saving,setSaving]=useState(false)

    const handleImage=(e)=>{
        let file=e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleProfile=async (e)=>{
        e.preventDefault()
        setSaving(true)
        try {
            let formData=new FormData()
            formData.append("name",name)
            if(backendImage){
                formData.append("image",backendImage)
            }
            let result=await axios.put(`${serverUrl}/api/user/profile`,formData,{withCredentials:true})
            setSaving(false)
            dispatch(setUserData(result.data))
            navigate("/")
        } catch (error) {
            console.log(error)
            setSaving(false)
        }
    }

  return (
    <div className='w-full h-[100vh] flex flex-col justify-center items-center gap-[24px]'
      style={{background:'linear-gradient(135deg,#eef2ff 0%,#f8f9ff 100%)'}}>

      {/* Back Button */}
      <div
        className='fixed top-[20px] left-[20px] cursor-pointer w-[44px] h-[44px] rounded-full flex items-center justify-center'
        style={{background:'#ffffff', boxShadow:'0 4px 15px rgba(99,102,241,0.15)', border:'1.5px solid #e0e4ff'}}
        onClick={()=>navigate("/")}
      >
        <IoIosArrowRoundBack className='w-[28px] h-[28px]' style={{color:'#6366f1'}}/>
      </div>

      {/* Avatar */}
      <div
        className='relative cursor-pointer'
        onClick={()=>image.current.click()}
      >
        <div className='w-[160px] h-[160px] rounded-full overflow-hidden'
          style={{border:'3px solid #6366f1', boxShadow:'0 8px 30px rgba(99,102,241,0.25)'}}>
          <img src={frontendImage} alt="" className='h-[100%] w-full object-cover'/>
        </div>
        <div className='absolute bottom-[8px] right-[8px] w-[36px] h-[36px] rounded-full flex justify-center items-center'
          style={{background:'linear-gradient(135deg,#6366f1,#818cf8)', boxShadow:'0 4px 12px rgba(99,102,241,0.4)'}}>
          <IoCameraOutline className='text-white w-[20px] h-[20px]'/>
        </div>
      </div>

      {/* Form */}
      <form className='w-[95%] max-w-[440px] flex flex-col gap-[14px] items-center' onSubmit={handleProfile}>
        <input type="file" accept='image/*' ref={image} hidden onChange={handleImage}/>

        <input
          type="text"
          placeholder="Enter your name"
          className='w-full h-[50px] outline-none text-[16px] px-[18px] rounded-[12px]'
          style={{border:'1.5px solid #e0e4ff', background:'#ffffff', color:'#3730a3', boxShadow:'0 2px 8px rgba(99,102,241,0.08)'}}
          onChange={(e)=>setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          readOnly
          className='w-full h-[50px] outline-none text-[16px] px-[18px] rounded-[12px]'
          style={{border:'1.5px solid #e0e4ff', background:'#f8f9ff', color:'#a5b4fc'}}
          value={userData?.userName}
        />
        <input
          type="email"
          readOnly
          className='w-full h-[50px] outline-none text-[16px] px-[18px] rounded-[12px]'
          style={{border:'1.5px solid #e0e4ff', background:'#f8f9ff', color:'#a5b4fc'}}
          value={userData?.email}
        />

        <button
          className='w-full h-[50px] rounded-[12px] text-white font-bold text-[17px] mt-[8px] transition-all duration-200'
          style={{background:'linear-gradient(135deg,#6366f1,#818cf8)', boxShadow:'0 6px 20px rgba(99,102,241,0.35)'}}
          disabled={saving}
        >{saving?"Saving...":"Save Profile"}</button>
      </form>
    </div>
  )
}

export default Profile