import {useState} from 'react'
import instance from "../../config/axios"
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
    const [errors, setErrors] = useState("")
    function change(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }
     function submit(e) {
        e.preventDefault()
        axios.post(instance, formData)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
            setErrors(err)
        })
    } 
    return (
    <section className='form-section'>
        <h2 className='form-title'>Register New User</h2>
        <p className='error-display'>{errors}</p>
        <form encType='mulipart/form-data' onSubmit={submit} className='input-form'>
            <h4 className='input-label'><span className='star'>*</span>First Name</h4>
            <input className='user-input' type="text" name="first_name" value={formData.first_name} onChange={change} required/>
            <h4 className='input-label'>Last Name</h4>
            <input className='user-input' type="text" name="last_name" value={formData.last_name} onChange={change} />
            <h4 className='input-label'><span className='star'>*</span>Date of Birth</h4>
            <input className='user-input' type="date" name="dob" value={formData.dob} onChange={change} required/>
            <h4 className='input-label'><span className='star'>*</span>Postal/Zip Code</h4>
            <input className='user-input' type="number" name="postal" value={formData.postal} onChange={change} required/>
            <h4 className='input-label'>Phone</h4>
            <input className='user-input' type="number" name="phone" value={formData.phone} onChange={change} />
            <h4 className='input-label'><span className='star'>*</span>Email</h4>
            <input className='user-input' type="email" name="email" value={formData.email} onChange={change} required/>
            <h4 className='input-label'><span className='star'>*</span>Password</h4>
            <input className='user-input' type="password" name='password' value={formData.password} onChange={change} required/>
            <br />
            <button className='sub-btn'>Submit</button>
        </form>
    </section>
  )
}
