export { Genero } from './genero'

export function configureFakeBackendFonogramas() {
    // array in local storage for fonograma records
    let fonogramas = JSON.parse(localStorage.getItem('fonogramas')) || [{ 
        id: 1,
        nome_obra: 'Preto & Branco',
        titulo_faixa: 'Preto & Branco',
        track_time: 'Tempo da faixa',
        genero: 'Genero.blues_classical',
        produtor_fonografico: 'Luiz Fernando Faria',
        nome_interprete: 'Acrescenta intérprtete',
        nome_completo: 'Nome do Intérprete',
        pseudonimo: 'Pseudoônimo',
        cpf: '111.111.111-08',
        funcao: 'Intérprete ou músico acompanhante',
        email: 'victor@teste.com',       
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
                    case url.endsWith('/fonogramas') && method === 'GET':
                        return getFonogramas();
                    case url.match(/\/fonogramas\/\d+$/) && method === 'GET':
                        return getFonogramaById();
                    case url.endsWith('/fonogramas') && method === 'POST':
                        return createFonograma();
                    case url.match(/\/fonogramas\/\d+$/) && method === 'PUT':
                        return updateFonograma();
                    case url.match(/\/fonogramas\/\d+$/) && method === 'DELETE':
                        return deleteFonograma();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function getFonogramas() {
                return ok(fonogramas);
            }

            function getFonogramaById() {
                let fonograma = fonogramas.find(x => x.id === idFromUrl());
                return ok(fonograma);
            }
    
            function createFonograma() {
                const fonograma = body();

                
                // assign fonograma id and a few other properties then save
                fonograma.id = newFonogramaId();
                fonograma.dateCreated = new Date().toISOString();
                fonogramas.push(fonograma);
                localStorage.setItem('fonogramas', JSON.stringify(fonogramas));

                return ok();
            }
    
            function updateFonograma() {
                let params = body();
                let fonograma = fonogramas.find(x => x.id === idFromUrl());
                
                // update and save fonograma
                Object.assign(fonograma, params);
                localStorage.setItem('fonogramas', JSON.stringify(fonogramas));

                return ok();
            }
    
            function deleteFonograma() {
                fonogramas = fonogramas.filter(x => x.id !== idFromUrl());
                localStorage.setItem('fonogramas', JSON.stringify(fonogramas));

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

            function newFonogramaId() {
                return fonogramas.length ? Math.max(...fonogramas.map(x => x.id)) + 1 : 1;
            }
        });
    }
};