import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HomePage from "./components/home/HomePage";
import LoginVoter from './components/users/Login';
import Register from './components/users/Register';
import UploadCat from './components/cat/UploadCat';
import Rules from './components/rules/Rules';
import { UserProvider } from './components/context/UserContext';
import Vote from './components/cat/Vote';
import CatReview from './components/cat/CatReview';
import { CatExistsProvider } from './components/context/CatExistsContext';

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <CatExistsProvider>
          <BrowserRouter>
            <Header />
            <main className="p-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginVoter />} />
                <Route path="/upload-cat" element={<UploadCat />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/vote" element={<Vote />} />
                <Route path="/cat-review" element={<CatReview />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </CatExistsProvider>
      </UserProvider>
    </div>
  );
}

export default App;
