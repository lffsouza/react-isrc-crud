import { Associacao } from '.'

export function configureFakeBackendAssociacao() {
    // array in local storage for associacao records
    let associacoes = JSON.parse(localStorage.getItem('associacoes')) || [{ 
        id: 1,
        associacao: Associacao.UBC,
        email: 'victorhase@vhdev.com.br',
        email_contato_associacao: 'nataniel@ubc.com.br',
        nome_contato_associacao: 'Nataniel Ferreira da Silva',
        id_artista: '9999',
        slug_artista: 'rafinhadj'
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
                    case url.endsWith('/associacoes') && method === 'GET':
                        return getAssociacoes();
                    case url.match(/\/associacoes\/\d+$/) && method === 'GET':
                        return getAssociacaoById();
                    case url.endsWith('/associacoes') && method === 'POST':
                        return createAssociacao();
                    case url.match(/\/associacoes\/\d+$/) && method === 'PUT':
                        return updateAssociacao();
                    case url.match(/\/associacoes\/\d+$/) && method === 'DELETE':
                        return deleteAssociacao();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function getAssociacoes() {
                return ok(associacoes);
            }

            function getAssociacaoById() {
                let associacao = associacoes.find(x => x.id === idFromUrl());
                return ok(associacao);
            }
    
            function createAssociacao() {
                const associacao = body();



                // assign associacao id and a few other properties then save
                associacao.id = newAssociacaoId();
                associacao.dateCreated = new Date().toISOString();
                associacoes.push(associacao);
                localStorage.setItem('associacoes', JSON.stringify(associacoes));

                return ok();
            }
    
            function updateAssociacao() {
                let params = body();
                let associacao = associacoes.find(x => x.id === idFromUrl());

                // update and save associacao
                Object.assign(associacao, params);
                localStorage.setItem('associacoes', JSON.stringify(associacoes));

                return ok();
            }
    
            function deleteAssociacao() {
                associacoes = associacoes.filter(x => x.id !== idFromUrl());
                localStorage.setItem('associacoes', JSON.stringify(associacoes));

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

            function newAssociacaoId() {
                return associacoes.length ? Math.max(...associacoes.map(x => x.id)) + 1 : 1;
            }
        });
    }
};