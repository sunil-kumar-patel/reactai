import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [questions, setQuestions] = useState([]);
  const APIKEY="AIzaSyApsyfqiguuahOyDq_1ik3zmDJP68B2qgQ";

  // Load questions from localStorage on mount
  useEffect(() => {
    const savedQuestions = localStorage.getItem("questions");
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  // Save questions to localStorage
  const saveQuestionsToStorage = (updatedQuestions) => {
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    setQuestions(updatedQuestions);
  };

  const handelQuestion = async () => {
    if (!question.trim()) return;
    
    // Add question to the list and save to localStorage
    const updatedQuestions = [...questions, { id: Date.now(), text: question }];
    saveQuestionsToStorage(updatedQuestions);

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": "AIzaSyDi-wqUAlmfeFBXv_Y_DJV5DeeVoR-qT3s"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: question }]
            }
          ]
        })
      }
    );

    const data = await res.json();
    console.log(data)
    setResponse(data.candidates[0].content.parts[0].text);
    setQuestion("");
  };







  return (
    <>
 <div className="grid grid-cols-5 h-screen text-center">
<div className="col-span-1 bg-zinc-800 overflow-y-auto p-4">
  <h2 className="text-white font-bold mb-4">Questions</h2>
  <ul className="space-y-2">
    {questions.length === 0 ? (
      <p className="text-zinc-400 text-sm">No questions yet</p>
    ) : (
      questions.map((q) => (
        <li
          key={q.id}
          className="text-zinc-300 text-sm bg-zinc-700 p-2 rounded cursor-pointer hover:bg-zinc-600 break-words"
          title={q.text}
        >
          {q.text.substring(0, 50)}{q.text.length > 50 ? "..." : ""}
        </li>
      ))
    )}
  </ul>
  {questions.length > 0 && (
    <button
      onClick={() => saveQuestionsToStorage([])}
      className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white text-sm p-2 rounded"
    >
      Clear All
    </button>
  )}
</div>

<div className="col-span-4">
<div className="container h-110 text-white">
dsfdsfdsfdsf

 <p>{response}</p>
</div>
<div className="bg-zinc-800 w-1/2 mx-auto flex items-center p-3 rounded-2xl shadow-lg border border-zinc-700">
  
  <input 
    type="text"
    value={question}
    onChange={(event)=>setQuestion(event.target.value)}  
    placeholder="Send a message..." 
    className="flex-1 bg-transparent text-white placeholder-zinc-400 outline-none px-2"
  />

  <button onClick={handelQuestion} className="text-white bg-green-600 hover:bg-green-500 p-2 rounded-xl">
    ➤
  </button>
</div>



</div>


 </div>

    
    </>
  )
}

export default App
