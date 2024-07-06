'use client'
import Image from "next/image";
import Link from "next/link";
import { createContext, useState } from "react";
import FetchData from "./FetchData";
const Mycontext=createContext({seeAnswer:null});
const Home = () => {
  const [showLink, setShowLink] = useState(false);
  const [seeAnswer,setSeeAnswer]=useState(null);
  
  const clicked = (e) => {
    setShowLink(true);
    setSeeAnswer(e.target.value);
  }
  return (
    <div className="absolute w-full top-2/4 -translate-y-1/2 flex flex-col gap-8 justify-center items-center bg-white/75 p-3 backdrop-blur">
      <h1 className="text-center font-bold text-2xl">TOEIC No.5 練習問題</h1>
      <p>
        問題数：{<FetchData />}問
      </p>
      <fieldset className="flex gap-4 flex-wrap">
        <div className="flex items-center cursor-pointer gap-4">
          <input type="radio" id="each" name="explanations" value="each" onChange={clicked} />
          <label for="each" className="font-bold text-lg lg:text-2xl">一問ごとに正誤を確認する</label>
        </div>
        <div className="flex items-center cursor-pointer gap-4">
          <input type="radio" id="end" name="explanations" value="end" onChange={clicked} />
          <label for="end" className="font-bold text-lg lg:text-2xl">全ての問題を回答してから正誤を確認する</label>
        </div>
      </fieldset>
      {showLink && 
      <Link href={`/question?seeAnswer=${seeAnswer}`} className="flex justify-center p-2 font-bold rounded-full shadow-lg hover:shadow-none min-w-40 bg-white/75">START</Link>
      }
    </div>
  );
}
export default Home;
