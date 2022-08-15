import React from 'react'

export default function Alert({ color, msg }) {
    const className = `${color} container max-w-498 py-4 px-8 mt-4`
    return (
        <div className={className}>
            {msg}
        </div>
    )
}
