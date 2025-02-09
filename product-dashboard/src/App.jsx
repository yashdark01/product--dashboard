import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ErrorPage from "./components/Error";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(true);

  const interval = setInterval(() => {
    setLoading(false);
    clearInterval(interval);
  }, 2000);

  return (
    <div className={`relative top-20`}>
      {loading ? (
        <div className="">
          <Loading content={"Loading products..."} />
        </div>
      ) : (
        <div>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/error" element={<ErrorPage />} />
              {/* <Route path="/about" element={<About />} /> */}
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
