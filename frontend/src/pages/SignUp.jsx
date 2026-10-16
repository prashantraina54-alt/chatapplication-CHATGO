// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { serverUrl } from '../main'
// import { useDispatch, useSelector } from 'react-redux'
// import { setUserData } from '../redux/userSlice'

// function SignUp() {
//     let navigate=useNavigate()
//     let [show,setShow]=useState(false)
// let [userName,setUserName]=useState("")
// let [email,setEmail]=useState("")
// let [password,setPassword]=useState("")
// let [loading,setLoading]=useState(false)
// let [err,setErr]=useState("")
// let dispatch=useDispatch()

//     const handleSignUp=async (e)=>{
//         e.preventDefault()
//         setLoading(true)
//         try {
//             let result =await axios.post(`${serverUrl}/api/auth/signup`,{
// userName,email,password
//             },{withCredentials:true})
//            dispatch(setUserData(result.data))
//            navigate("/profile")
//             setEmail("")
//             setPassword("")
//             setLoading(false)
//             setErr("")
//         } catch (error) {
//             console.log(error)
//             setLoading(false)
//             setErr(error?.response?.data?.message)
//         }
//     }

//   return (
//     <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
//      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
//         <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
//            <h1 className='text-gray-600 font-bold text-[30px]'>welcome to <span  className='text-white'>chatly</span></h1>
//         </div>
//         <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleSignUp}>

//         <input type="text" placeholder='username' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]' onChange={(e)=>setUserName(e.target.value)} value={userName}/>
//         <input type="email" placeholder='email' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]'  onChange={(e)=>setEmail(e.target.value)} value={email}/>
//         <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>
//         <input type={`${show?"text":"password"}`} placeholder='password' className='w-full h-full outline-none  px-[20px] py-[10px] bg-[white]  text-gray-700 text-[19px]'  onChange={(e)=>setPassword(e.target.value)} value={password}/>
//         <span className='absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] font-semibold cursor-pointer' onClick={()=>setShow(prev=>!prev)}>{`${show?"hidden":"show"}`}</span>
//         </div>
//         {err && <p className='text-red-500'>{"*" + err}</p>}
//         <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner' disabled={loading}>{loading?"Loading...":"Sign Up"}</button>
//         <p className='cursor-pointer' onClick={()=>navigate("/login")}>Already Have An Account ? <span className='text-[#20c7ff] text-[bold]' >Login</span></p>
//      </form>
//      </div>
     
//     </div>
//   )
// }

// export default SignUp

import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function SignUp() {
    let navigate=useNavigate()
    let [show,setShow]=useState(false)
    let [userName,setUserName]=useState("")
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [loading,setLoading]=useState(false)
    let [err,setErr]=useState("")
    let dispatch=useDispatch()

    const handleSignUp=async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`,{userName,email,password},{withCredentials:true})
            dispatch(setUserData(result.data))
            navigate("/profile")
            setEmail("")
            setPassword("")
            setLoading(false)
            setErr("")
        } catch (error) {
            console.log(error)
            setLoading(false)
            setErr(error?.response?.data?.message)
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
          <p style={{color:'rgba(255,255,255,0.8)', fontSize:'15px'}}>Create your account</p>
        </div>

        {/* Form */}
        <form className='w-full flex flex-col gap-[16px] items-center px-[30px] py-[32px]' onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder='Username'
            className='w-full h-[50px] outline-none text-[16px] px-[18px] rounded-[12px]'
            style={{border:'1.5px solid #e0e4ff', background:'#f8f9ff', color:'#3730a3'}}
            onChange={(e)=>setUserName(e.target.value)}
            value={userName}
          />
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
          >{loading?"Creating account...":"Sign Up"}</button>

          <p className='text-[14px] cursor-pointer' style={{color:'#64748b'}}
            onClick={()=>navigate("/login")}>
            Already have an account? <span style={{color:'#6366f1', fontWeight:'600'}}>Login</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp