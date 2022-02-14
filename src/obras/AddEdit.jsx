import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { obraService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        titulo: Yup.string()
            .required('Titulo is required'),
        genero: Yup.string()
            .required('Genero is required'),
        idioma: Yup.string()
            .required('Idioma is required'),
        tipo_producao_musical: Yup.string()
            .required('Tipo de produção musical is required'),
        obra_original: Yup.string()
            .required('Obra original is required'),
        obra_derivada: Yup.string()
            .required('Obra derivada is required'),
        nome_titular: Yup.string()
            .required('Nome do titular is required'),
        pseudonimo_titular: Yup.string()
            .required('Pseudonimo do titular is required'),
        cpf_titular: Yup.string()
            .required('CPF do titular is required'),
        funcao_titular: Yup.string()
            .required('Função do titular is required'),
        pct_titular: Yup.string()
            .required('PCT is required'),
        data_inicial_contrato_titular: Yup.string()
            .required('Data incial do contrato do titular is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createObra(data)
            : updateObra(id, data);
    }

    function createObra(data) {
        return obraService.create(data)
            .then(() => {
                alertService.success('Obra added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateObra(id, data) {
        return obraService.update(id, data)
            .then(() => {
                alertService.success('Obra updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get obra and set form fields
            obraService.getById(id).then(obra => {
                const fields = ['titulo', 'genero', 'idioma', 'tipo_producao_musical', 'obra_original', 'obra_derivada','nome_titular', 'pseudonimo_titular', 'cpf_titular', 'funcao_titular', 'pct_titular', 'data_inicial_contrato_titular', 'outros_titulos', 'titulo_alternativo'];
                fields.forEach(field => setValue(field, obra[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Obra' : 'Edit Obra'}</h1>
            <div className="form-row">

            <div className="form-group col-5">
                    <label>Título</label>
                    <input name="titulo" type="text" ref={register} className={`form-control ${errors.titulo ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.titulo?.message}</div>
                </div>
                
                <div className="form-group col-5">
                    <label>Genero</label>
                    <input name="genero" type="text" ref={register} className={`form-control ${errors.genero ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.genero?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Idioma</label>
                    <input name="idioma" type="text" ref={register} className={`form-control ${errors.idioma ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.idioma?.message}</div>
                </div>
            </div>
            <div className="form-row">
                
                <div className="form-group col-5">
                    <label>Tipo de produção musical</label>
                    <input name="tipo_producao_musical" type="text" ref={register} className={`form-control ${errors.tipo_producao_musical ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.tipo_producao_musical?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Obra original</label>
                    <input name="obra_original" type="text" ref={register} className={`form-control ${errors.obra_original ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.obra_original?.message}</div>
                </div>
            </div>
            <div className="form-row">
                
                <div className="form-group col-5">
                    <label>Obra derivada</label>
                    <input name="obra_derivada" type="text" ref={register} className={`form-control ${errors.obra_derivada ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.obra_derivada?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Nome do titular</label>
                    <input name="nome_titular" type="text" ref={register} className={`form-control ${errors.nome_titular ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.nome_titular?.message}</div>
                </div>
            </div>
            <div className="form-row">
                
                
                <div className="form-group col-5">
                    <label>Pseudônimo do titular</label>
                    <input name="pseudonimo_titular" type="text" ref={register} className={`form-control ${errors.pseudonimo_titular ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.pseudonimo_titular?.message}</div>
                </div>
            </div>
            <div className="form-row">
                
                <div className="form-group col-5">
                    <label>CPF do titular</label>
                    <input name="cpf_titular" type="text" ref={register} className={`form-control ${errors.cpf_titular ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.cpf_titular?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Função do titular</label>
                    <input name="funcao_titular" type="text" ref={register} className={`form-control ${errors.funcao_titular ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.funcao_titular?.message}</div>
                </div>
            </div>
            <div className="form-row">
                
                <div className="form-group col-5">
                    <label>PCT do titular</label>
                    <input name="pct_titular" type="text" ref={register} className={`form-control ${errors.pct_titular ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.pct_titular?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Data inicial do contrato do titular</label>
                    <input name="data_inicial_contrato_titular" type="text" ref={register} className={`form-control ${errors.data_inicial_contrato_titular ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.data_inicial_contrato_titular?.message}</div>
                </div>
            </div>
            <div className="form-row">
                
                <div className="form-group col-5">
                    <label>Outros títulos da obra</label>
                    <input name="outros_titulos" type="text" ref={register} className={`form-control ${errors.outros_titulos ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.outros_titulos?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Título alternativo da obra</label>
                    <input name="titulo_alternativo" type="text" ref={register} className={`form-control ${errors.titulo_alternativo ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.titulo_alternativo?.message}</div>
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