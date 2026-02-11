import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
