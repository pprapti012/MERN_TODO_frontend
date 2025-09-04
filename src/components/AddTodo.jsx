import React, { useContext, useState } from 'react'
import axios from "axios"
import { TodoContext } from '../context/TodoContext'
import toast from 'react-hot-toast'


const AddTodo = () => {

    const [todocontent, setTodoContent] = useState("")
    const [loading, setLoading] = useState(false)

    const { forceUpdate } = useContext(TodoContext)
    const addTodo = async () => {
        if (!todocontent) {
            return
        }

        try {
            // Logic to create todo
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_SERVER}/create-todo`, { text: todocontent });

            if (response.data.success === true) {
                toast.success(response.data.message)
                setTodoContent("")
                forceUpdate()
            } else {
                toast.error(response.data.message)

            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    return (

        <section className='w-full py-6'>
            <div className='container mx-auto p-4 flex items-center'>
                <input type="text" className='bg-main flex-1 px-6 py-4 rounded-tl-3xl rounded-bl-3xl outline-0 text-[16px] text-gray-700' placeholder='What do you need to do?' onChange={(e) => setTodoContent(e.target.value)} value={todocontent} />

                <button className='bg-[#76b7cd] px-8 py-4 rounded-tr-3xl rounded-br-3xl outline-0 cursor-pointer hover:bg-[#558696] text-[#fff] transition-all duration-100 ease-in' onClick={() => addTodo()} disabled={loading}>Add</button>
            </div>

        </section>
    )
}

export default AddTodo