import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { TodoContext } from '../context/TodoContext'
import { useReducer } from 'react'




export const TodoContextProvider = ({ children }) => {

    const [allTodoData, setallTodoData] = useState([])
    const [Loading, setLoading] = useState(false)


    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0

    );
    const getAllTodo = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_SERVER}/all-todo`)

            if (response.data.success === true) {
                setallTodoData(response.data.data)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllTodo()
    }, [reducerValue])

    return <TodoContext.Provider value={{ allTodoData, Loading , forceUpdate}}>{children}</TodoContext.Provider>
}
