import {useState, useEffect, useContext} from 'react'
import axios from "axios"
import { Social } from '../../App'
import { useParams } from 'react-router-dom'
export default function Profile() {
  const {id} = useParams()
  const {token} = useContext(Social)
  const [user, setUser] = useState(null)
  useEffect(() => {
    axios.get(`http://localhost:9000/user/${id}`, {
      withCredentials: true,
      baseURL: "http://localhost:9000",
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res.data)
      setUser(res.data)
    })
    .catch(err => console.log(err))
  }, [id])
  const content = user !== null ? (
    <div>
      <h2>{user.first_name} {user.last_name}</h2>
    </div>
  ) : null
  return content
}
