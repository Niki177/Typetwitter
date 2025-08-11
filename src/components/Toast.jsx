import React from 'react'

export default function Toast({message}) {
  return (
    <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-md shadow-lg">
      {message}
    </div>
  )
}
