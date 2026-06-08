import {
  BrowserRouter,
  Routes,
  Route
}
  from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import FindJobs from "./pages/FindJobs";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/resume"
          element={<ResumeAnalyzer />}
        />

        <Route
          path="/jobs"
          element={<FindJobs />}
        />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;