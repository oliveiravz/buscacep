import saveData from '/Users/Pedro/OneDrive/Documentos/Trabalhos da faculdade/Mobile Systems/BuscaCep/buscacep/src/pages/home/index';

describe("saveData", ()=>{

    describe("saveData", ()=> {

        It("deve salvar as informações do CEP ", ()=> {
            const resultado = saveData({
                "cep": "01001-000",
                "logradouro": "Praça da Sé",
                "complemento": "lado ímpar",
                "bairro": "Sé",
                "localidade": "São Paulo",
                "uf": "SP",
                "ibge": "3550308",
                "gia": "1004",
                "ddd": "11",
                "siafi": "7107"
              });
            console.log(resultado)
        });

    })
});