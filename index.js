const axios = require('axios');

async function coordenadas_cidades(cidade) {
    try {
        const resposta = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=5&appid=8e37c79f91ccad089539b15d6f8ab4e6`);
        const coordenadas = resposta.data[0];
        return coordenadas;
    } catch (erro) {
        console.error('Não foi possível obter as coordernadas: ', erro.message);
    }
}

async function obter_condicoes(latitude, longitude) {
    try {
        const resposta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8e37c79f91ccad089539b15d6f8ab4e6`);

        const {main, weather} = resposta.data;
        const {feels_like} = main;
        const descricao = weather[0].description;

        console.log('Sensação Térmica: ', feels_like);
        console.log('Descrição: ', descricao);
    } catch (erro) {
        console.log('Não foi possível obter as condições atuais: ', erro.message);
    }
}

const cidade_cons = 'London';

async function consulta() {
    const coordenadas = await coordenadas_cidades(cidade_cons);

    if (coordenadas) {
        console.log('Coordenadas: ', coordenadas.lat, coordenadas.lon);
        await obter_condicoes(coordenadas.lat, coordenadas.lon);
    }
}

consulta();