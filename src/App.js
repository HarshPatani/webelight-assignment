import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import CommitActivity from "./pages/CommitActivity/CommitActivity";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route path="/details/:user/:repo" element={<CommitActivity />} />
      </Routes>
    </div>
  );
}

export default App;
