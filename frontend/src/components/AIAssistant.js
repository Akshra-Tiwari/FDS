import { useState } from "react";

import API from "../services/api";

const AIAssistant = () => {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const askAI = async () => {

    try {

      setLoading(true);

      const response =
        await API.post(
          "/ai/ask",
          {
            question
          }
        );

      console.log(
        response.data
      );

      setAnswer(
        response.data.answer
      );

    }

    catch (error) {

      console.log(
        "AI ERROR:",
        error.response?.data ||
        error.message
      );

      setAnswer(
        "AI server error"
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="ai-card">

      <h2>
        AI Fraud Assistant
      </h2>

      <input
        type="text"
        placeholder="Ask something..."
        value={question}
        onChange={(e) =>
          setQuestion(
            e.target.value
          )
        }
      />

      <button
        onClick={askAI}
      >

        {
          loading
            ? "Thinking..."
            : "Ask AI"
        }

      </button>

      {
        answer && (

          <p>
            {answer}
          </p>

        )
      }

    </div>

  );

};

export default AIAssistant;