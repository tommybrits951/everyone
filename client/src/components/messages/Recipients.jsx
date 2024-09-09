import {useState, useContext} from 'react'

import {Social} from "../../App"
export default function Recipients() {
    const {userList} = useContext(Social)
    const [filteredList, setFilteredList] = useState([])
    const [recipientList, seRecipientList] = useState([])
    const [data, setData] = useState("")
    function change(e) {
        const {value} = e.target;
        setData(value)
        let tmpList = []
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].email.includes(data) && !tmpList.includes(userList[i].email)) {
                tmpList = [...tmpList, userList[i].email]
            }
        }
        console.log(tmpList)
        setFilteredList(tmpList)
    }

    return (
        <div className='mt-5'>
            <label className='text-center text-stone-800'>To: <input type='text' list={recipientList} value={data}/></label>
            <button>Add Recipient</button>
        </div>
    ) 
    
}