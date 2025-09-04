import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdDelete, MdOutlineTask } from 'react-icons/md'
import { TodoContext } from '../context/TodoContext'
import { useContext } from 'react'
import TodoCard from './TodoCard'
import axios from 'axios'
import toast from 'react-hot-toast'


const AllTodos = () => {

    const { Loading, allTodoData, forceUpdate } = useContext(TodoContext)

    const [searchString, setSearchString] = useState("")

    const deleteAll = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER}/delete-completed`)

            if (response.data.success === true) {
                forceUpdate()
                toast.success(response.data.message)

            } else {
                toast.error(response.data.message)

            }
        } catch (error) {
            console.log(error)
        }
    }



    return Loading ? (<div className='w-full text-center'>Loading Data...............</div>) : (
        <section className='w-full flex-col'>

            <div className=' flex items-center justify-between container mx-auto px-4 py-2'>

                <div className='w-max flex items-center gap-1.5'>
                    <p className='text-gray-700'>Your ToDos</p>
                    <span className='text-gray-700 text-sm'>({allTodoData.length})</span>
                </div>

                {allTodoData.some((item) => item.isCompleted === true) && (<button className='bg-red-600 text-white flex items-center px-2 py-1 rounded-lg gap-2 cursor-pointer hover:bg-red-500 transition-all duration-100 ease-in text-sm' onClick={() => deleteAll()}>
                    <MdDelete />
                    <p>Delete Completed</p>
                </button>)}



            </div>

            {/* search todo */}


            <div className='container mx-auto mt-2 px-4'>
                <div className='px-4 py-2 rounded-2xl mx-auto flex items-center bg-main gap-2 '>
                    <FaSearch size={13} className='cursor-pointer' />
                    <input type="search" placeholder="Search todo......" className='text-gray-700 flex-1 text-sm outline-0'
                        onChange={(e) => setSearchString(e.target.value)} value={searchString} />
                </div>
            </div>



            {/* All sticy todos */}

            {allTodoData.length === 0 ? (
                <div className="w-full flex flex-col items-center pt-54">
                    <MdOutlineTask size={72} classNa-me='text-gray-700' />
                    <p className='text-xl mt-4'>Empty Todo</p>
                    <span className='text-sm'>Add Some todo to show here</span>
                </div>
            ) : (
                <div className='container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-2'>
                    {
                        allTodoData.filter((todo) => todo.text.includes(searchString)).map((todo) => (
                            <TodoCard key={todo._id} todo={todo} />
                        ))
                    }
                </div>
            )}

        </section>
    )
}

export default AllTodos