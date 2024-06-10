'use client'
import {useReducer} from 'react'
import data from "../datas/datas";
import { INITIAL, handleAddAnswers } from '../addAnswers';


const Result = () => {
  const [state, dispatch] = useReducer(handleAddAnswers, INITIAL);
  console.log(state.addAnswers);
  return (
    <div>
      <h1>Result</h1>
      <p><span>currect.length</span>/<span>data.length</span></p>
      <p>Your Answers: {state.addAnswers.length > 0 ? state.addAnswers.join(', ') : 'No answers submitted'}</p>

    </div>
  )
}

export default Result
