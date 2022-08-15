import React from 'react'

export default function Title({ color }) {
    return (
        <h1 className={`text-center py-7 ${color} font-medium text-2xl sm:text-4xl md:text-5xl font-display`}>
            Chat App
        </h1>
    )
}
