import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import EditorPanel from './components/EditorPanel';
import ResidentPanel from './components/ResidentPanel';
import Profil from './components/Profil';
import Duyurular from './components/Announcements';
import Gelirler from './components/Income';
import Giderler from './components/Expense';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin/:uyeId" element={<AdminPanel />} />
                <Route path="/editor/:uyeId" element={<EditorPanel />} />
                <Route path="/resident/:uyeId" element={<ResidentPanel />} />
                <Route path="/profil/:uyeId" element={<Profil />} />
                <Route path="/duyurular" element={<Duyurular />} />
                <Route path="/gelirler" element={<Gelirler />} />
                <Route path="/giderler" element={<Giderler />} />
            </Routes>
        </Router>
    );
};

export default App;
