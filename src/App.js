import './App.css';
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from './components/errorBoundary';

// Components
import Results from "./components/results";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Routes>
          <Route exact path="/" element={<Results />} />
        </Routes>
      </ErrorBoundary>
    </div>

  );
}

export default App;
