import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Main from "./pages/Main/Main";
import NovaPublicacao from "./pages/Main/NovaPublicacao";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/novapublicacao" element={<NovaPublicacao />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
