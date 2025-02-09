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
              <Route path="/products" element={<ErrorPage />} />
              <Route path="/" element={<ErrorPage />} />
              <Route path="/services/services-1" element={<ErrorPage />} />
              <Route path="/services/services-2" element={<ErrorPage />} />
              <Route path="/services/services-3" element={<ErrorPage />} />
              <Route path="/services/services-4" element={<ErrorPage />} />
              <Route path="/about" element={<ErrorPage />} />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
