import { Map } from "./components/map"
import { Controls } from "./components/ui/controls"

function App() {
  return (
    <div className="h-screen w-screen bg-neutral-800">
      <Controls />
      <Map />
    </div>
  )
}

export default App
