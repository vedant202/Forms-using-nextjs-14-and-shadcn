import React from 'react'
import Form from '@/ToDoComponents/Form'
import {prisma} from "@/db/db"


export default async function ToDoForm() {
    const todos = await prisma.todos.findMany();
    

  return (
    <div>
        <div>
            <h1>Add Todo</h1>
        </div>
        <Form />
        <div className='lists'>
            <h2>Listing all todos</h2>
            <div className='lisTodo'>
                {
                    todos.map((i)=>(<li key={i.id}>{i.title}</li>))
                }
            </div>
        </div>

    </div>
  )
}
