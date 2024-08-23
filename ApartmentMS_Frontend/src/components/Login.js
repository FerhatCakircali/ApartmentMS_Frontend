import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.css';

const Login = () => {
    const [kullaniciAdi, setKullaniciAdi] = useState('');
    const [sifre, setSifre] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                kullanici_adi: kullaniciAdi,
                sifre: sifre,
            });
            if (response.status === 200) {
                const { uye_id, yetki_id } = response.data;
                // Kullanıcının yetki_id'sine göre yönlendirme
                if (yetki_id === 1) { // Admin
                    navigate(`/admin/${uye_id}`);
                } else if (yetki_id === 2) { // Editör
                    navigate(`/editor/${uye_id}`);
                } else if (yetki_id === 3) { // Resident
                    navigate(`/resident/${uye_id}`);
                }
            }
        } catch (err) {
            setError('Kullanıcı adı veya Şifre yanlış!');
        }
    };

    return (
        <div className="login-panel">
            <div className="login-container">
                <h1>Giriş Yap</h1>
                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={kullaniciAdi}
                    onChange={(e) => setKullaniciAdi(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={sifre}
                    onChange={(e) => setSifre(e.target.value)}
                />
                <button onClick={handleLogin}>Giriş Yap</button>
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
};

export default Login;
