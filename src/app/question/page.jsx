'use client'

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import fetchQuestions from "../datas/api";

const Question = () => {
  //クエリパラメータの値を取得する
  const router = useRouter();
  const params = useSearchParams();
  const seeAnswer = params.get('seeAnswer');

  const [currentNum, setCurrentNum] = useState(0); //今何問目
  const [selectedValue, setSelectedValue] = useState(null); //選択された値
  const [displayExplanation, setDisplayExplanation] = useState(false); //結果を表示する
  const [judgment, setJudgment] = useState(false); //正誤判定
  const [addAnswers, setAddAnswers] = useState([]); //回答を追加
  const [error, setError] = useState(null); //エラーを出力
  const [loading, setLoading] = useState(true); //ローディング画面

  // スプレッドシートから取得したデータ
  const [questionsData, setQuestionsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const questions = await fetchQuestions();
      setQuestionsData(questions);
      setLoading(false);
    }
    fetchData();
  }, []);

  // ラジオボタン選択
  const handleSelect = (e) => {
    setJudgment(true);
    setSelectedValue(e.target.value);
  }

  // 正誤を表示
  const handleDisplayExplanation = () => {
    setDisplayExplanation(true);
    setJudgment(false);
  }

  // 次の問題へ移動
  const handleNextButton = () => {
    if (selectedValue !== null) {
      setAddAnswers([...addAnswers, selectedValue]);
    } else {
      setAddAnswers([...addAnswers, '未回答']);
    }
    setCurrentNum(currentNum + 1);
    setSelectedValue(null);
    setDisplayExplanation(false);
    const radioButtons = document.querySelectorAll('input[name="drone"]');
    radioButtons.forEach(radioButton => radioButton.checked = false);
  }

  // 前の問題
  const handlePrevButton = () => {
    setCurrentNum(currentNum - 1);
    const radioButtons = document.querySelectorAll('input[name="drone"]');
    radioButtons.forEach((radioButton) => (radioButton.checked = false));
  }

  // 結果を見る
  const gotoResultPage = () => {
    const filteredAnswers = addAnswers.filter((answer) => answer !== null); // nullを除外した回答配列を作成

    setAddAnswers([...addAnswers, selectedValue]);

    // 結果を表示するためのクエリパラメータを出力する
    const answerParams = filteredAnswers.map((str, index) => (
      `Q${index + 1}=${str}${index === addAnswers.length - 1 ? '' : '&'}`
    )).join('');
    router.push(`/result?${answerParams}`);
  }

  return (
    <div className="flex flex-col gap-8 items-center">

      {/* 問題文 */}
      <p className="text-lg lg:text-3xl bg-white/75 lg:mt-12 p-3 backdrop-blur">
        Q{currentNum + 1}. /{questionsData.length}<br />
        {loading ? "問題を読み込み中..." : questionsData[currentNum]?.question}
      </p>

      {/* 選択肢 */}
      <fieldset className="flex flex-col gap-4">
        {loading ? "問題を読み込み中..." : questionsData[currentNum]?.choices.map((choice, index) => (
          <div key={index} className={`flex gap-4 text-2xl lg:text-3xl bg-white/75 p-3 rounded-lg backdrop-blur cursor-pointer hover:brightness-125 ${selectedValue === choice[0] ? '!bg-white' : '' // 選択された要素を白くする
            }`}>
            <input type="radio" id={choice[0]} name="drone" value={choice[0]} onChange={handleSelect} className="cursor-pointer" />
            <label className="w-full cursor-pointer" for={choice[0]}>{choice[0]}</label>
          </div>
        ))}
      </fieldset>

      {seeAnswer === 'each' && judgment && (
        <button type="button" onClick={handleDisplayExplanation} className="p-2 font-bold rounded-full shadow-lg min-w-40 bg-white/75 backdrop-blur lg:text-xl hover:brightness-125">正誤を確認する</button>
      )}
      {displayExplanation && (
        selectedValue === questionsData[currentNum].answer[0] ? (
          <div className="w-full bg-white/75 backdrop-blur p-3 text-center text-lg lg:text-3xl font-bold">〇　正解！！</div>
        ) : (
          <div className="w-full bg-white/75 backdrop-blur p-3 text-center text-lg lg:text-3xl font-bold">✕<br /><span className="font-normal text-base lg:text-3xl">正解は、{questionsData[currentNum].answer}</span></div>
        )
      )}
      <div className="flex gap-8">
        {currentNum !== 0 ? (<button type="button" onClick={handlePrevButton} className="p-2 font-bold rounded-full shadow-lg min-w-40 bg-white/75 backdrop-blur lg:text-xl hover:brightness-125">前の問題へ</button>) : ""}

        {loading ? "問題を読み込み中..." : questionsData.length - 1 === currentNum ? (
          <button onClick={gotoResultPage} className="p-2 font-bold rounded-full shadow-lg min-w-40 bg-white/75 backdrop-blur lg:text-xl hover:brightness-125">結果を見る</button>
        ) : (
          <button type="button" onClick={handleNextButton} className="p-2 font-bold rounded-full shadow-lg min-w-40 bg-white/75 backdrop-blur lg:text-xl hover:brightness-125">次の問題へ</button>
        )}
      </div>
    </div >
  )
}

export default Question;
