import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { associacaoService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [associacoes, setAssociacoes] = useState(null);

    useEffect(() => {
        associacaoService.getAll().then(x => setAssociacoes(x));
    }, []);

    function deleteAssociacao(id) {
        setAssociacoes(associacoes.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        associacaoService.delete(id).then(() => {
            setAssociacoes(associacoes => associacoes.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Associacao</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Adicionar associação</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Role</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {associacoes && associacoes.map(associacao =>
                        <tr key={associacao.id}>
                            <td>{associacao.title} {associacao.firstName} {associacao.lastName}</td>
                            <td>{associacao.email}</td>
                            <td>{associacao.role}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${associacao.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteAssociacao(associacao.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={associacao.isDeleting}>
                                    {associacao.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!associacoes &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {associacoes && !associacoes.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Associacoes To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };