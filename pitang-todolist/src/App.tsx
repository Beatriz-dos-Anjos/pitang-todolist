"use client";

import { useState } from "react";
import { Button } from "./components/ui/button";
import {Input} from "./components/ui/input";

type TypeTime = "Focus" | "Short Break" | "Long Break";

const timeConfig = {
  Focus: 25,
  "Short Break": 5,
  "Long Break": 15,
};

export default function Home() {
  const [mode, setMode] = useState<TypeTime>("Focus");

  const minutes = timeConfig[mode];
  const displayTime = `${minutes.toString().padStart(2, "0")}:00`;

  return (
    <div className="bg-[#0f172a] min-h-screen w-full flex flex-col items-center pt-8">
      <div className="flex items-center gap-6">
          <Button
            className={`rounded-full px-5 py-2 text-sm transition-colors duration-150 ${mode === "Focus" ? "bg-[#2D3A4A] text-white font-semibold" : "text-[#9AA5B4] font-normal"}`}
            onClick={() => setMode("Focus")}
          >
            Focus
          </Button>

          <Button
            className={`rounded-full px-5 py-2 text-sm transition-colors duration-150 ${mode === "Short Break" ? "bg-[#2D3A4A] text-white font-semibold" : "text-[#9AA5B4] font-normal"}`}
            onClick={() => setMode("Short Break")}
          >
            Short Break
          </Button>

          <Button
            className={`rounded-full px-5 py-2 text-sm transition-colors duration-150 ${mode === "Long Break" ? "bg-[#2D3A4A] text-white font-semibold" : "text-[#9AA5B4] font-normal"}`}
            onClick={() => setMode("Long Break")}
          >
            Long Break
          </Button>
      </div>

      <div className="mt-8">
        <span className="text-[#f87171] text-8xl font-light tracking-wide">
          {displayTime}
        </span>
      </div>

      <div className="mt-8 flex flex-row gap-5">
        <Button className="bg-[#ef4444] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#dc2626] transition-colors duration-150">
          Start
        </Button>
        <Button className="bg-[#6b7280] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#4b5563] transition-colors duration-150">
          Reset
        </Button>
      </div>
      <div className="mt-4">
        Session 
      </div>

      <br />

      <div className="flex flex-col">
        <div className="mt-6">
          <span className="text-[#9aa5b4] text-sm">
            Tasks
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Input placeholder="New task here" className="mt-2 w-64" />
          <Button className="bg-white text-black px-4 py-2 rounded-md">
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
