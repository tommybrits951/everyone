import {useState} from 'react'
import axios from 'axios'

const initialFormData = {
    first_name: "",
    last_name: "",
    dob: "",
    postal: "",
    phone: "",
    email: "",
    password: ""
}

export default function Register() {
    const [formData, setFormData] = useState(initialFormData)
    const [img, setImg] = useState(null)
    const [errors, setErrors] = useState("")
    function change(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }
     function submit(e) {
        e.preventDefault()
        
        const newData = new FormData(e.target)
        newData.append("img", img)
        console.log(e.target)
        axios.post("http://localhost:9000/user", newData, {
            withCredentials: true,
            baseURL: "http://localhost:9000"
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
            setErrors(err)
        })
    } 
    function imgChange(e) {
        console.log(e.target.files[0])
        setImg(e.target.files[0])
    }
    return (
    <section className='absolute left-1/4 w-1/2 top-28 bg-stone-300 text-center rounded-xl'>
        <h2 className='text-3xl my-3 text-cyan-600'>Register New User</h2>
        <p className='text-red-500'>{errors?.response?.data?.message}</p> 
        <form encType='multipart/form-data' onSubmit={submit} className='bg-stone-100 mx-2 my-1 rounded-xl'>
            <h4 className='text-lg '><span className='star'>*</span>First Name</h4>
            <input className='rounded-lg border-2' type="text" name="first_name" value={formData.first_name} onChange={change} required/>
            <h4 className='text-lg '>Last Name</h4>
            <input className='rounded-lg border-2' type="text" name="last_name" value={formData.last_name} onChange={change} />
            <h4 className='text-lg '><span className='star'>*</span>Date of Birth</h4>
            <input className='rounded-lg border-2' type="date" name="dob" value={formData.dob} onChange={change} required/>
            <h4 className='text-lg '><span className='star'>*</span>Postal/Zip Code</h4>
            <input className='rounded-lg border-2' type="number" name="postal" value={formData.postal} onChange={change} required/>
            <h4 className='text-lg '>Phone</h4>
            <input className='rounded-lg border-2' type="number" name="phone" value={formData.phone} onChange={change} />
            <h4 className='text-lg '><span className='star'>*</span>Email</h4>
            <input className='rounded-lg border-2' type="email" name="email" value={formData.email} onChange={change} required/>
            <h4 className='text-lg '><span className='star'>*</span>Password</h4>
            <input className='rounded-lg border-2' type="password" name='password' value={formData.password} onChange={change} required/>
            <input type='file' name='profile_img' value={formData.img} onChange={imgChange} />
            <br />
            <button className=''>Submit</button>
        </form>
    </section>
  )
}
