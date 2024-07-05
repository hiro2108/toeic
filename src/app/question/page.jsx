'use client'
import Image from "next/image";
import Link from "next/link";
import data from "../datas/datas";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const Question = () => {
  const router = useRouter();

  const [currentNum, setCurrentNum] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [displayExplanation, setDisplayExplanation] = useState(false);
  const [judgment, setJudgment] = useState(false);
  const [addAnswers, setAddAnswers] = useState([]);

  const params = useSearchParams();
  const seeAnswer = params.get('seeAnswer');

  const handleSelect = (e) => {
    setJudgment(true);
    setSelectedValue(e.target.value);
    console.log(addAnswers);
  }
  const handleDisplayExplanation = () => {
    setDisplayExplanation(true);
  }

  const handleNextButton = () => {
    if (selectedValue !== null) {
      setAddAnswers([...addAnswers, selectedValue]);
    } else {
      setAddAnswers([...addAnswers, 'null']);
    }
    setCurrentNum(currentNum + 1);
    setSelectedValue(null);
    const radioButtons = document.querySelectorAll('input[name="drone"]');
    radioButtons.forEach(radioButton => radioButton.checked = false);
  }
  const handlePrevButton = () => {
    setCurrentNum(currentNum - 1);
    const radioButtons = document.querySelectorAll('input[name="drone"]');
    radioButtons.forEach(radioButton => radioButton.checked = false);
  }

  const gotoResultPage = () => {
    setAddAnswers([...addAnswers, selectedValue]);
    const answerParams = addAnswers.map((str, index) => (
      `Q${index + 1}=${str}${index === addAnswers.length - 1 ? '' : '&'}`
    )).join('');
    router.push(`/result?${answerParams}`);
  }

  return (
    <div className="flex flex-col gap-8 items-center">
      <p className="text-lg lg:text-3xl bg-white/75 p-3 backdrop-blur">Q{currentNum + 1}. {data[currentNum].question}</p>
      <fieldset className="flex flex-col gap-4">
        <div className="flex gap-4 text-3xl bg-white/75 p-3 rounded-lg backdrop-blur">
          <input type="radio" id={data[currentNum].choices[0]} name="drone" value={data[currentNum].choices[0]} onChange={handleSelect} />
          <label className="w-full" for={data[currentNum].choices[0]}>A. {data[currentNum].choices[0]}</label>
        </div>
        <div className="flex gap-4 text-3xl bg-white/75 p-3 rounded-lg backdrop-blur">
          <input type="radio" id={data[currentNum].choices[1]} name="drone" value={data[currentNum].choices[1]} onChange={handleSelect} />
          <label className="w-full" for={data[currentNum].choices[1]}>B. {data[currentNum].choices[1]}</label>
        </div>
        <div className="flex gap-4 text-3xl bg-white/75 p-3 rounded-lg backdrop-blur">
          <input type="radio" id={data[currentNum].choices[2]} name="drone" value={data[currentNum].choices[2]} onChange={handleSelect} />
          <label className="w-full" for={data[currentNum].choices[2]}>C. {data[currentNum].choices[2]}</label>
        </div>
        <div className="flex gap-4 text-3xl bg-white/75 p-3 rounded-lg backdrop-blur">
          <input type="radio" id={data[currentNum].choices[3]} name="drone" value={data[currentNum].choices[3]} onChange={handleSelect} />
          <label className="w-full" for={data[currentNum].choices[3]}>D. {data[currentNum].choices[3]}</label>
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
        <button type="button" onClick={handlePrevButton} className="p-2 font-bold rounded-full shadow-lg min-w-40 bg-white/75 backdrop-blur">PREV</button>
        {data.length - 1 === currentNum ? (
          <button onClick={gotoResultPage} className="p-2 font-bold rounded-full shadow-lg min-w-40 bg-white/75 backdrop-blur">see result</button>
        ) : (
          <button type="button" onClick={handleNextButton} className="p-2 font-bold rounded-full shadow-lg min-w-40 bg-white/75 backdrop-blur">NEXT</button>
        )}
      </div>
    </div >
  )
}

export default Question;
