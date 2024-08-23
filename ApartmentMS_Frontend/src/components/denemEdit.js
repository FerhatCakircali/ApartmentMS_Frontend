import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './EditorPanel.css';

const EditorPanel = () => {
    const { uyeId } = useParams();
    const [activeTab, setActiveTab] = useState('duyurular');

    // State variables for data
    const [duyurular, setDuyurular] = useState([]);
    const [gelirler, setGelirler] = useState([]);
    const [giderler, setGiderler] = useState([]);
    
    // State variables for form inputs
    const [newDuyuru, setNewDuyuru] = useState('');
    const [newDuyuruTarih, setNewDuyuruTarih] = useState('');
    const [selectedDuyuru, setSelectedDuyuru] = useState(null);

    const [newGelir, setNewGelir] = useState({ tarih: '', gelirturu: '', tutar: '' });
    const [selectedGelir, setSelectedGelir] = useState(null);

    const [newGider, setNewGider] = useState({ tarih: '', giderturu: '', tutar: '' });
    const [selectedGider, setSelectedGider] = useState(null);

    const [profil, setProfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchDuyurular = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/duyurular');
            setDuyurular(response.data);
        } catch (err) {
            setError('Duyurular alınamadı.');
        }
    }, []);

    const fetchGelirler = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/gelir');
            setGelirler(response.data);
        } catch (err) {
            setError('Gelirler alınamadı.');
        }
    }, []);

    const fetchGiderler = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/gider');
            setGiderler(response.data);
        } catch (err) {
            setError('Giderler alınamadı.');
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
        fetchDuyurular();
        fetchGelirler();
        fetchGiderler();
        fetchProfil();
    }, [fetchDuyurular, fetchGelirler, fetchGiderler, fetchProfil]);

    const handleAddDuyuru = async () => {
        try {
            await axios.post('http://localhost:5000/duyurular', { tarih: newDuyuruTarih, duyuru: newDuyuru });
            fetchDuyurular();
            setNewDuyuru('');
            setNewDuyuruTarih('');
        } catch (err) {
            setError('Duyuru eklenemedi.');
        }
    };

    const handleAddGelir = async () => {
        try {
            await axios.post('http://localhost:5000/gelir', newGelir);
            fetchGelirler();
            setNewGelir({ tarih: '', gelirturu: '', tutar: '' });
        } catch (err) {
            setError('Gelir eklenemedi.');
        }
    };

    const handleAddGider = async () => {
        try {
            await axios.post('http://localhost:5000/gider', newGider);
            fetchGiderler();
            setNewGider({ tarih: '', giderturu: '', tutar: '' });
        } catch (err) {
            setError('Gider eklenemedi.');
        }
    };

    const handleUpdateDuyuru = async () => {
        if (selectedDuyuru) {
            try {
                await axios.put(`http://localhost:5000/duyurular/${selectedDuyuru.id}`, { tarih: newDuyuruTarih, duyuru: newDuyuru });
                fetchDuyurular();
                setNewDuyuru('');
                setNewDuyuruTarih('');
                setSelectedDuyuru(null);
            } catch (err) {
                setError('Duyuru güncellenemedi.');
            }
        }
    };

    const handleUpdateGelir = async () => {
        if (selectedGelir) {
            try {
                await axios.put(`http://localhost:5000/gelir/${selectedGelir.id}`, newGelir);
                fetchGelirler();
                setNewGelir({ tarih: '', gelirturu: '', tutar: '' });
                setSelectedGelir(null);
            } catch (err) {
                setError('Gelir güncellenemedi.');
            }
        }
    };

    const handleUpdateGider = async () => {
        if (selectedGider) {
            try {
                await axios.put(`http://localhost:5000/gider/${selectedGider.id}`, newGider);
                fetchGiderler();
                setNewGider({ tarih: '', giderturu: '', tutar: '' });
                setSelectedGider(null);
            } catch (err) {
                setError('Gider güncellenemedi.');
            }
        }
    };

    const handleDeleteDuyuru = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/duyurular/${id}`);
            fetchDuyurular();
        } catch (err) {
            setError('Duyuru silinemedi.');
        }
    };

    const handleDeleteGelir = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/gelir/${id}`);
            fetchGelirler();
        } catch (err) {
            setError('Gelir silinemedi.');
        }
    };

    const handleDeleteGider = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/gider/${id}`);
            fetchGiderler();
        } catch (err) {
            setError('Gider silinemedi.');
        }
    };

    const handleEditDuyuru = (duyuru) => {
        setSelectedDuyuru(duyuru);
        setNewDuyuru(duyuru.duyuru);
        setNewDuyuruTarih(duyuru.tarih); // Tarihi inputa doldur
    };

    const handleEditGelir = (gelir) => {
        setSelectedGelir(gelir);
        setNewGelir({ tarih: gelir.tarih, gelirturu: gelir.gelirturu, tutar: gelir.tutar }); // Gelir bilgilerini input alanlarına doldur
    };

    const handleEditGider = (gider) => {
        setSelectedGider(gider);
        setNewGider({ tarih: gider.tarih, giderturu: gider.giderturu, tutar: gider.tutar }); // Gider bilgilerini input alanlarına doldur
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="editor-panel">
            <div className="tabs">
                <button className={`tab-button ${activeTab === 'duyurular' ? 'active' : ''}`} onClick={() => setActiveTab('duyurular')}>Duyurular</button>
                <button className={`tab-button ${activeTab === 'gelirler' ? 'active' : ''}`} onClick={() => setActiveTab('gelirler')}>Gelirler</button>
                <button className={`tab-button ${activeTab === 'giderler' ? 'active' : ''}`} onClick={() => setActiveTab('giderler')}>Giderler</button>
                <button className={`tab-button ${activeTab === 'profil' ? 'active' : ''}`} onClick={() => setActiveTab('profil')}>Profil</button>
            </div>

            {activeTab === 'duyurular' && (
                <div className="tab-content">
                    <h2 className="tab-title">Duyurular</h2>
                    {error && <p className="error-message">{error}</p>}
                    <input
                        type="date"
                        value={newDuyuruTarih}
                        onChange={(e) => setNewDuyuruTarih(e.target.value)}
                        placeholder="Tarih"
                    />
                    <input
                        type="text"
                        value={newDuyuru}
                        onChange={(e) => setNewDuyuru(e.target.value)}
                        placeholder="Duyuru"
                    />
                    <button onClick={selectedDuyuru ? handleUpdateDuyuru : handleAddDuyuru}>
                        {selectedDuyuru ? 'Duyuru Güncelle' : 'Duyuru Ekle'}
                    </button>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Tarih</th>
                                <th>Duyuru</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {duyurular.map((duyuru) => (
                                <tr key={duyuru.id}>
                                    <td>{duyuru.tarih}</td>
                                    <td>{duyuru.duyuru}</td>
                                    <td>
                                        <button className="btn-update" onClick={() => handleEditDuyuru(duyuru)}>Düzenle</button>
                                        <button className="btn-delete" onClick={() => handleDeleteDuyuru(duyuru.id)}>Sil</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'gelirler' && (
                <div className="tab-content">
                    <h2 className="tab-title">Gelirler</h2>
                    {error && <p className="error-message">{error}</p>}
                    <input
                        type="date"
                        value={newGelir.tarih}
                        onChange={(e) => setNewGelir({ ...newGelir, tarih: e.target.value })}
                        placeholder="Tarih"
                    />
                    <input
                        type="text"
                        value={newGelir.gelirturu}
                        onChange={(e) => setNewGelir({ ...newGelir, gelirturu: e.target.value })}
                        placeholder="Gelir Türü"
                    />
                    <input
                        type="number"
                        value={newGelir.tutar}
                        onChange={(e) => setNewGelir({ ...newGelir, tutar: e.target.value })}
                        placeholder="Tutar"
                    />
                    <button onClick={selectedGelir ? handleUpdateGelir : handleAddGelir}>
                        {selectedGelir ? 'Gelir Güncelle' : 'Gelir Ekle'}
                    </button>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Tarih</th>
                                <th>Gelir Türü</th>
                                <th>Tutar</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gelirler.map((gelir) => (
                                <tr key={gelir.id}>
                                    <td>{gelir.tarih}</td>
                                    <td>{gelir.gelirturu}</td>
                                    <td>{gelir.tutar}</td>
                                    <td>
                                        <button className="btn-update" onClick={() => handleEditGelir(gelir)}>Düzenle</button>
                                        <button className="btn-delete" onClick={() => handleDeleteGelir(gelir.id)}>Sil</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'giderler' && (
                <div className="tab-content">
                    <h2 className="tab-title">Giderler</h2>
                    {error && <p className="error-message">{error}</p>}
                    <input
                        type="date"
                        value={newGider.tarih}
                        onChange={(e) => setNewGider({ ...newGider, tarih: e.target.value })}
                        placeholder="Tarih"
                    />
                    <input
                        type="text"
                        value={newGider.giderturu}
                        onChange={(e) => setNewGider({ ...newGider, giderturu: e.target.value })}
                        placeholder="Gider Türü"
                    />
                    <input
                        type="number"
                        value={newGider.tutar}
                        onChange={(e) => setNewGider({ ...newGider, tutar: e.target.value })}
                        placeholder="Tutar"
                    />
                    <button onClick={selectedGider ? handleUpdateGider : handleAddGider}>
                        {selectedGider ? 'Gider Güncelle' : 'Gider Ekle'}
                    </button>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Tarih</th>
                                <th>Gider Türü</th>
                                <th>Tutar</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {giderler.map((gider) => (
                                <tr key={gider.id}>
                                    <td>{gider.tarih}</td>
                                    <td>{gider.giderturu}</td>
                                    <td>{gider.tutar}</td>
                                    <td>
                                        <button className="btn-update" onClick={() => handleEditGider(gider)}>Düzenle</button>
                                        <button className="btn-delete"  onClick={() => handleDeleteGider(gider.id)}>Sil</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'profil' && profil && (
                <div className="tab-content">
                    <h2 className="tab-title">Profil Bilgileri</h2>
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

export default EditorPanel;
