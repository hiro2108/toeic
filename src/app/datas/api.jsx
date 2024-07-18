'use client'

const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_DOC_ID}/values/toeic?key=${process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY}`

const fetchQuestions = async () => {
    try {
        const response = await fetch(API_URL);

        // Googleスプレッドシートから取得したjsonデータを解析し、正しい連想配列に変換する
        const data = await response.json();
        const formattedQuestions = data.values.slice(1).map((questionRow) => {
            return {
                question: questionRow[0],
                choices: [[questionRow[1]], [questionRow[2]], [questionRow[3]], [questionRow[4]]],
                answer: [questionRow[5]],
            }
        });

        return formattedQuestions;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default fetchQuestions;