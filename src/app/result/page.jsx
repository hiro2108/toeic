`use cliant`
import React from 'react'
import data from "../datas/datas";


const page = () => {
  return (
    <div>
      <h1>Result</h1>
      <p><span>currect.length</span>/<span>data.length</span></p>
      data.map(
        Q. [n]：errata[n]
        data[n].question
        data[n].choices[0]~[3]
        {/* insert 〇✕ addAnsewrs[n] , data[n].answer changecolor to red*/}
        A. data[n].answer
        your choice：addAnswers[n]
      )
    </div>
  )
}

export default page
