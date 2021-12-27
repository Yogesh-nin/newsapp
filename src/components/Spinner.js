import React from 'react'
import loading from "./loading.gif"

const Spinner = () => {

        return (
            <div>
               <div className="text-center my-3">
                   <img src={loading} alt="loading" />
                </div> 
            </div>
        )
}

export default Spinner

