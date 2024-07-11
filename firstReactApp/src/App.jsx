import { useState,useEffect } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import "./styles.css"
export default function App(){
  /* const [newItem,setNewItem]= useState("") */
  const [todos,setTodos]=useState(()=>{
    const localValue=localStorage.getItem("ITEMS")
    if(localValue==null) return[]

    return JSON.parse(localValue)
  })

  useEffect(()=>{
    localStorage.setItem("ITEMS",JSON.stringify(todos))
  },[todos])

  function addTodo(title){
    setTodos(currenTodos=>{
      return[
        ...currenTodos,
        {id:crypto.randomUUID(),title,completed:false}
      ]
    })
  }

  function toggleTodo(id,completed){
    setTodos(currentTodos=>{
      return currentTodos.map(todo=>{
        if(todo.id===id){
          return {...todo,completed}
        }
        return todo;
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos=>{
      return currentTodos.filter(todo=>todo.id!==id)
    })
  }

  return (
    <>
    <h1>Yet another to Do list</h1>

    <NewTodoForm onSubmit={addTodo}/>

    <h2>Current Tasks</h2>
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>

    
    </>
    
  )
}