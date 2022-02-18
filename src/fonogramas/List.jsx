import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fonogramaService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [fonogramas, setFonogramas] = useState(null);

    useEffect(() => {
        fonogramaService.getAll().then(x => setFonogramas(x));
    }, []);

    function deleteFonograma(id) {
        setFonogramas(fonogramas.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        fonogramaService.delete(id).then(() => {
            setFonogramas(fonogramas => fonogramas.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Fonogramas</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Adcionar fonograma</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Titulo</th>
                        <th style={{ width: '30%' }}>Produtor</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {fonogramas && fonogramas.map(fonograma =>
                        <tr key={fonograma.id}>
                            <td>{fonograma.titulo_faixa} </td>
                            <td>{fonograma.produtor_fonografico}</td>
                            <td>{fonograma.email}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${fonograma.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteFonograma(fonograma.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={fonograma.isDeleting}>
                                    {fonograma.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!fonogramas &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {fonogramas && !fonogramas.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };