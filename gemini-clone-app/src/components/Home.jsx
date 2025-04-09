import React, { useState } from "react";
import plus from "../images/plus.png";
import microphone from "../images/microphone.png";
import send from "../images/send.png";

function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const apiKey = "AIzaSyBOW0OHTipJdo7reji0ly6yAliNx14rog0";

  const fetchResponse = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: input,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `Error ${res.status}: ${errorData.error?.message || "Unknown error"}`
        );
      }

      const data = await res.json();
      console.log("API Response:", data);
      setResponse(
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response received."
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse(error.message || "An error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl mb-24 mt-16">Hello, Kartik</h1>

      <div className="flex items-center">
        <div className="w-[500px] h-[80px] flex items-center border-2 rounded-2xl p-2">
          <input
            className="w-full h-full text-2xl outline-none"
            placeholder="Ask Gemini"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <img className="w-10 h-10 cursor-pointer" src={plus} alt="Add" />
          <img
            className="w-10 h-10 cursor-pointer"
            src={microphone}
            alt="Microphone"
          />
        </div>
        <button onClick={fetchResponse} className="ml-4">
          <img className="w-10 h-10" src={send} alt="Send" />
        </button>
      </div>

      {response && (
        <div className="w-300px m-4 bg-gray-800 text-white text-2xl mt-4 rounded-2xl p-4">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
