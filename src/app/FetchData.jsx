'use cliant'
import { useState, useEffect } from "react"

function FetchData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 非同期処理
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            // APIを使ってGoogleスプレッドシートを取得
            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_DOC_ID}/values/toeic?key=${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY}`
                );
                const data = await response.json();
                setData(data.values);
            }
            // もし取得できなければerrorを返す
            catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (data.length > 0) {
        const result = [];
        // スプレッドシートの行数分だけ問題を連想配列に格納
        for (let n = 1; n < data.length; n++) {
            result.push({
                question: data[n][0],
                choices: [[data[n][1]], [data[n][2]], [data[n][3]], [data[n][4]]],
                answer: [data[n][5]]
            });
        }
        return result;
    }
}

export default FetchData
