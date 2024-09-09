import {useState, useContext} from 'react'
import axios from 'axios'
import Recipients from "./Recipients"



export default function NewMessage() {
  return (
    <section>
        <header className='fixed-top mt-12'>
          <Recipients />
        </header>
    </section>
  )
}
