import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Announcements = () => {
    const [duyurular, setDuyurular] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/duyurular')
            .then(response => setDuyurular(response.data))
            .catch(error => console.error('Error fetching announcements:', error));
    }, []);

    return (
        <div>
            <h2>Duyurular</h2>
            <ul>
                {duyurular.map(duyuru => (
                    <li key={duyuru.id}>
                        <p>{duyuru.duyuru}</p>
                        <small>{duyuru.tarih}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Announcements;
