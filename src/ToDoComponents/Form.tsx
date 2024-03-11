"use client";

import addToDo from '@/Actions/addToDo';
import React, { useRef } from 'react'
import Button from './Button';

export default function Form() {
    const ref = useRef<HTMLFormElement>(null);

  return (
    <form ref={ref} action={async (formData)=>{
        ref.current?.reset();
        await addToDo(formData)}
    }
        >
        <input type='text' name='title' id='title' className='bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500' placeholder='Enter Title Hare'></input>

        <textarea id="desc" name='desc' rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your Description here..."></textarea>
        
        <Button />


    </form>

  )
}
