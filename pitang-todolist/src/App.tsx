"use client";

import { useEffect, useState } from "react";

type TypeTime = "Focus" | "Short Break" | "Long Break";

const timeConfig = { Focus: 25, "Short Break": 5, "Long Break": 15 };

const colorMap: Record<TypeTime, string> = {
  "Focus": "#FF6B00",        
  "Short Break": "#00C2A8", 
  "Long Break": "#4A9EFF",  
};

export default function Home() {
  const [mode, setMode] = useState<TypeTime>("Focus");
  const [time, setTime] = useState(timeConfig[mode] * 60);
  const [session, setSession] = useState(0);
  const [start, setStart] = useState(false);
  const [list, setList] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const initialTime = timeConfig[mode] * 60;
  const color = colorMap[mode];

  function formatTime(t: number) {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  }

  function handleModeChange(next: TypeTime) {
    setMode(next);
    setTime(timeConfig[next] * 60);
    setStart(false);
  }

  function handleReset() {
    if (time < initialTime) setSession((p) => p + 1);
    setStart(false);
    setTime(initialTime);
    alert("Sessão concluída, na próxima vez utilize o tempo completo para melhores resultados!");
  }

  function handleAddTask() {
    const newTask = taskInput.trim();
    setList((prevList) => [...prevList, newTask]);
    setTaskInput("");
  }

  function handleRemoveTask(taskIndex: number) {
  setList((prevList) => prevList.filter((item, index) => index !== taskIndex));
}
  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStart(false);
          setSession((p) => p + 1);
          alert("Tempo finalizado!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [start]);

  return (
    <div style={{
      background: "#0a1628", 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "48px",
      fontFamily: "sans-serif",
      color: "#e2e8f0",
    }}>

      <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
        {(["Focus", "Short Break", "Long Break"] as TypeTime[]).map((mode) => (
          <button key={mode} onClick={() => handleModeChange(mode)} style={{
            background: "#132040" ,
            color: "#e2e8f0",
            border: "1px solid",
            borderColor:  "#1e3a5f" ,
            borderRadius: "999px",
            padding: "6px 16px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: mode === mode ? 600 : 400,
          }}>
            {mode}
          </button>
        ))}
      </div>

      <span style={{
        fontSize: "96px",
        fontWeight: 300,
        color: color,
        letterSpacing: "-2px",
        lineHeight: 1,
        marginBottom: "28px",
      }}>
        {formatTime(time)}
      </span>

      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <button onClick={() => setStart((prev) => !prev)} style={{
          background: color,
          color: "#fff",
          border: "none",
          borderRadius: "999px",
          padding: "12px 36px",
          fontSize: "15px",
          fontWeight: 600,
          cursor: "pointer",
        }}
        >
          {start ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset} style={{
          background: "#132040",
          color: "#4a607a",
          border: "1px solid #1e3a5f",
          borderRadius: "999px",
          padding: "12px 32px",
          fontSize: "15px",
          fontWeight: 500,
          cursor: "pointer",
        }}
          
        >
          Reset
        </button>
      </div>

      <span style={{ color: "#2a4060", fontSize: "13px", marginBottom: "40px" }}>
        Session {session}
      </span>

      <br style={{ width: "100%", borderTop: "1px solid #1e3a5f", marginBottom: "40px" }} />
      <div style={{ width: "100%", maxWidth: "480px", padding: "0 24px" }}>
        <p style={{ textAlign: "center", color: "#4a607a", fontSize: "15px", marginBottom: "16px", fontWeight: 500 }}>
          Tasks
        </p>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <input
            placeholder="New task here"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            style={{
              flex: 1,
              background: "#0f1e35",
              border: "1px solid #1e3a5f",
              borderRadius: "8px",
              padding: "10px 14px",
              color: "#e2e8f0",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button onClick={handleAddTask} style={{
            background: color,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
         
          >
            Add
          </button>
        </div>

        {list.length === 0 ? (
          <p style={{ textAlign: "center", color: "#1e3a5f", fontSize: "13px" }}>No tasks yet</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {list.map((item, index) => (
              <div key={index} style={{
                background: "#0f1e35",
                border: "1px solid #1e3a5f",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "14px",
                color: "#4a7a9b",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                {item}
                <button   onClick={() => handleRemoveTask(index)} style={{
                  background: "none",
                  border: "none",
                  color: "#1e3a5f",
                  cursor: "pointer",
                  fontSize: "18px",
                  lineHeight: 1,
                }}
              
                >×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}