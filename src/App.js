import React, { useState } from "react";
import "./App.css";

let GREETING_QUESTION = "What's troubling your soul, my friend?";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
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

    setIsLoading(false);
    setQuestion("");
  };

  return (
    <div className="sample">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          <div className="banner">HOLY GUIDANCE</div>
          <p className="description">
            Get biblical guidance for your problems and worries.
          </p>
          <p className="greeting-qsn">{GREETING_QUESTION} </p>
          <br />
          <textarea
            className="input"
            type="text"
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


      {response && (
        <div className="message-box">
          <p style={{ fontWeight: "bold" }}>Bible Buddy says...</p>
          <p className="message-text">{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
