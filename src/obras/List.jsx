import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { obraService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [obras, setObras] = useState(null);

    useEffect(() => {
        obraService.getAll().then(x => setObras(x));
    }, []);

    function deleteObra(id) {
        setObras(obras.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        obraService.delete(id).then(() => {
            setObras(obras => obras.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Obras</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Obra</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Título</th>
                        <th style={{ width: '30%' }}>Nome Titular</th>
                        <th style={{ width: '30%' }}>Título Alternativo</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {obras && obras.map(obra =>
                        <tr key={obra.id}>
                            <td>{obra.titulo} {obra.firstName} {obra.lastName}</td>
                            <td>{obra.nome_titular}</td>
                            <td>{obra.titulo_alternativo}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${obra.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteObra(obra.id)} className="btn btn-sm btn-danger btn-delete-obra" disabled={obra.isDeleting}>
                                    {obra.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!obras &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {obras && !obras.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Obras To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };