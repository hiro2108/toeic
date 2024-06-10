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
    <div className="flex flex-col gap-8 justify-center items-center">
      <h1 className="text-center font-bold text-2xl">Practice TOEIC No.5</h1>
      <FetchData />
      <fieldset className="flex gap-4 flex-wrap">
        <div className="flex items-center cursor-pointer gap-4">
          <input type="radio" id="each" name="explanations" value="each" onChange={clicked} />
          <label for="each" className="font-bold text-lg">See answer & explanations for each question.</label>
        </div>
        <div className="flex items-center cursor-pointer gap-4">
          <input type="radio" id="end" name="explanations" value="end" onChange={clicked} />
          <label for="end" className="font-bold text-lg">See answer & explanations at the end.</label>
        </div>
      </fieldset>
      {showLink && 
      <Link href={`/question?seeAnswer=${seeAnswer}`} className="flex justify-center p-2 font-bold rounded-full shadow-lg hover:shadow-none min-w-40">START</Link>
      }
    </div>
  );
}
export default Home;
