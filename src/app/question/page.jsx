'use client'
import Image from "next/image";
import data from "../datas/datas";
import { useState, useEffect } from "react";
import Router, { useSearchParams } from "next/navigation";


const Question = () => {
  const [currentNum, setCurrentNum] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [displayExplanation, setDisplayExplanation] = useState(false);
  const [judgment, setJudgment] = useState(false);
  const [addAnswers, setAddAnswers] = useState([]);

  const seeAnswer = useSearchParams().get('seeAnswer');
  const handleSelect = (e) => {
    setSelectedValue(e.target.value);
    setJudgment(true);
    setAddAnswers([...addAnswers, e.target.value]);

  }
  const handleDisplayExplanation = () => {
    setDisplayExplanation(true);
  }

  const handleNextButton = () => {
    if (selectedValue !== null) {
      data[currentNum].initialValue = selectedValue;
    }
    setCurrentNum(currentNum + 1);
    setSelectedValue(null);
    const radioButtons = document.querySelectorAll('input[name="drone"]');
    radioButtons.forEach(radioButton => radioButton.checked = false);
    console.log(data.length);
  }
  const handlePrevButton = () => {
    setCurrentNum(currentNum - 1);
    const radioButtons = document.querySelectorAll('input[name="drone"]');
    radioButtons.forEach(radioButton => radioButton.checked = false);
  }

  return (
    <div className="flex flex-col gap-8 items-center">
      <p>Q{currentNum + 1}. {data[currentNum].question}</p>
      <fieldset>
        <div className="flex gap-4">
          <input type="radio" id={data[currentNum].choices[0]} name="drone" value={data[currentNum].choices[0]} onChange={handleSelect} />
          <label for={data[currentNum].choices[0]}>A. {data[currentNum].choices[0]}</label>
        </div>
        <div className="flex gap-4">
          <input type="radio" id={data[currentNum].choices[1]} name="drone" value={data[currentNum].choices[1]} onChange={handleSelect} />
          <label for={data[currentNum].choices[1]}>B. {data[currentNum].choices[1]}</label>
        </div>
        <div className="flex gap-4">
          <input type="radio" id={data[currentNum].choices[2]} name="drone" value={data[currentNum].choices[2]} onChange={handleSelect} />
          <label for={data[currentNum].choices[2]}>C. {data[currentNum].choices[2]}</label>
        </div>
        <div className="flex gap-4">
          <input type="radio" id={data[currentNum].choices[3]} name="drone" value={data[currentNum].choices[3]} onChange={handleSelect} />
          <label for={data[currentNum].choices[3]}>D. {data[currentNum].choices[3]}</label>
        </div>
      </fieldset>
      {seeAnswer === 'each' && judgment && (
        <button type="button" onClick={handleDisplayExplanation} className="p-2 font-bold rounded-full shadow-lg min-w-40">True/false judgment</button>
      )}
      {displayExplanation && (
        selectedValue === data[currentNum].answer ? (
          <div>〇</div>
        ) : (
          <div>✕</div>
        )
      )}
      <div className="flex gap-8">
        <button type="button" onClick={handlePrevButton} className="p-2 font-bold rounded-full shadow-lg min-w-40">PREV</button>
        {data.length - 1 === currentNum ?
          <button type="button" className="p-2 font-bold rounded-full shadow-lg min-w-40">See result</button> :
          <button type="button" onClick={handleNextButton} className="p-2 font-bold rounded-full shadow-lg min-w-40">NEXT</button>
        }
      </div>
    </div >
  )
}

export default Question;
