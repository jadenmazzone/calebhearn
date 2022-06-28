import React from 'react'

function Result({ result }) {
    return (
        <div className='mt-8 rounded  '>
            <h2 className='mb-2 text-blue text-3xl font-extrabold underline'>Results</h2>
            <p className='font-bold'>{result}</p>
        </div>
    )
}

export default Result