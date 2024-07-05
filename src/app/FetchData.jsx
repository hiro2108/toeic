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
    return (
        <div>
        </div>
    );
}

export default FetchData
