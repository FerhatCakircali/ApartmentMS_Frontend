import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ResidentPanel.css';

const ResidentPanel = () => {
    const { uyeId } = useParams();  // Route parametresinden uyeId'yi alıyoruz.
    const [activeTab, setActiveTab] = useState('duyurular');
    const [duyurular, setDuyurular] = useState([]);
    const [gelir, setGelir] = useState([]);
    const [gider, setGider] = useState([]);
    const [profil, setProfil] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Duyurular verisini al
        axios.get('/duyurular')
            .then(response => setDuyurular(response.data))
            .catch(error => console.error('Duyurular yüklenirken hata oluştu:', error));

        // Gelir verisini al
        axios.get('/gelir')
            .then(response => setGelir(response.data))
            .catch(error => console.error('Gelirler yüklenirken hata oluştu:', error));

        // Gider verisini al
        axios.get('/gider')
            .then(response => setGider(response.data))
            .catch(error => console.error('Giderler yüklenirken hata oluştu:', error));

        // Profil verisini uyeId'ye göre al
        axios.get(`/profil/${uyeId}`)  // Profil verisini uyeId'ye göre çekiyoruz
            .then(response => {
                setProfil(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Profil yüklenirken hata oluştu:', error);
                setLoading(false);
            });
    }, [uyeId]);  // uyeId değiştiğinde profil verisini yeniden çek

    // Tab değiştirici fonksiyon
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="resident-panel">
            <div className="tabs">
                <button
                    onClick={() => handleTabChange('duyurular')}
                    className={activeTab === 'duyurular' ? 'active' : ''}
                >
                    Duyurular
                </button>
                <button
                    onClick={() => handleTabChange('gelir')}
                    className={activeTab === 'gelir' ? 'active' : ''}
                >
                    Gelir
                </button>
                <button
                    onClick={() => handleTabChange('gider')}
                    className={activeTab === 'gider' ? 'active' : ''}
                >
                    Gider
                </button>
                <button
                    onClick={() => handleTabChange('profil')}
                    className={activeTab === 'profil' ? 'active' : ''}
                >
                    Profil
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'duyurular' && (
                    <div>
                        <h2>Duyurular</h2>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Tarih</th>
                                    <th>Duyuru</th>
                                </tr>
                            </thead>
                            <tbody>
                                {duyurular.map((duyuru, index) => (
                                    <tr key={index}>
                                        <td>{duyuru.tarih}</td>
                                        <td>{duyuru.duyuru}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === 'gelir' && (
                    <div>
                        <h2>Gelirler</h2>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Tarih</th>
                                    <th>Gelir Türü</th>
                                    <th>Tutar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gelir.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.tarih}</td>
                                        <td>{item.gelirturu}</td>
                                        <td>{item.tutar} TL</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === 'gider' && (
                    <div>
                        <h2>Giderler</h2>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Tarih</th>
                                    <th>Gider Türü</th>
                                    <th>Tutar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gider.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.tarih}</td>
                                        <td>{item.giderturu}</td>
                                        <td>{item.tutar} TL</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === 'profil' && (
                    <div>
                        <h2>Profil Bilgileri</h2>
                        {loading ? (
                            <p>Yükleniyor...</p>
                        ) : (
                            <div className="profil">
                            <p><strong>Ad:</strong> {profil.ad}</p>
                            <p><strong>Soyad:</strong> {profil.soyad}</p>
                            <p><strong>Email:</strong> {profil.email}</p>
                            <p><strong>Telefon:</strong> {profil.telefon}</p>
                            <p><strong>Blok:</strong> {profil.blok}</p>
                            <p><strong>Kat:</strong> {profil.kat}</p>
                            <p><strong>Daire Numarası:</strong> {profil.daire_numarasi}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResidentPanel;
