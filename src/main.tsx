
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add a global polyfill for process.env if needed
if (typeof window !== 'undefined' && !window.process) {
  window.process = { env: {} } as any;
}

createRoot(document.getElementById("root")!).render(<App />);
