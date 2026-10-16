// import axios from "axios"
// import { useEffect } from "react"
// import { serverUrl } from "../main"
// import { useDispatch, useSelector } from "react-redux"
// import { setOtherUsers, setUserData } from "../redux/userSlice"

// const getOtherUsers=()=>{
//     let dispatch=useDispatch()
//     let {userData}=useSelector(state=>state.user)
//     useEffect(()=>{
//         const fetchUser=async ()=>{
//             try {
//                 let result=await axios.get(`${serverUrl}/api/user/others`,{withCredentials:true})
//                 dispatch(setOtherUsers(result.data))
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         fetchUser()
//     },[userData])
// }

// export default getOtherUsers
import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch } from "react-redux"
import { setOtherUsers } from "../redux/userSlice"

const useGetOtherUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/user/others`,
                    { withCredentials: true }
                )
                dispatch(setOtherUsers(result.data))
            } catch (error) {
                console.log(error)
            }
        }

        fetchUsers()
    }, [dispatch])
}

export default useGetOtherUsers