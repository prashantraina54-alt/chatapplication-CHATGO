// import axios from "axios"
// import { useEffect } from "react"
// import { serverUrl } from "../main"
// import { useDispatch, useSelector } from "react-redux"
// import { setOtherUsers, setUserData } from "../redux/userSlice"
// import { setMessages } from "../redux/messageSlice"

// const getMessage=()=>{
//     let dispatch=useDispatch()
//     let {userData,selectedUser}=useSelector(state=>state.user)
//     useEffect(()=>{
//         const fetchMessages=async ()=>{
//             try {
//                 let result=await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`,{withCredentials:true})
//                 dispatch(setMessages(result.data))
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         fetchMessages()
//     },[selectedUser,userData])
// }

// export default getMessage
import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice"

const useGetMessages = () => {
    const dispatch = useDispatch()
    const { selectedUser } = useSelector(state => state.user)

    useEffect(() => {
        if (!selectedUser?._id) return

        const fetchMessages = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/message/get/${selectedUser._id}`,
                    { withCredentials: true }
                )
                dispatch(setMessages(result.data))
            } catch (error) {
                console.log(error)
            }
        }

        fetchMessages()
    }, [selectedUser, dispatch])
}

export default useGetMessages