"use client";

import { useState } from "react";
import StartInterviewModal from "./start-interview-modal";

export default function StartInterviewButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Начать интервью
      </button>

      <StartInterviewModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
