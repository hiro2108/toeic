'use client'
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import fetchQuestions from "../datas/api";

const ResultContent = () => {
  const params = useSearchParams();
  const answers = [];

  // Extract answers from URL parameters
  for (const [key, value] of params.entries()) {
    const questionNumber = parseInt(key.substring(1));
    answers[questionNumber - 1] = value;
  }

  // スプレッドシートから取得したデータ
  const [questionsData, setQuestionsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const questions = await fetchQuestions();
      setQuestionsData(questions);
    }
    fetchData();
  }, []);

  const renderResultItem = (questionIndex) => {
    const question = questionsData[questionIndex];
    const userAnswer = answers[questionIndex];
    const correctAnswer = question.answer;
    return (
      <div key={questionIndex} className="result-item flex flex-col gap-1 lg:gap-4 bg-white/75 p-3 rounded-lg backdrop-blur max-w-screen-lg m-auto">
        <h2 className="text-2xl font-bold">Q{questionIndex + 1}. {userAnswer === correctAnswer ? (
          <span>〇</span>
        ) : (
          <span>✕</span>
        )}</h2>
        <p className="text-lg lg:text-3xl">Q. {question.question}</p>
        <div className="flex gap-1">
          <p className="text-lg lg:text-3xl">選択肢:</p>
          <ul className="flex flex-wrap gap-1">
            <li className="text-lg lg:text-3xl">{question.choices[0]}, </li>
            <li className="text-lg lg:text-3xl">{question.choices[1]}, </li>
            <li className="text-lg lg:text-3xl">{question.choices[2]}, </li>
            <li className="text-lg lg:text-3xl">{question.choices[3]}</li>
          </ul>
        </div>
        <p className="text-lg lg:text-3xl">あなたの回答: {userAnswer}</p>
        <p className="text-lg lg:text-3xl">正解. {correctAnswer}</p>
      </div>
    );
  };

  return (
    <div className="result pt-4 pb-4 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center	">結果発表</h1>
      <div className="flex flex-col gap-4">{questionsData.map((answer, index) => renderResultItem(index))}</div>
      <Link href="/" className="p-4 bg-white/75 rounded-full text-xl backdrop-blur m-auto max-w-60">最初の画面に戻る</Link>
    </div>
  )
}

const Result = () => {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
};

export default Result;
