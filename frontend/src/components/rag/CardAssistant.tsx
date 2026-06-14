import { useState } from "react";
import { askCardQuestion } from "@/lib/api";

export function CardAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const res = await askCardQuestion(
        question
      );

      setAnswer(res.answer);
    } catch (err) {
      console.error(err);
      setAnswer(
        "Unable to get answer."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
      <h3 className="text-sm font-semibold mb-3">
        Ask CardWise AI
      </h3>

      <input
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask about rewards, lounge access, fees..."
        className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 text-sm"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-3 w-full rounded-xl bg-[var(--accent)] py-3 font-medium"
      >
        {loading
          ? "Thinking..."
          : "Ask"}
      </button>

      {answer && (
        <div className="mt-4 rounded-xl bg-black/20 border border-white/10 p-4">
          <p className="text-sm leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}