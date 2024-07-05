'use client'
import data from "../datas/datas";
import { useSearchParams } from "next/navigation";


const Result = () => {
  const params = useSearchParams();
  const answers = [];

  // Extract answers from URL parameters
  for (const [key, value] of params.entries()) {
    const questionNumber = parseInt(key.substring(1));
    answers[questionNumber - 1] = value;
  }

  const renderResultItem = (questionIndex) => {
    const question = data[questionIndex];
    const userAnswer = answers[questionIndex];
    const correctAnswer = question.answer;
    return (
      <div key={questionIndex} className="result-item flex flex-col gap-1 lg:gap-4 bg-white/75 p-3 rounded-lg backdrop-blur">
        <h2 className="text-2xl font-bold">Q{questionIndex + 1}. {userAnswer === correctAnswer ? (
          <span>〇</span>
        ) : (
          <span>✕</span>
        )}</h2>
        <p className="text-lg lg:text-3xl">Q. {question.question}</p>
        <div className="flex gap-1">
          <p className="text-lg lg:text-3xl">Choices:</p>
          <ul className="flex flex-wrap gap-1">
            <li className="text-lg lg:text-3xl">{question.choices[0]}, </li>
            <li className="text-lg lg:text-3xl">{question.choices[1]}, </li>
            <li className="text-lg lg:text-3xl">{question.choices[2]}, </li>
            <li className="text-lg lg:text-3xl">{question.choices[3]}</li>
          </ul>
        </div>
        <p className="text-lg lg:text-3xl">Your answer: {userAnswer}</p>
        <p className="text-lg lg:text-3xl">A. {correctAnswer}</p>
      </div>
    );
  };

  return (
    <div className="result pt-4 pb-4">
      <h1 className="text-3xl mb-8 font-bold text-center	">Result</h1>
      <div className="flex flex-col gap-4">{data.map((answer, index) => renderResultItem(index))}</div>
    </div>
  )
}

export default Result
