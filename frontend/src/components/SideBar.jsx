

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { serverUrl } from '../main';
import axios from 'axios';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    let {userData,otherUsers,selectedUser,onlineUsers,searchData} = useSelector(state=>state.user)
    let [search,setSearch]=useState(false)
    let [input,setInput]=useState("")
    let dispatch=useDispatch()
    let navigate=useNavigate()

    const handleLogOut=async ()=>{
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    const handlesearch=async ()=>{
        try {
            let result = await axios.get(`${serverUrl}/api/user/search?query=${input}`,{withCredentials:true})
            dispatch(setSearchData(result.data))
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        if(input){
            handlesearch()
        }
    },[input])

    const onlineCount = otherUsers?.filter(u => onlineUsers?.includes(u._id)).length || 0

  return (
    <div
      className={`lg:w-[30%] w-full h-full flex flex-col overflow-hidden lg:flex relative ${!selectedUser?"flex":"hidden"}`}
      style={{
        background:'linear-gradient(175deg, #f5f3ff 0%, #ede9fe 30%, #faf5ff 100%)',
        borderRight:'1px solid rgba(139,92,246,0.12)'
      }}
    >

      {/* ── TOP HEADER ── */}
      <div style={{
        background:'linear-gradient(135deg, #7c3aed 0%, #6d28d9 40%, #5b21b6 100%)',
        padding:'28px 20px 20px',
        position:'relative',
        overflow:'hidden',
        flexShrink:0
      }}>
        <div style={{position:'absolute',top:'-30px',right:'-30px',width:'120px',height:'120px',borderRadius:'50%',background:'rgba(255,255,255,0.06)'}}/>
        <div style={{position:'absolute',bottom:'-20px',left:'30px',width:'80px',height:'80px',borderRadius:'50%',background:'rgba(255,255,255,0.04)'}}/>

        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'20px'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'10px',background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{fontSize:'16px',color:'white',fontWeight:'700'}}>C</span>
          </div>
          <span style={{color:'white',fontWeight:'700',fontSize:'20px',letterSpacing:'0.04em'}}>ChatGo</span>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'18px'}}>
          <div
            style={{width:'54px',height:'54px',borderRadius:'50%',overflow:'hidden',flexShrink:0,border:'2.5px solid rgba(255,255,255,0.5)',boxShadow:'0 4px 16px rgba(0,0,0,0.2)',cursor:'pointer'}}
            onClick={()=>navigate("/profile")}
          >
            <img src={userData.image || dp} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          </div>
          <div style={{flex:1}}>
            <p style={{color:'rgba(255,255,255,0.65)',fontSize:'12px',margin:'0 0 2px'}}>Good to see you 👋</p>
            <p style={{color:'white',fontWeight:'700',fontSize:'18px',margin:0}}>{userData.name || "user"}</p>
          </div>
          <div
            onClick={handleLogOut}
            style={{width:'40px',height:'40px',borderRadius:'12px',background:'rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',border:'1px solid rgba(255,255,255,0.2)',transition:'background 0.2s'}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.28)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.15)'}
          >
            <BiLogOutCircle style={{width:'20px',height:'20px',color:'white'}}/>
          </div>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:'10px',background:'rgba(255,255,255,0.18)',borderRadius:'14px',padding:'10px 14px',border:'1px solid rgba(255,255,255,0.25)'}}>
          <IoIosSearch style={{color:'rgba(255,255,255,0.8)',width:'18px',height:'18px',flexShrink:0}}/>
          <input
            type="text"
            placeholder='Search users...'
            style={{flex:1,background:'transparent',border:'none',outline:'none',color:'white',fontSize:'14px'}}
            onChange={(e)=>{setInput(e.target.value); if(!search) setSearch(true)}}
            value={input}
          />
          {input && <RxCross2
            style={{color:'rgba(255,255,255,0.8)',width:'16px',height:'16px',cursor:'pointer',flexShrink:0}}
            onClick={()=>{setInput(""); setSearch(false)}}
          />}
        </div>
      </div>

      {/* ── SEARCH RESULTS ── */}
      {input.length > 0 && (
        <div style={{background:'white',borderBottom:'1px solid rgba(139,92,246,0.12)',maxHeight:'360px',overflowY:'auto'}}>
          <p style={{fontSize:'11px',color:'#8b5cf6',fontWeight:'600',padding:'10px 16px 6px',textTransform:'uppercase',letterSpacing:'0.06em',margin:0}}>Results</p>
          {searchData?.map((user)=>(
            <div
              key={user._id}
              style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 16px',cursor:'pointer',transition:'background 0.15s',borderBottom:'1px solid #f5f3ff'}}
              onMouseEnter={e=>e.currentTarget.style.background='#f5f3ff'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}
              onClick={()=>{dispatch(setSelectedUser(user)); setInput(""); setSearch(false)}}
            >
              <div style={{position:'relative',flexShrink:0}}>
                <div style={{width:'42px',height:'42px',borderRadius:'50%',overflow:'hidden',border:'2px solid #ede9fe'}}>
                  <img src={user.image || dp} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                </div>
                {onlineUsers?.includes(user._id) &&
                  <span style={{position:'absolute',bottom:'1px',right:'0',width:'10px',height:'10px',borderRadius:'50%',background:'#4ade80',border:'2px solid white'}}/>}
              </div>
              <div>
                <p style={{margin:'0 0 2px',fontWeight:'600',fontSize:'15px',color:'#3b0764'}}>{user.name || user.userName}</p>
                <p style={{margin:0,fontSize:'12px',color:onlineUsers?.includes(user._id)?'#4ade80':'#a78bfa'}}>
                  {onlineUsers?.includes(user._id)?'● Online':'● Offline'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── ONLINE STRIP ── */}
      {!input && onlineCount > 0 && (
        <div style={{padding:'16px 16px 0',flexShrink:0}}>
          <p style={{fontSize:'11px',color:'#7c3aed',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.06em',margin:'0 0 10px'}}>
            Online · {onlineCount}
          </p>
          <div style={{display:'flex',gap:'12px',overflowX:'auto',paddingBottom:'12px'}}>
            {otherUsers?.map((user)=> onlineUsers?.includes(user._id) && (
              <div key={user._id} style={{flexShrink:0,textAlign:'center',cursor:'pointer'}} onClick={()=>dispatch(setSelectedUser(user))}>
                <div style={{position:'relative',display:'inline-block'}}>
                  <div style={{width:'48px',height:'48px',borderRadius:'50%',overflow:'hidden',border:'2.5px solid #7c3aed',boxShadow:'0 2px 12px rgba(124,58,237,0.3)'}}>
                    <img src={user.image || dp} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  </div>
                  <span style={{position:'absolute',bottom:'1px',right:'0',width:'11px',height:'11px',borderRadius:'50%',background:'#4ade80',border:'2px solid white'}}/>
                </div>
                <p style={{fontSize:'10px',color:'#6d28d9',margin:'4px 0 0',maxWidth:'50px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                  {(user.name||user.userName)?.split(' ')[0]}
                </p>
              </div>
            ))}
          </div>
          <div style={{height:'1px',background:'rgba(124,58,237,0.1)',margin:'0 0 8px'}}/>
        </div>
      )}

      {/* ── ALL CHATS LABEL ── */}
      {!input && (
        <div style={{padding:'12px 16px 6px',flexShrink:0,display:'flex',alignItems:'center',gap:'10px'}}>
          <p style={{fontSize:'11px',color:'#7c3aed',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.06em',margin:0,whiteSpace:'nowrap'}}>All chats</p>
          <div style={{flex:1,height:'1px',background:'rgba(124,58,237,0.12)'}}/>
        </div>
      )}

      {/* ── USER LIST ── */}
      <div style={{flex:1,overflowY:'auto',padding:'4px 10px 20px'}}>
        {otherUsers?.map((user)=>{
          const isOnline = onlineUsers?.includes(user._id)
          return (
            <div
              key={user._id}
              style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 12px',borderRadius:'16px',cursor:'pointer',transition:'all 0.18s',marginBottom:'4px'}}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(124,58,237,0.08)';e.currentTarget.style.transform='translateX(4px)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.transform='translateX(0)'}}
              onClick={()=>dispatch(setSelectedUser(user))}
            >
              <div style={{position:'relative',flexShrink:0}}>
                <div style={{width:'50px',height:'50px',borderRadius:'50%',overflow:'hidden',border:isOnline?'2px solid #7c3aed':'2px solid #e9d5ff',boxShadow:isOnline?'0 2px 10px rgba(124,58,237,0.25)':'none'}}>
                  <img src={user.image || dp} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                </div>
                {isOnline && <span style={{position:'absolute',bottom:'1px',right:'0',width:'11px',height:'11px',borderRadius:'50%',background:'#4ade80',border:'2px solid white'}}/>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{margin:'0 0 2px',fontWeight:'600',fontSize:'15px',color:'#3b0764',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                  {user.name || user.userName}
                </p>
                <p style={{margin:0,fontSize:'12px',color:isOnline?'#4ade80':'#a78bfa'}}>
                  {isOnline?'● Active now':'● Offline'}
                </p>
              </div>
              {isOnline && <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'linear-gradient(135deg,#7c3aed,#a78bfa)',flexShrink:0}}/>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar