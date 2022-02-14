import { Genero } from '.'
import { Lang } from '.'

export function configureFakeBackendObra() {
    // array in local storage for obra records
    let obras = JSON.parse(localStorage.getItem('obras')) || [{ 
        id: 1,
        titulo: 'Preto & Branco',
        genero: Genero.alt,
        idioma: '',
        tipo_producao_musical: 'Instrumenta, Instrumental + Texto',
        obra_original: 'obra originalObra Original, Obra Modificada',
        obra_derivada: 'opções: Sample, Medley, Pot-pourrit',
        nome_titular: "artista logado no sistema. ex: Victor Hase",
        pseudonimo_titular: "Bit Hase",
        cpf_titular: "999.999.999-31",
        funcao_titular: "Autor/compositor, adaptor (confirmar), versionista",
        pct_titular: "Confirmar",
        data_inicial_contrato_titular: "2022-01-02 YYYY-mm-dd",
        outros_titulos: "Titulo da obra que se baseou",
        titulo_alternativo: "Outros nomes para a obra"
    }];

    // monkey patch fetch to setup fake backend
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                const { method } = opts;
                switch (true) {
                    case url.endsWith('/obras') && method === 'GET':
                        return getObras();
                    case url.match(/\/obras\/\d+$/) && method === 'GET':
                        return getObraById();
                    case url.endsWith('/obras') && method === 'POST':
                        return createObra();
                    case url.match(/\/obras\/\d+$/) && method === 'PUT':
                        return updateObra();
                    case url.match(/\/obras\/\d+$/) && method === 'DELETE':
                        return deleteObra();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function getObras() {
                return ok(obras);
            }

            function getObraById() {
                let obra = obras.find(x => x.id === idFromUrl());
                return ok(obra);
            }
    
            function createObra() {
                const obra = body();



                // assign obra id and a few other properties then save
                obra.id = newObraId();
                obra.dateCreated = new Date().toISOString();
                obras.push(obra);
                localStorage.setItem('obras', JSON.stringify(obras));

                return ok();
            }
    
            function updateObra() {
                let params = body();
                let obra = obras.find(x => x.id === idFromUrl());

                // update and save obra
                Object.assign(obra, params);
                localStorage.setItem('obras', JSON.stringify(obras));

                return ok();
            }
    
            function deleteObra() {
                obras = obras.filter(x => x.id !== idFromUrl());
                localStorage.setItem('obras', JSON.stringify(obras));

                return ok();
            }



            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function body() {
                return opts.body && JSON.parse(opts.body);    
            }

            function newObraId() {
                return obras.length ? Math.max(...obras.map(x => x.id)) + 1 : 1;
            }
        });
    }
};