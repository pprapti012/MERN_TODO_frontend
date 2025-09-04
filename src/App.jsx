import React from 'react'
import Header from './components/Header'
import AllTodos from './components/AllTodos'
import AddTodo from './components/AddTodo'

const App = () => {
  return (
    <div className='bg-amber-50 min-h-screen w-full'>
      <Header />
      <AddTodo/>
      <AllTodos/>
    </div>
  )
}

export default App


