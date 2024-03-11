"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function Button() {

    const {pending} = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{pending?"Adding Todo...":"Add ToDo"}</button>
  )
}
