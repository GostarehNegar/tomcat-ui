import React from 'react'

const Bot = ({ id, port }) => {

    return (
        <>
            <p>{id}</p>
            <button onClick={() => {
                window.open(`http://localhost:${port}/trades`)
            }}>trades</button>
            <button onClick={() => {
                fetch(`http://localhost:8001/kill?id=${id}`)
            }}>KILL</button>
        </>

    )
}
export default Bot