import React, { useContext, useState } from 'react'
import { colorData } from '../data'
import { MdDelete, MdTaskAlt } from 'react-icons/md'
import axios from 'axios'
import { TodoContext } from '../context/TodoContext'
import { colorcode } from '../../../backend/controllers/todocontrollers'
import toast from 'react-hot-toast'





const TodoCard = ({ todo }) => {


  const [isSeeMore, setIsSeeMore] = useState(true)
  const { forceUpdate } = useContext(TodoContext)



  const toggleSeeMore = () => {
    setIsSeeMore(!isSeeMore)
  };



  const markAsComplete = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER}/markAsCompleted/${todo._id}`)
      if (response.data.success === true) {
        toast.success(response.data.message)
        forceUpdate()

      } else {
        toast.error(response.data.message)
      }


    } catch (error) {
      console.log(error)
    }

  }



  const changeColorCode = async (color) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER}/changecolorcode`, {
        todoId: todo._id,
        colorcode: color
      })


      if (response.data.success === true) {
        forceUpdate()
      }
    } catch (error) {
      console.log(error)
    }
  }



  const deleteSingletodo = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER}/delete/${todo._id}`)
      if (response.data.success === true) {
        toast.success(response.data.message)
        forceUpdate()
      } else {
        toast.error(response.data.message)

      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full border h-max min-h-[150px] text-justify p-4 rounded-xl flex flex-col justify-between' style={{ backgroundColor: todo.colorcode }}>

      <div>
        <p className='text-xs text-right mb-2'>{todo.createdAt.toLocaleString()}</p>
        <p className={`text-sm font-medium ${todo.isCompleted && "line-through"} ${isSeeMore ? "line-clamp-4 md:line-clamp-2" : "line-clamp-0"}`}>{todo.text}</p>

        {
          todo.text.length > 250 && <span className='text-xs text-blue-800 cursor-pointer hover:underline mb-4 mt-2' onClick={() => toggleSeeMore()}>
            {isSeeMore ? "See More" : "See Less"}
          </span>
        }
      </div>



      <div className=' flex justify-between w-full mt-4'>

        {/* color codes */}

        <div className='flex items-center gap-1'>
          {
            colorData.map((item) => (
              <div key={item.id} style={{ backgroundColor: item.colorCode }} className='w-6 rounded-full aspect-square border-2 border-black cursor-pointer' onClick={() => changeColorCode(item.colorCode)} />
            ))
          }
        </div>

        {/* action buttons */}

        <div className='flex justify-center items-center gap-3 '>
          {todo.isCompleted === false && (
            <button className='w-6 aspect-square rounded-md bg-green-500 text-black flex justify-center items-center cursor-pointer hover:bg-green-600 duration-150 ease-in' onClick={() => markAsComplete()}>
              <MdTaskAlt />
            </button>
          )}


          <button className='w-6 aspect-square rounded-md bg-red-500 text-black flex justify-center items-center cursor-pointer hover:bg-red-600 duration-150 ease-in' onClick={() => deleteSingletodo()}>
            <MdDelete />
          </button>

        </div>

      </div>
    </div>
  )
}

export default TodoCard