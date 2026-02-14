import React, { useState, useEffect } from "react"
import axios from "axios"

export default function ActivityRoom() {

  /* ---------------- NEWS SECTION ---------------- */

  const [newsData, setNewsData] = useState([])
  const [loadingNews, setLoadingNews] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [selectedNews, setSelectedNews] = useState(null)

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "kn", label: "Kannada" },
    { code: "ml", label: "Malayalam" },
    { code: "mr", label: "Marathi" },
  ]

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsdata.io/api/1/news",
          {
            params: {
              apikey: "pub_e3c662ea415f4da9b9c76a5f7e1d4ec7",
              q: "news",
              country: "in",
              language: selectedLanguage,
              
            },
          }
        )

        setNewsData(response.data.results || [])
        setLoadingNews(false)
      } catch {
        setError("Error fetching news")
        setLoadingNews(false)
      }
    }

    fetchNews()
  }, [selectedLanguage])

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value)
    setLoadingNews(true)
  }

  const handleNewsClick = (news) => {
    setSelectedNews(news)
  }

  const closeModal = () => {
    window.speechSynthesis.cancel()
    setSelectedNews(null)
  }

  /* ---------------- TTS MODAL ---------------- */

  const Modal = ({ news }) => {
    let speech = new SpeechSynthesisUtterance()

    const startSpeech = () => {
      speech.text = news.description || "No description available."
      speech.lang = selectedLanguage === "hi" ? "hi-IN" : "en-US"
      speech.rate = 1
      speech.pitch = 1
      window.speechSynthesis.speak(speech)
    }

    const stopSpeech = () => {
      window.speechSynthesis.cancel()
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl w-[500px] max-w-[90%] mt-30">
          <button
            onClick={closeModal}
            className="float-right font-bold text-red-500"
          >
            X
          </button>
          <h2 className="text-xl font-bold mb-4">{news.title}</h2>
          <p className="mb-4">
            {news.description || "No description available."}
          </p>

          <div className="flex gap-3 mb-4">
            <button
              onClick={startSpeech}
              className="px-4 py-2 bg-green-300 rounded-lg"
            >
              🔊 Start Speech
            </button>
            <button
              onClick={stopSpeech}
              className="px-4 py-2 bg-red-300 rounded-lg"
            >
              ⏹️ Stop Speech
            </button>
          </div>

          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Read Full Article
          </a>
        </div>
      </div>
    )
  }

  /* ---------------- TIC TAC TOE ---------------- */

  const [board, setBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState(null)

  const calculateWinner = (squares) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ]
    for (let line of lines) {
      const [a,b,c] = line
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleMove = (i) => {
    if (board[i] || winner) return
    const newBoard = [...board]
    newBoard[i] = "X"
    setBoard(newBoard)
    const win = calculateWinner(newBoard)
    if (win) return setWinner(win)

    const empty = newBoard.map((v,i)=> v===null?i:null).filter(v=>v!==null)
    if (empty.length === 0) return
    const random = empty[Math.floor(Math.random()*empty.length)]
    newBoard[random] = "O"
    setBoard([...newBoard])
    const botWin = calculateWinner(newBoard)
    if (botWin) setWinner(botWin)
  }

  const resetTicTacToe = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
  }

  /* ---------------- MEMORY GAME ---------------- */

  const emojis = ["🍎","🍌","🍇","🍒","🍉","🥝","🍍","🍑"]
  const shuffledCards = [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5)

  const [memoryCards, setMemoryCards] = useState(shuffledCards)
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return
    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (memoryCards[first] === memoryCards[second]) {
        setMatched([...matched, first, second])
      }
      setTimeout(() => setFlipped([]), 800)
    }
  }

  /* ---------------- QUICK MATH ---------------- */

  const [num1] = useState(Math.floor(Math.random()*10))
  const [num2] = useState(Math.floor(Math.random()*10))
  const [answer, setAnswer] = useState("")
  const [mathResult, setMathResult] = useState("")

  const checkMath = () => {
    if (parseInt(answer) === num1 + num2) {
      setMathResult("✅ Correct!")
    } else {
      setMathResult("❌ Try Again!")
    }
  }

  /* ---------------- ROCK PAPER SCISSORS ---------------- */

  const choices = ["Rock","Paper","Scissors"]
  const [rpsResult, setRpsResult] = useState("")

  const playRPS = (choice) => {
    const bot = choices[Math.floor(Math.random()*3)]
    if (choice === bot) return setRpsResult("Draw!")
    if (
      (choice==="Rock" && bot==="Scissors") ||
      (choice==="Paper" && bot==="Rock") ||
      (choice==="Scissors" && bot==="Paper")
    ) {
      setRpsResult("You Win!")
    } else {
      setRpsResult("Bot Wins!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feffe0] via-yellow-50 to-orange-50 p-8 ">

      <h1 className="text-4xl font-black text-center text-gray-800 mb-12 mt-30">
        🎮 Activity Room
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* All games unchanged (same as your original) */}

        {/* Tic Tac Toe */}
        <div className="bg-white/70 p-6 rounded-3xl shadow-lg text-center">
          <h2 className="font-bold text-xl mb-4">Tic Tac Toe</h2>
          <div className="grid grid-cols-3 gap-2 w-48 mx-auto">
            {board.map((val,i)=>(
              <button key={i} onClick={()=>handleMove(i)}
                className="h-14 bg-green-100 text-2xl font-bold rounded-lg">
                {val}
              </button>
            ))}
          </div>
          {winner && (
            <div className="mt-4">
              Winner: {winner}
              <button onClick={resetTicTacToe}
                className="block mx-auto mt-2 px-4 py-1 bg-green-400 rounded-lg">
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Memory */}
        <div className="bg-white/70 p-6 rounded-3xl shadow-lg text-center">
          <h2 className="font-bold text-xl mb-4">Memory Match</h2>
          <div className="grid grid-cols-4 gap-2">
            {memoryCards.map((card,index)=>(
              <button key={index} onClick={()=>handleFlip(index)}
                className="h-14 bg-yellow-100 text-xl rounded-lg">
                {flipped.includes(index) || matched.includes(index) ? card : "❓"}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Math */}
        <div className="bg-white/70 p-6 rounded-3xl shadow-lg text-center">
          <h2 className="font-bold text-xl mb-4">Quick Math</h2>
          <p className="text-lg mb-4">{num1} + {num2} = ?</p>
          <input value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
            className="border p-2 rounded-lg text-center"/>
          <button onClick={checkMath}
            className="ml-2 px-4 py-2 bg-green-300 rounded-lg">
            Check
          </button>
          <div className="mt-2">{mathResult}</div>
        </div>

        {/* RPS */}
        <div className="bg-white/70 p-6 rounded-3xl shadow-lg text-center">
          <h2 className="font-bold text-xl mb-4">Rock Paper Scissors</h2>
          <div className="flex justify-center gap-3">
            {choices.map(choice=>(
              <button key={choice}
                onClick={()=>playRPS(choice)}
                className="px-3 py-2 bg-orange-200 rounded-lg">
                {choice}
              </button>
            ))}
          </div>
          <div className="mt-4 font-bold">{rpsResult}</div>
        </div>

      </div>

      {/* NEWS SECTION */}
      <div className="mt-16 bg-white/70 p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">📰 Latest News</h2>

        <div className="mb-6">
          <label className="mr-2 font-semibold">Select Language:</label>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="border rounded p-1"
          >
            {languages.map(lang=>(
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {loadingNews ? (
          <p>Loading news...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul className="space-y-4">
            {newsData.map((item,index)=>(
              <li
                key={index}
                onClick={()=>handleNewsClick(item)}
                className="border-b pb-3 cursor-pointer hover:bg-yellow-50 p-2 rounded-lg"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">
                  {item.description?.slice(0,100)}...
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedNews && <Modal news={selectedNews} />}

    </div>
  )
}
