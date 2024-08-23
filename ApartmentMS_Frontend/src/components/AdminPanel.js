import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './AdminPanel.css';

const AdminPanel = () => {
    const { uyeId } = useParams();
    const [activeTab, setActiveTab] = useState('bloklar');

    // State variables for data
    const [bloklar, setBloklar] = useState([]);
    const [uyeler, setUyeler] = useState([]);
    const [daireler, setDaireler] = useState([]);
    const [kullanicilar, setKullanicilar] = useState([]);
    const [yetkiler, setYetkiler] = useState([]);

    // State variables for form inputs
    const [newBlok, setNewBlok] = useState('');
    const [selectedBlok, setSelectedBlok] = useState(null);

    const [newUye, setNewUye] = useState({ ad: '', soyad: '', email: '', telefon: '' });
    const [selectedUye, setSelectedUye] = useState(null);

    const [newDaire, setNewDaire] = useState({ blok_id: '', kat: '', daire_numarasi: '', uye_id: '' });
    const [selectedDaire, setSelectedDaire] = useState(null);

    const [newKullanici, setNewKullanici] = useState({ kullanici_adi: '', sifre: '', uye_id: '', yetki_id: '' });
    const [selectedKullanici, setSelectedKullanici] = useState(null);

    const [profil, setProfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBloklar = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/bloklar');
            setBloklar(response.data);
        } catch (err) {
            setError('Bloklar alınamadı.');
        }
    }, []);

    const fetchUyeler = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/uyeler');
            setUyeler(response.data);
        } catch (err) {
            setError('Üyeler alınamadı.');
        }
    }, []);

    const fetchDaireler = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/daire');
            setDaireler(response.data);
        } catch (err) {
            setError('Daireler alınamadı.');
        }
    }, []);

    const fetchKullanicilar = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/kullanicilar');
            setKullanicilar(response.data);
        } catch (err) {
            setError('Kullanıcılar alınamadı.');
        }
    }, []);

    const fetchYetkiler = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/yetkiler');
            setYetkiler(response.data);
        } catch (err) {
            setError('Yetkiler alınamadı.');
        }
    }, []);

    const fetchProfil = useCallback(async () => {
        if (uyeId) {
            try {
                const response = await axios.get(`http://localhost:5000/profil/${uyeId}`);
                setProfil(response.data);
                setLoading(false);
            } catch (err) {
                setError('Profil bilgileri alınamadı.');
                setLoading(false);
            }
        }
    }, [uyeId]);

    useEffect(() => {
        fetchBloklar();
        fetchUyeler();
        fetchDaireler();
        fetchKullanicilar();
        fetchYetkiler();
        fetchProfil();
    }, [fetchBloklar, fetchUyeler, fetchDaireler, fetchKullanicilar, fetchYetkiler, fetchProfil]);

    const handleAddBlok = async () => {
        if (newBlok.trim() === '') {
            alert('Blok adı boş geçilemez!');
            return;
        }
        try {
            await axios.post('http://localhost:5000/bloklar', { blok: newBlok });
            fetchBloklar();
            setNewBlok('');
            alert('Başarıyla Eklendi!.');
        } catch (err) {
            alert('Blok eklenemedi.');
        }
    };

    const handleAddUye = async () => {
        const { ad, soyad, email, telefon } = newUye;
        if (ad.trim() === '' || soyad.trim() === '' || email.trim() === '' || telefon.trim() === '') {
            alert('Tüm alanlar doldurulmalıdır!');
            return;
        }
        try {
            await axios.post('http://localhost:5000/uyeler', newUye);
            fetchUyeler();
            setNewUye({ ad: '', soyad: '', email: '', telefon: '' });
            alert('Başarıyla Eklendi!.');
        } catch (err) {
            alert('Üye eklenemedi.');
        }
    };

    const handleAddDaire = async () => {
        const { blok_id, kat, daire_numarasi, uye_id } = newDaire;
        if (blok_id.trim() === '' || kat.trim() === '' || daire_numarasi.trim() === '' || uye_id.trim() === '') {
            alert('Tüm alanlar doldurulmalıdır!');
            return;
        }
        try {
            await axios.post('http://localhost:5000/daire', newDaire);
            fetchDaireler();
            setNewDaire({ blok_id: '', kat: '', daire_numarasi: '', uye_id: '' });
            alert('Başarıyla Eklendi!.');
        } catch (err) {
            alert('Daire eklenemedi.');
        }
    };

    const handleAddKullanici = async () => {
        const { kullanici_adi, sifre, uye_id, yetki_id } = newKullanici;
        if (kullanici_adi.trim() === '' || sifre.trim() === '' || uye_id.trim() === '' || yetki_id.trim() === '') {
            alert('Tüm alanlar doldurulmalıdır!');
            return;
        }
        try {
            await axios.post('http://localhost:5000/kullanicilar', newKullanici);
            fetchKullanicilar();
            setNewKullanici({ kullanici_adi: '', sifre: '', uye_id: '', yetki_id: '' });
            alert('Başarıyla Eklendi!.');
        } catch (err) {
            alert('Kullanıcı eklenemedi.');
        }
    };

    const handleUpdateBlok = async () => {
        if (selectedBlok) {
            if (newBlok.trim() === '') {
                alert('Blok adı boş geçilemez!');
                return;
            }
            try {
                await axios.put(`http://localhost:5000/bloklar/${selectedBlok.id}`, { blok: newBlok });
                fetchBloklar();
                setNewBlok('');
                setSelectedBlok(null);
                alert('Başarıyla Güncellendi!.');
            } catch (err) {
                alert('Blok güncellenemedi.');
            }
        }
    };

    const handleUpdateUye = async () => {
        if (selectedUye) {
            const { ad, soyad, email, telefon } = newUye;
            if (ad.trim() === '' || soyad.trim() === '' || email.trim() === '' || telefon.trim() === '') {
                alert('Tüm alanlar doldurulmalıdır!');
                return;
            }
            try {
                await axios.put(`http://localhost:5000/uyeler/${selectedUye.id}`, newUye);
                fetchUyeler();
                setNewUye({ ad: '', soyad: '', email: '', telefon: '' });
                setSelectedUye(null);
                alert('Başarıyla Güncellendi!.');
            } catch (err) {
                alert('Üye güncellenemedi.');
            }
        }
    };

    const handleUpdateDaire = async () => {
    if (selectedDaire) {
        const { blok_id, kat, daire_numarasi, uye_id } = newDaire;

        // Ensure the values are strings before using trim
        const blokIdStr = String(blok_id).trim();
        const katStr = String(kat).trim();
        const daireNumarasiStr = String(daire_numarasi).trim();
        const uyeIdStr = String(uye_id).trim();

        if (blokIdStr === '' || katStr === '' || daireNumarasiStr === '' || uyeIdStr === '') {
            alert('Tüm alanlar doldurulmalıdır!');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/daire/${selectedDaire.id}`, {
                blok_id: blokIdStr,
                kat: katStr,
                daire_numarasi: daireNumarasiStr,
                uye_id: uyeIdStr
            });
            fetchDaireler();
            setNewDaire({ blok_id: '', kat: '', daire_numarasi: '', uye_id: '' });
            setSelectedDaire(null);
            alert('Başarıyla Güncellendi!.');
        } catch (err) {
            alert('Daire güncellenemedi.');
        }
    }
};

const handleUpdateKullanici = async () => {
    if (selectedKullanici) {
        const { kullanici_adi, sifre, uye_id, yetki_id } = newKullanici;

        // Ensure the values are strings before using trim
        const kullaniciAdiStr = String(kullanici_adi).trim();
        const sifreStr = String(sifre).trim();
        const uyeIdStr = String(uye_id).trim();
        const yetkiIdStr = String(yetki_id).trim();

        // Check required fields
        if (kullaniciAdiStr === '' || uyeIdStr === '' || yetkiIdStr === '') {
            alert('Kullanıcı adı, üye ID ve yetki ID boş bırakılamaz!');
            return;
        }

        
        const updateData = {
            kullanici_adi: kullaniciAdiStr,
            uye_id: uyeIdStr,
            yetki_id: yetkiIdStr
        };

        if (sifreStr !== '') {
            updateData.sifre = sifreStr;
        }

        try {
            await axios.put(`http://localhost:5000/kullanicilar/${selectedKullanici.kullanici_adi}`, updateData);
            fetchKullanicilar();
            setNewKullanici({ kullanici_adi: '', sifre: '', uye_id: '', yetki_id: '' });
            setSelectedKullanici(null);
            alert('Başarıyla Güncellendi!');
        } catch (err) {
            console.error('Güncelleme hatası:', err);
            alert('Kullanıcı güncellenemedi.');
        }
    }
};



    const handleDeleteBlok = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/bloklar/${id}`);
            fetchBloklar();
            alert('Başarıyla silindi!.');
        } catch (err) {
            alert('Blok silinemedi.');
        }
    };

    const handleDeleteUye = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/uyeler/${id}`);
            fetchUyeler();
            alert('Başarıyla silindi!.');
        } catch (err) {
            alert('Üye silinemedi.');
        }
    };

    const handleDeleteDaire = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/daire/${id}`);
            fetchDaireler();
            alert('Başarıyla silindi!.');
        } catch (err) {
            alert('Daire silinemedi.');
        }
    };

    const handleDeleteKullanici = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/kullanicilar/${id}`);
            fetchKullanicilar();
            alert('Başarıyla silindi!.');
        } catch (err) {
            alert('Kullanıcı silinemedi.');
        }
    };
    const handleEditBlok = (blok) => {
        setSelectedBlok(blok);
        setNewBlok(blok.blok);
    };

    const handleEditUye = (uye) => { // Üye bilgilerini input alanlarına doldur
        setSelectedUye(uye);
        setNewUye({ 
            ad: uye.ad, 
            soyad: uye.soyad, 
            email: uye.email, 
            telefon: uye.telefon }); 
    };

    const handleEditDaire = (daire) => { // Daire bilgilerini input alanlarına doldur
        setSelectedDaire(daire);
        setNewDaire({ blok_id: daire.blok_id, 
            kat: daire.kat, 
            daire_numarasi: daire.daire_numarasi, 
            uye_id: daire.uye_id }); 
    };

    const handleEditKullanici = (kullanici) => { // Kullanıcı bilgilerini input alanlarına doldur
        setSelectedKullanici(kullanici);
        setNewKullanici({
            kullanici_adi: kullanici.kullanici_adi,
            sifre: '', 
            uye_id: kullanici.uye_id,
            yetki_id: kullanici.yetki_id
        });
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="admin-panel">


            <div className="tabs">
                <button className={`tab-button ${activeTab === 'bloklar' ? 'active' : ''}`} onClick={() => setActiveTab('bloklar')}>Bloklar</button>
                <button className={`tab-button ${activeTab === 'uyeler' ? 'active' : ''}`} onClick={() => setActiveTab('uyeler')}>Üyeler</button>
                <button className={`tab-button ${activeTab === 'daireler' ? 'active' : ''}`} onClick={() => setActiveTab('daireler')}>Daireler</button>
                <button className={`tab-button ${activeTab === 'kullanicilar' ? 'active' : ''}`} onClick={() => setActiveTab('kullanicilar')}>Kullanıcılar</button>
                <button className={`tab-button ${activeTab === 'profil' ? 'active' : ''}`} onClick={() => setActiveTab('profil')}>Profil</button>
            </div>

            {activeTab === 'bloklar'  && (
                <div className="tab-content">
                    <h2 className="tab-title">Bloklar</h2>
                    {error && <p className="error-message">{error}</p>}
                    <input
                        type="text"
                        value={newBlok}
                        onChange={(e) => setNewBlok(e.target.value)}
                        placeholder="Blok adı"
                    />
                    <button onClick={selectedBlok ? handleUpdateBlok : handleAddBlok}>
                        {selectedBlok ? 'Blok Güncelle' : 'Blok Ekle'}
                    </button>
                    <p></p>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Blok</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bloklar.map((blok) => (
                                <tr key={blok.id}>
                                    <td>{blok.blok}</td>
                                    <td>
                                        <button className="btn-update" onClick={() => handleEditBlok(blok)}>Düzenle</button>
                                        <button className="btn-delete" onClick={() => handleDeleteBlok(blok.id)}>Sil</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'uyeler' && (
                <div className="tab-content">
                    <h2 className="tab-title">Üyeler</h2>
                    {error && <p className="error-message">{error}</p>}
                    <input
                        type="text"
                        value={newUye.ad}
                        onChange={(e) => setNewUye({ ...newUye, ad: e.target.value })}
                        placeholder="Ad"
                    />
                    <input
                        type="text"
                        value={newUye.soyad}
                        onChange={(e) => setNewUye({ ...newUye, soyad: e.target.value })}
                        placeholder="Soyad"
                    />
                    <input
                        type="email"
                        value={newUye.email}
                        onChange={(e) => setNewUye({ ...newUye, email: e.target.value })}
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        value={newUye.telefon}
                        onChange={(e) => setNewUye({ ...newUye, telefon: e.target.value })}
                        placeholder="Telefon"
                    />
                    <button onClick={selectedUye ? handleUpdateUye : handleAddUye}>
                        {selectedUye ? 'Üye Güncelle' : 'Üye Ekle'}
                    </button>
                    <p></p>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Ad</th>
                                <th>Soyad</th>
                                <th>Email</th>
                                <th>Telefon</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uyeler.map((uye) => (
                                <tr key={uye.id}>
                                    <td>{uye.ad}</td>
                                    <td>{uye.soyad}</td>
                                    <td>{uye.email}</td>
                                    <td>{uye.telefon}</td>
                                    <td>
                                        <button className="btn-update" onClick={() => handleEditUye(uye)}>Düzenle</button>
                                        <button className="btn-delete" onClick={() => handleDeleteUye(uye.id)}>Sil</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'daireler' && (
                <div className="tab-content">
                    <h2 className="tab-title">Daireler</h2>
                    {error && <p className="error-message">{error}</p>}
                    <select
                        value={newDaire.blok_id}
                        onChange={(e) => setNewDaire({ ...newDaire, blok_id: e.target.value })}
                    >
                        <option value="">Blok Seç</option>
                        {bloklar.map((blok) => (
                            <option key={blok.id} value={blok.id}>
                                {blok.blok}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={newDaire.kat}
                        onChange={(e) => setNewDaire({ ...newDaire, kat: e.target.value })}
                        placeholder="Kat"
                    />
                    <input
                        type="text"
                        value={newDaire.daire_numarasi}
                        onChange={(e) => setNewDaire({ ...newDaire, daire_numarasi: e.target.value })}
                        placeholder="Daire Numarası"
                    />
                   <select
                        value={newDaire.uye_id}
                        onChange={(e) => setNewDaire({ ...newDaire, uye_id: e.target.value })}
                    >
                        <option value="">Üye Seç</option>
                        {uyeler.map((uye) => (
                            <option key={uye.id} value={uye.id}>
                                {uye.ad} {uye.soyad}
                            </option>
                        ))}
                    </select>
                    <button onClick={selectedDaire ? handleUpdateDaire : handleAddDaire}>
                        {selectedDaire ? 'Daire Güncelle' : 'Daire Ekle'}
                    </button>
                    <p></p>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Blok ID</th>
                                <th>Kat</th>
                                <th>Daire Numarası</th>
                                <th>Üye ID</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {daireler.map((daire) => (
                                <tr key={daire.id}>
                                    <td>{daire.blok_id}</td>
                                    <td>{daire.kat}</td>
                                    <td>{daire.daire_numarasi}</td>
                                    <td>{daire.uye_id}</td>
                                    <td>
                                        <button className="btn-update" onClick={() => handleEditDaire(daire)}>Düzenle</button>
                                        <button className="btn-delete" onClick={() => handleDeleteDaire(daire.id)}>Sil</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'kullanicilar' && (
                <div className="tab-content">
                    <h2 className="tab-title"> Kullanıcılar</h2>
                    {error && <p className="error-message">{error}</p>}
                    <input
                        type="text"
                        value={newKullanici.kullanici_adi}
                        onChange={(e) => setNewKullanici({ ...newKullanici, kullanici_adi: e.target.value })}
                        placeholder="Kullanıcı Adı"
                    />
                    <input
                        type="password"
                        value={newKullanici.sifre}
                        onChange={(e) => setNewKullanici({ ...newKullanici, sifre: e.target.value })}
                        placeholder="Şifre"
                    />
                 <select
                        value={newKullanici.uye_id}
                        onChange={(e) => setNewKullanici({ ...newKullanici, uye_id: e.target.value })}
                    >
                        <option value="">Üye Seç</option>
                        {uyeler.map((uye) => (
                            <option key={uye.id} value={uye.id}>
                                {uye.ad} {uye.soyad}
                            </option>
                        ))}
                    </select>
                    <select
                        value={newKullanici.yetki_id}
                        onChange={(e) => setNewKullanici({ ...newKullanici, yetki_id: e.target.value })}
                    >
                        <option value="">Yetki Seç</option>
                        {yetkiler.map(yetki => (
                            <option key={yetki.id} value={yetki.id}>{yetki.yetki}</option>
                        ))}
                    </select>
                    <button onClick={selectedKullanici ? handleUpdateKullanici : handleAddKullanici}>
                        {selectedKullanici ? 'Kullanıcı Güncelle' : 'Kullanıcı Ekle'}
                    </button>
                    <p></p>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Kullanıcı Adı</th>
                                <th>Üye ID</th>
                                <th>Yetki ID</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kullanicilar.map((kullanici) => (
                                <tr key={kullanici.kullanici_adi}>
                                    <td>{kullanici.kullanici_adi}</td>
                                    <td>{kullanici.uye_id}</td>
                                    <td>{kullanici.yetki_id}</td>
                                    <td>
                                        <button className="btn-update" onClick={() => handleEditKullanici(kullanici)}>Düzenle</button>
                                        <button className="btn-delete" onClick={() => handleDeleteKullanici(kullanici.kullanici_adi)}>Sil</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
           

           {activeTab === 'profil' && profil && (
                <div className="tab-content">
                    <h2 className="tab-title">Profil</h2>
                    {profil ? (
                            <div className="profil">
                            <p><strong>Ad:</strong> {profil.ad}</p>
                            <p><strong>Soyad:</strong> {profil.soyad}</p>
                            <p><strong>Email:</strong> {profil.email}</p>
                            <p><strong>Telefon:</strong> {profil.telefon}</p>
                            <p><strong>Blok:</strong> {profil.blok}</p>
                            <p><strong>Kat:</strong> {profil.kat}</p>
                            <p><strong>Daire Numarası:</strong> {profil.daire_numarasi}</p>
                            </div>
                        ) : (
                            <p>Profil bilgileri yükleniyor...</p>
                        )}
                    </div>
            )}
        </div>
    );
};

export default AdminPanel;