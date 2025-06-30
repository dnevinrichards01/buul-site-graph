import { useState } from "react"

export default function App() {
  const [frequency, setFrequency] = useState(1)

  const width = 300
  const height = 150
  const points = 100

  const getPath = () => {
    const step = width / points
    let d = `M 0 ${height / 2}`
    for (let i = 1; i <= points; i++) {
      const x = i * step
      const y = height / 2 - Math.sin((i / points) * frequency * 2 * Math.PI) * 50
      d += ` L ${x} ${y}`
    }
    return d
  }

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: 20,
        maxWidth: 320
      }}
    >
      <h3>Interactive Sine Graph</h3>
      <svg width={width} height={height} style={{ background: "#f3f3f3", borderRadius: 8 }}>
        <path
          d={getPath()}
          fill="none"
          stroke="black"
          strokeWidth={2}
        />
      </svg>
      <div style={{ marginTop: 12 }}>
        <label>Frequency: {frequency.toFixed(1)}</label>
        <input
          type="range"
          min={0.5}
          max={5}
          step={0.1}
          value={frequency}
          onChange={e => setFrequency(parseFloat(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  )
}
