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

    if (!question) return;

    try {

      setLoading(true);

      const response =
        await API.post(
          "/ai/chat",
          {
            question
          }
        );

      setAnswer(
        response.data.answer
      );

    } catch (err) {

      console.log(err);

      setAnswer(
        "AI server error"
      );

    } finally {

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
        placeholder="Ask AI anything..."
        value={question}
        onChange={(e) =>
          setQuestion(
            e.target.value
          )
        }
      />

      <button onClick={askAI}>

        {
          loading
            ? "Thinking..."
            : "Ask AI"
        }

      </button>

      {
        answer && (

          <div className="ai-answer">

            <p>
              {answer}
            </p>

          </div>

        )
      }

    </div>

  );

};

export default AIAssistant;