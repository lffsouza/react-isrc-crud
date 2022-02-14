import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { associacaoService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        associacao: Yup.string()
            .required('Associação is required'),        
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        email_contato_associacao: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),    
        nome_contato_associacao: Yup.string()
            .required('Nome contato na associação is required'),
        slug_artista: Yup.string()
            .required('Artista is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createAssociacao(data)
            : updateAssociacao(id, data);
    }

    function createAssociacao(data) {
        return associacaoService.create(data)
            .then(() => {
                alertService.success('Associacao added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateAssociacao(id, data) {
        return associacaoService.update(id, data)
            .then(() => {
                alertService.success('Associacao updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            associacaoService.getById(id).then(associacao => {
                const fields = ['associacao', 'email', 'email_contato_associacao', 'nome_contato_associacao', 'id_artista', 'slug_artista'];
                fields.forEach(field => setValue(field, associacao[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Adicionar Associação' : 'Editar Associação'}</h1>
            <div className="form-row">
                <div className="form-group col5">
                    <label>Associação</label>
                    <select name="associacao" ref={register} className={`form-control ${errors.associacao ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="ABRAMUS">ABRAMUS</option>
                        <option value="AMAR">AMAR</option>
                        <option value="ASSIM">ASSIM</option>
                        <option value="UBC">UBC</option>
                        <option value="SBACEM">SBACEM</option>
                        <option value="SICAM">SICAM</option>
                        <option value="SOCINPRO">SOCINPRO</option>
                        <option value="UBEM">UBEM</option>
                    </select>
                    <div className="invalid-feedback">{errors.associacao?.message}</div>
                </div>
                <div className="form-group col-5">
                 
                        <label>Seu E-mail</label>
                        <input name="email" type="text" ref={register} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    
                </div>
                <div className="form-group col-5">
                    <label>E-mail de Contato na Associação</label>
                    <input name="email_contato_associacao" type="text" ref={register} className={`form-control ${errors.email_contato_associacao ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email_contato_associacao?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Nome de Contato na Associação</label>
                    <input name="nome_contato_associacao" type="text" ref={register} className={`form-control ${errors.nome_contato_associacao ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.nome_contato_associacao?.message}</div>
                </div>
                <div className="form-group col5">
                    <label>Artista</label>
                    <select name="slug_artista" ref={register} className={`form-control ${errors.slug_artista ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Mufazza">Mufazza</option>
                        <option value="Anitta">Anitta</option>
                        <option value="Marquiori">Marquiori</option>
                    </select>
                    <div className="invalid-feedback">{errors.associacao?.message}</div>
                </div>
            </div>
            
            
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };