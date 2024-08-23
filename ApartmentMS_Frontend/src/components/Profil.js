import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profil = () => {
    const { uyeId } = useParams(); // URL parametresinden kullanıcı ID'sini al
    const [profil, setProfil] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfil = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/profil/${uyeId}`);
                setProfil(response.data);
            } catch (err) {
                setError('Profil bilgileri alınamadı.');
            }
        };

        fetchProfil();
    }, [uyeId]);

    if (error) return <div>{error}</div>;
    if (!profil) return <div>Yükleniyor...</div>;

    // Verileri kontrol ederek eksik olanları "-" ile değiştiriyoruz.
    const blok = profil.blok || '-';
    const kat = profil.kat || '-';
    const daire_numarasi = profil.daire_numarasi || '-';

    return (
        <div>
            <h1>Profil Bilgileri</h1>
            <p>Ad: {profil.ad}</p>
            <p>Soyad: {profil.soyad}</p>
            <p>Email: {profil.email}</p>
            <p>Telefon: {profil.telefon}</p>
            <p>Blok: {blok}</p>
            <p>Kat: {kat}</p>
            <p>Daire Numarası: {daire_numarasi}</p>
        </div>
    );
};

export default Profil;
