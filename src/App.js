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
  };

  return (
    <div className="sample">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          <div className="banner">Holy Guidance</div>
          <p>{GREETING_QUESTION} </p>
          <br />
          <textarea
            className="input"
            type="text"
            value={question}
            // autoCapitalize="sentences"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        <button className="button" type="submit">
          {isLoading ? <div className="loader"></div> : "Ask"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}

      {response && (
        <div className="message-box">
          <p className="message-text">{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;