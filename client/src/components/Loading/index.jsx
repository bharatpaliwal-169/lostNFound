import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = () => {
  return (
    <>
      <div className="row m-1 p-1 justify-content-center">
        {Array(6).fill().map(index => (
          <div key={Math.random()} className="col-12 col-md-3 card m-1">
            <h1>
              <Skeleton count={2} />
            </h1>
            
            <p>
              <Skeleton count={4} width="100%" />
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Loading;