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
      <div key={questionIndex} className="result-item flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Q{questionIndex + 1}. {userAnswer === correctAnswer ? (
          <span>〇</span>
        ) : (
          <span>✕</span>
        )}</h2>
        <p>Q. {question.question}</p>
        <div className="flex gap-1">
          <p>Choices:</p>
          <ul className="flex gap-1">
            <li>{question.choices[0]}, </li>
            <li>{question.choices[1]}, </li>
            <li>{question.choices[2]}, </li>
            <li>{question.choices[3]}</li>
          </ul>
        </div>
        <p>Your answer: {userAnswer}</p>
        <p>A. {correctAnswer}</p>
      </div>
    );
  };

  return (
    <div className="result">
      <h1 className="text-3xl mb-8 font-bold">Result</h1>
      <div className="flex flex-col gap-4">{data.map((answer, index) => renderResultItem(index))}</div>
    </div>
  )
}

export default Result
