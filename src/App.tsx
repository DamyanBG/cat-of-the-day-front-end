import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HomePage from "./components/home/HomePage";
import LoginVoter from './components/users/voters/LoginVoter';
import RegisterVoter from './components/users/voters/RegisterVoter';

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register-voter" element={<RegisterVoter />} />
            <Route path="/login-voter" element={<LoginVoter />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
