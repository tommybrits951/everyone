import { useState, useContext } from "react"
import { Social } from "../../App"
import axios from 'axios'
const initialFormData = {
    email: "",
    password: ""
}

export default function Login() {
    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState("")
    const {setToken, setUser} = useContext(Social)


    function change(e) {
        const {name, value} = e.target
        return setFormData({...formData, [name]: value})
    }
    function submit(e) {
        e.preventDefault()
        
        axios.post("http://localhost:9000/auth", formData, {
            withCredentials: true,
            baseURL: "http://localhost:9000"
        })
        .then(res => {
            console.log(res.data.accessToken)
            setUser(res.data)
            setToken(res.data.accessToken)
        })
        .catch(err => {
            console.log(err.response.data.message)
            setErrors(err.response.data.message)
    })
    }

  return (
    <section className="absolute left-1/4 w-1/2 top-20 border-5 bg-zinc-200 pt-5 rounded-xl text-center border-stone-500 bg-white">
        <h2 className="text-3xl font-bold underline">Login</h2>
        <p className="text-red-500">{errors}</p>
        <form onSubmit={submit} className="border-2 p-5 mt-10 bg-zinc-300 mx-0">
            <h4 className="text-lg text-orange-600 font-mono">Email</h4>
            <input className="p-1 rounded" type="email" name="email" value={formData.email} onChange={change} required />
            <h4 className="text-lg text-orange-600 font-mono">Password</h4>
            <input className="p-1 rounded" type="password" name="password" value={formData.password} onChange={change} required />
            <br />
            <button className=" bg-cyan-500 rounded-lg mt-5 py-1 px-2 hover:scale-95 text-whitew">Submit</button>
        </form>
    </section>
  )
}
