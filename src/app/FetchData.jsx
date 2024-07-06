'use cliant'
import { useState, useEffect } from "react"

function FetchData() {
    const [datas, setDatas] = useState([])
    useEffect(() => {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_DOC_ID}/values/toeic?key=${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY}`)
            .then(res => res.json())
            .then(datas =>
                setDatas(datas.values))
    }, [])
    const key=datas[0]
    if (key) {
        const question = key[0];
        const answer=key[5];
        const choices=key[1];
    
      } else {
        console.error('key is undefined');
      }
   
    const result=[]
    for(let n=1; n<datas.length;n++){
      const questionObject={
            question:datas[n][0],
            choices:[[datas[n][1]],[datas[n][2]],[datas[n][3]],[datas[n][4]]],
            answer:[datas[n][5]]
        };
        result.push(questionObject);
    }
    console.log(result);
    return (
        <span>
            {datas.length - 1}
        </span>
    );
}

export default FetchData
