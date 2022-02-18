import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { alertService, fonogramaService } from '@/_services';
import { Genero } from '../_helpers/genero';



function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        nome_obra: Yup.string()
            .required('Titulo is required'),
        titulo_faixa: Yup.string()
            .required('Genero is required'),
        track_time: Yup.string()
            .required('Tracktime is required'),
        genero: Yup.string()
            .required('Tipo de produção musical is required'),
        produtor_fonografico: Yup.string()
            .required('Obra original is required'),
        nome_interprete: Yup.string()
            .required('Obra original is required'),
        nome_completo: Yup.string()
            .required('Obra derivada is required'),
        pseudonimo: Yup.string()
            .required('Nome do titular is required'),
        cpf: Yup.string()
            .required('CPF do titular is required'),
        funcao: Yup.string()
            .required('CPF do titular is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        
    
    });

       // functions to build form returned by useForm() hook
       const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });
    

    function onSubmit(data) {
        return isAddMode
            ? createFonograma(data)
            : updateFonograma(id, data);
    }

    function createFonograma(data) {
        return fonogramaService.create(data)
            .then(() => {
                alertService.success('Fonograma added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateFonograma(id, data) {
        return fonogramaService.update(id, data)
            .then(() => {
                alertService.success('Fonograma updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            fonogramaService.getById(id).then(fonograma => {
                const fields = ['nome_obra', 'titulo_faixa', 'track_time', 'genero', 'produtor_fonografico', 'nome_interprete', 'nome_completo','pseudonimo', 'cpf', 'funcao', 'email'];
                fields.forEach(field => setValue(field, fonograma[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add User' : 'Fonogramas'}</h1>
            <div className="form-row">
                <div className="form-group col">
                    <label>Obra ID</label>
                    <select name="title" ref={register} className={`form-control ${errors.title ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                    </select>
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>

                <div className="form-group col-5">
                    <label>Nome da Obra</label>
                    <input name="nome_obra" type="text" ref={register} className={`form-control ${errors.nome_obra ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.nome_obra?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Título Faixa</label>
                    <input name="titulo_faixa" type="text" ref={register} className={`form-control ${errors.titulo_faixa ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.titulo_faixa?.message}</div>
                </div>
                <div className="form-group col-2">
                    <label>Track Time</label>
                    <input name="track_time" type="text" ref={register} className={`form-control ${errors.track_time ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.track_time?.message}</div>
                </div>
                <div className="form-group col-2">
                    <label>Gênero</label>
                    <select name="genero" ref={register} className={`form-control ${errors.genero ? 'is-invalid' : ''}`}>
                    <option value="Mr">'Rock'</option>
                    </select>
                </div>

                <div className="form-group col-5">
                    <label>Produtor Fonográfico</label>
                    <input name="produtor_fonografico" type="text" ref={register} className={`form-control ${errors.produtor_fonografico ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.produtor_fonografico?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Intérprete</label>
                    <input name="nome_interprete" type="text" ref={register} className={`form-control ${errors.nome_interprete ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.nome_interprete?.message}</div>
                </div>

                </div><div className="form-group col-4">
                     <label>Selecionar Obra</label>
                        <input name="lastName" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>

                        </div><div className="form-group col-4">
                      <label>Titulo da Faixa</label>
                        <input name="lastName" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div> 

                        </div><div className="form-group col-2">
                    <label>Minutagem da Faixa</label>
                        <input name="lastName" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>  

                        </div><div className="form-group col-3">
                    <label>Genero da Faixa</label>
                        <input name="lastName" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div> 

                        </div><div className="form-group col-5">
                    <label>Produtor Fonogáfico</label>
                        <input name="lastName" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div> 

                        </div><div className="form-group col-3">
                    <label>Interpretes</label>
                        <input name="lastName" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                       
                        <label className='form-label'>Upload Letra ou Partitura</label>
                            <input type ='file' accepet ='application/pdf' />

                <div className="form-group col-5">
                    <label>Função</label>
                    <select name="funcao" ref={register} className={`form-control ${errors.funcao ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Mr">Intérpete</option>
                        <option value="Mrs">Músico Acompanhante</option>
                    </select>
                    <div className="invalid-feedback">{errors.funcao?.message}</div>
                </div>
                
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Email</label>
                    <input name="email" type="text" ref={register} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
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