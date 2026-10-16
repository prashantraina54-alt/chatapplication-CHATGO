
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser, setUserData } from '../redux/userSlice'

function Login() {
    let navigate=useNavigate()
    let [show,setShow]=useState(false)
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [loading,setLoading]=useState(false)
    let [err,setErr]=useState("")
    let dispatch=useDispatch()

    const handleLogin=async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/login`,{email,password},{withCredentials:true})
            dispatch(setUserData(result.data))
            dispatch(setSelectedUser(null))
            navigate("/")
            setEmail("")
            setPassword("")
            setLoading(false)
            setErr("")
        } catch (error) {
            console.log(error)
            setLoading(false)
            setErr(error.response.data.message)
        }
    }

  return (
    <div className='w-full h-[100vh] flex items-center justify-center'
      style={{background:'linear-gradient(135deg,#eef2ff 0%,#f8f9ff 100%)'}}>
      <div className='w-full max-w-[440px] rounded-[24px] overflow-hidden flex flex-col'
        style={{background:'#ffffff', boxShadow:'0 20px 60px rgba(99,102,241,0.15)'}}>

        {/* Header */}
        <div className='w-full h-[160px] flex flex-col items-center justify-center gap-[6px]'
          style={{background:'linear-gradient(135deg,#6366f1,#818cf8)'}}>
          <h1 className='text-white font-bold text-[28px] tracking-wide'>ChatGo</h1>
          <p style={{color:'rgba(255,255,255,0.8)', fontSize:'15px'}}>Sign in to continue</p>
        </div>

        {/* Form */}
        <form className='w-full flex flex-col gap-[16px] items-center px-[30px] py-[32px]' onSubmit={handleLogin}>
          <input
            type="email"
            placeholder='Email address'
            className='w-full h-[50px] outline-none text-[16px] px-[18px] rounded-[12px]'
            style={{border:'1.5px solid #e0e4ff', background:'#f8f9ff', color:'#3730a3'}}
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
          />
          <div className='w-full h-[50px] rounded-[12px] relative overflow-hidden'
            style={{border:'1.5px solid #e0e4ff', background:'#f8f9ff'}}>
            <input
              type={`${show?"text":"password"}`}
              placeholder='Password'
              className='w-full h-full outline-none px-[18px] text-[16px] bg-transparent'
              style={{color:'#3730a3'}}
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
            <span
              className='absolute top-[13px] right-[16px] text-[14px] font-semibold cursor-pointer'
              style={{color:'#6366f1'}}
              onClick={()=>setShow(prev=>!prev)}
            >{show?"Hide":"Show"}</span>
          </div>

          {err && <p className='text-red-400 text-[14px] self-start'>{"* " + err}</p>}

          <button
            className='w-full h-[50px] rounded-[12px] text-white font-bold text-[17px] mt-[8px] transition-all duration-200'
            style={{background:'linear-gradient(135deg,#6366f1,#818cf8)', boxShadow:'0 6px 20px rgba(99,102,241,0.35)'}}
            disabled={loading}
          >{loading?"Logging in...":"Login"}</button>

          <p className='text-[14px] cursor-pointer' style={{color:'#64748b'}}
            onClick={()=>navigate("/signup")}>
            Don't have an account? <span style={{color:'#6366f1', fontWeight:'600'}}>Sign up</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
