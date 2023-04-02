import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HomePage from "./components/home/HomePage";
import LoginVoter from './components/users/Login';
import Register from './components/users/Register';
import UploadCat from './components/cat/UploadCat';
import Rules from './components/rules/Rules';

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { UserProvider } from './components/context/UserContext';


function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Header />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LoginVoter />} />
              <Route path="/upload-cat" element={<UploadCat />} />
              <Route path="/rules" element={<Rules />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
