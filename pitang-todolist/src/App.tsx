"use client";

import { useEffect, useState } from "react";
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
  const [time, setTime] = useState(timeConfig[mode] * 60);
  const [session, setSession] = useState(0);
  const [start, setStart] = useState(false);

  const [list, setList] = useState<string[]>([]);
  const initialTime = timeConfig[mode] * 60;

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const displayTime = formatTime(time);
  const colorMap: Record<TypeTime, string> = {
    "Focus": "text-[#FA6E6E]",
    "Short Break": "text-[#34D399]",
    "Long Break": "text-[#60A5FA]",
  };

  const colorClass = colorMap[mode];

  function handleModeChange(nextMode: TypeTime) {
    setMode(nextMode);
    setTime(timeConfig[nextMode] * 60);
    setStart(false);
  }

  function handleReset() {
    if (time < initialTime) {
      setSession((prev) => prev + 1);
      alert("Sessão concluída, na próxima tente usar o tempo completo.");
    }

    setStart(false);
    setTime(initialTime);
  }

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setStart(false);
          alert("Tempo finalizado!");
          setSession((prev) => prev + 1);
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);
  return (
    <div className="bg-[#0f172a] min-h-screen w-full flex flex-col items-center pt-8">
      <div className="flex items-center gap-6">
          <Button
            className={`rounded-full px-5 py-2 text-sm transition-colors duration-150 ${mode === "Focus" ? "bg-[#2D3A4A] text-white font-semibold" : "text-[#9AA5B4] font-normal"}`}
            onClick={() => handleModeChange("Focus")}
          >
            Focus
          </Button>

          <Button
            className={`rounded-full px-5 py-2 text-sm transition-colors duration-150 ${mode === "Short Break" ? "bg-[#2D3A4A] text-white font-semibold" : "text-[#9AA5B4] font-normal"}`}
            onClick={() => handleModeChange("Short Break")}
          >
            Short Break
          </Button>

          <Button
            className={`rounded-full px-5 py-2 text-sm transition-colors duration-150 ${mode === "Long Break" ? "bg-[#2D3A4A] text-white font-semibold" : "text-[#9AA5B4] font-normal"}`}
            onClick={() => handleModeChange("Long Break")}
          >
            Long Break
          </Button>
      </div>

      <div className="mt-8">
        <span className={`text-[120px] font-light tracking-wide ${colorClass}`}>
          {displayTime}
        </span>
      </div>

      <div className="mt-8 flex flex-row gap-5">
        <Button onClick={() => setStart(true)} className="bg-[#ef4444] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#dc2626] transition-colors duration-150">
          Start
        </Button>
        <Button onClick={handleReset} className="bg-[#6b7280] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#4b5563] transition-colors duration-150">
          Reset
        </Button>
      </div>
      <div className="mt-4 text-[#9aa5b4]">
        Session {session}
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
          <Button className="bg-white text-black px-4 py-2 rounded-md" onClick={()=> setList([...list, "New Task"])}>
            Add
          </Button>
        </div>
        <div className="mt-4">
          {list.map((item,index)=> (
            <div key={index} className="flex justify-center">
              <span className="text-[#9aa5b4]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
