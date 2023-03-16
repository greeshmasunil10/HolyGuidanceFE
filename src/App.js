import React, { useState } from "react";
import "./App.css";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsIcon from "./favicon.ico";

let GREETING_QUESTION = "What's troubling your soul, my friend?";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    const questionDiv = document.getElementById("ask-bubble");
    const answerDiv = document.getElementById("answer");

    questionDiv.style.display = "none";
    answerDiv.style.display = "none";

    e.preventDefault();
    if (!question) {
      setError("Please enter a question.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://holy-guidance-api.herokuapp.com/?question=${question}`
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setError(err.message);
    }

    answerDiv.style.display = "block";

    setIsLoading(false);
    setQuestion("");

    document.getElementById("question").innerHTML = question;
    questionDiv.style.display = "block";
    answerDiv.scrollTop = answerDiv.scrollHeight;

    answerDiv.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          <div className="banner">
            {" "}
            <img
              src={gsIcon}
              alt="GS Icon"
              style={{
                position: "relative",
                top: "0",
                left: "0",
                width: 50,
                height: 50,
                alignSelf:"left",
                // right:"30%"
                paddingLeft: 10,
                paddingRight: 10
              }}
            /> <div sty>HOLY GUIDANCE</div>
            
          </div>
          <p className="description">
            Get biblical guidance for your problems and worries.
          </p>
          <p className="greeting-qsn">{GREETING_QUESTION} </p>
          <br />
          <textarea
            className="input"
            type="text"
            name="question"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="button" type="submit">
          {isLoading ? <div className="dot-typing"></div> : "Ask Bible Buddy"}
        </button>
      </form>

      <div className="send-message" id="ask-bubble">
        <p
          style={{
            color: "var(--bubble-ask-color)",
            fontFamily: "EB Garamond",
          }}
        >
          You asked:
        </p>
        <p id="question" className="send-message-text"></p>
      </div>

      <div className="response" id="answer">
        {response && (
          <div className="message-box">
            <p style={{ color: "var(--bubble-dsc-color)" }}>
              Bible Buddy says...
            </p>
            <p className="message-text">{response}</p>
          </div>
        )}
      </div>

      <footer>
        <a
          href="https://github.com/greeshmasunil10/HolyGuidanceBE"
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-block", padding: "10px", color: "blue" }}
        >
          {" "}
          <FontAwesomeIcon icon={faStar} /> Designed and Built by Greeshma Sunil{" "}
        </a>
      </footer>
    </div>
  );
}

export default App;
