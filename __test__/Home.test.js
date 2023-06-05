import { render } from "@testing-library/react-native";
import { Detalhes } from "../src/pages/detalhes/Detalhes";
import { Favoritos } from "../src/pages/detalhes/Favoritos";
import { Historico } from "../src/pages/detalhesHistorico";
import { Home } from "../src/pages/detalhesHome";
import saveData from "../pages/Home";
import api from '../services/api';

describe('Home', () => {
  it('O componente Home deve renderizar', () => {
    render(<Home />);
  });
});

describe('Historico', () => {
  it('O componente Historico deve renderizar', () => {
    render(<Historico />);
  });
});

describe('Detalhes', () => {
  it('O componente Detalhes deve renderizar', () => {
    render(<Detalhes />);
  });
});

describe('Favoritos', () => {
  it('O componente Favoritos deve renderizar', () => {
    render(<Favoritos />);
  });
});

describe('Retorno api', () => {
  it('Quando a api tem retorno 200 salva no banco', () => {
    const spyOn = jest.spyOn(api, 'get');
    spyOn.saveData({
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

    expect(spyOn).toBeCalledTimes(1);
  });
});

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => {
      return {
        navigate: jest.fn(),
      };
    }
  };
});