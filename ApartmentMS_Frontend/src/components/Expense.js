import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Expense = () => {
    const [giderler, setGiderler] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/gider')
            .then(response => {
                console.log('Giderler:', response.data); // Kontrol amaçlı
                setGiderler(response.data);
            })
            .catch(error => console.error('Error fetching expenses:', error));
    }, []);

    return (
        <div>
            <h2>Giderler</h2>
            <ul>
                {giderler.length > 0 ? (
                    giderler.map(gider => (
                        <li key={gider.id}>
                            <p>{gider.giderturu}: {gider.tutar} TL</p>
                            <small>{gider.tarih}</small>
                        </li>
                    ))
                ) : (
                    <p>Gider bulunamadı.</p>
                )}
            </ul>
        </div>
    );
};

export default Expense;
