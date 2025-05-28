import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsIcon from "./favicon.ico";

function App() {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]); // [{sender: 'user'|'bot', text: string}]
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError("Please type your question or concern above.");
      return;
    }
    setError(null);

    // Add user's question to conversation
    setConversation((prev) => [
      ...prev,
      { sender: "user", text: question }
    ]);
    setIsLoading(true);

    try {
      const res = await fetch(
        `https://holy-guidance-api.herokuapp.com/?question=${encodeURIComponent(
          question
        )}`
      );
      if (!res.ok) {
        throw new Error(`Sorry, something went wrong. Please try again.`);
      }
      const data = await res.json();
      setConversation((prev) => [
        ...prev,
        { sender: "bot", text: data.response }
      ]);
    } catch (err) {
      setConversation((prev) => [
        ...prev,
        { sender: "bot", text: err.message }
      ]);
    }

    setIsLoading(false);
    setQuestion("");
  };

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation, isLoading]);

  // Visible text variables
  const APP_TITLE = "HOLY GUIDANCE";
  const APP_DESCRIPTION =
    "Get personalized biblical guidance for your questions, worries, or life decisions.";
  const PLACEHOLDER_TEXT =
    "Type your question or describe your situation here...";
  const FOOTER_TEXT = "Designed and Built by Greeshma Sunil";

  // Greeting logic at the top
  let GREETING_QUESTION = "Ask any question or share your concern.";
  if (new Date().getHours() < 12) {
    GREETING_QUESTION = "Good morning! Ask any question or share your concern.";
  } else if (new Date().getHours() < 18) {
    GREETING_QUESTION = "Good afternoon! Ask any question or share your concern.";
  } else {
    GREETING_QUESTION = "Good evening! Ask any question or share your concern.";
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          <div className="banner">
            <img
              src={gsIcon}
              alt="GS Icon"
              style={{
                position: "relative",
                top: "0",
                left: "0",
                width: 50,
                height: 50,
                alignSelf: "left",
                paddingLeft: 10,
                paddingRight: 10
              }}
            />
            <div>{APP_TITLE}</div>
          </div>
          <p className="description">{APP_DESCRIPTION}</p>
          <br />
          <textarea
            className="input"
            type="text"
            name="question"
            placeholder={PLACEHOLDER_TEXT}
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
        <button className="button" type="submit" disabled={isLoading}>
          {isLoading ? <div className="dot-typing"></div> : "Ask"}
        </button>
      </form>

      <div style={{ marginTop: 32, marginBottom: 8 }}>
        <h2 style={{ fontFamily: "EB Garamond", fontWeight: 700, color: "#6b4f27", letterSpacing: 1, fontSize: 22, margin: 0 }}>
          Chat History
        </h2>
        <div style={{ height: 2, background: "linear-gradient(90deg, #e0c068 0%, #bfa76a 100%)", borderRadius: 2, margin: "8px 0 16px 0" }} />
      </div>

      <div className="chat-history" style={{ minHeight: 300, maxHeight: 400, overflowY: "auto", background: "#f7f3ea", borderRadius: 8, padding: 16 }}>
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: 8
            }}
          >
            <div
              style={{
                background: msg.sender === "user"
                  ? "#e0c068"
                  : "#6b4f27",
                color: msg.sender === "user" ? "#4b3a13" : "#fffbe6",
                borderRadius: 16,
                padding: "10px 16px",
                maxWidth: "70%",
                fontFamily: "EB Garamond",
                boxShadow: msg.sender === "user"
                  ? "0 4px 12px 0 rgba(224,192,104,0.18), 0 1.5px 0 #bfa76a"
                  : "0 4px 12px 0 rgba(34, 26, 16, 0.18), 0 1.5px 0 #a68b5b"
              }}
            >
              <strong style={{ fontSize: 12, color: msg.sender === "user" ? "#7c5c1d" : "#ffe082" }}>
                {msg.sender === "user" ? "You" : "Holy Guidance"}
              </strong>
              <div style={{ marginTop: 4 }}>{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 8 }}>
            <div
              style={{
                background: "#6b4f27",
                borderRadius: 16,
                padding: "10px 16px",
                maxWidth: "70%",
                fontFamily: "EB Garamond",
                boxShadow: "0 4px 12px 0 rgba(107,79,39,0.18), 0 1.5px 0 #a68b5b"
              }}
            >
              <div className="dot-typing"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <footer>
        <a
          href="https://github.com/greeshmasunil10/HolyGuidanceBE"
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-block", padding: "10px", color: "#6b4f27" }}
        >
          <FontAwesomeIcon icon={faStar} /> {FOOTER_TEXT}
        </a>
      </footer>
    </div>
  );
}

export default App;
