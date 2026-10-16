

import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'
import getMessage from '../customHooks/getMessages'

function Home() {
  let {selectedUser}=useSelector(state=>state.user)
  getMessage()
  return (
    <div className='w-full h-[100vh] flex' style={{background:'linear-gradient(135deg,#f0f4ff 0%,#faf8ff 100%)'}}>
      <SideBar/>
      <MessageArea/>
    </div>
  )
}

export default Home