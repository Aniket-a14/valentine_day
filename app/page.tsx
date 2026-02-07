"use client";

import { useState } from "react";
import QuestionSection from "../components/QuestionSection"
import CelebrationSection from "../components/CelebrationSection"
import Background from "../components/Background";

export default function Home() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <Background />
      <main id="main-content" className="z-10 w-full max-w-5xl flex flex-col items-center justify-center text-center">
        {!accepted ? (
          <div className="w-full animate-in fade-in zoom-in duration-1000 fill-mode-forwards">
            <QuestionSection onAccept={() => setAccepted(true)} />
          </div>
        ) : (
          <div className="w-full animate-in zoom-in fade-in duration-1000 delay-100 fill-mode-forwards p-4">
            <CelebrationSection />
          </div>
        )}
      </main>
    </div>
  );
}
