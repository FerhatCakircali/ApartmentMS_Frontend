import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Income = () => {
    const [gelirler, setGelirler] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/gelir')
            .then(response => {
                console.log('Gelirler:', response.data); // Kontrol amaçlı
                setGelirler(response.data);
            })
            .catch(error => console.error('Error fetching incomes:', error));
    }, []);

    return (
        <div>
            <h2>Gelirler</h2>
            <ul>
                {gelirler.length > 0 ? (
                    gelirler.map(gelir => (
                        <li key={gelir.id}>
                            <p>{gelir.gelirturu}: {gelir.tutar} TL</p>
                            <small>{gelir.tarih}</small>
                        </li>
                    ))
                ) : (
                    <p>Gelir bulunamadı.</p>
                )}
            </ul>
        </div>
    );
};

export default Income;
