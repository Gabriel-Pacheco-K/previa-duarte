'use strict';

// Estoque da prévia, montado com carros do site atual e do Instagram da loja.
// Na versão final estes dados vêm do painel em que a loja cadastra os carros.
// km, preço e câmbio ficam null quando a informação não aparece na publicação.
window.ESTOQUE = Object.freeze([
  { id: 'corolla-xei-2022', marca: 'Toyota', modelo: 'Corolla', versao: 'XEi Flex Aut.', ano: 2022, km: 52600, preco: 125900, cambio: 'Automático', categoria: 'Sedã', foto: 'img/carros/corolla-2022.jpg', alt: 'Toyota Corolla XEi prata no estúdio da Duarte' },
  { id: 'nivus-comfortline-2024', marca: 'Volkswagen', modelo: 'Nivus', versao: 'Comfortline', ano: 2024, km: null, preco: null, cambio: 'Automático', categoria: 'SUV', foto: 'img/carros/nivus-2024.jpg', alt: 'Volkswagen Nivus branco em frente à loja' },
  { id: 'strada-freedom-2024', marca: 'Fiat', modelo: 'Strada', versao: 'Freedom Flex', ano: 2024, km: 39895, preco: 89900, cambio: null, categoria: 'Picape', foto: 'img/carros/strada-freedom-2024.jpg', alt: 'Fiat Strada Freedom branca no estúdio da Duarte' },
  { id: 'strada-volcano-2023', marca: 'Fiat', modelo: 'Strada', versao: 'Volcano CD AT', ano: 2023, km: null, preco: null, cambio: 'Automático', categoria: 'Picape', foto: 'img/carros/strada-2023.jpg', alt: 'Fiat Strada Volcano branca em frente à loja' },
  { id: 'yaris-xls-2022', marca: 'Toyota', modelo: 'Yaris', versao: 'XLS 1.5', ano: 2022, km: null, preco: null, cambio: 'Automático', categoria: 'Hatch', foto: 'img/carros/yaris-2022.jpg', alt: 'Toyota Yaris branco em frente à loja' },
  { id: 'kicks-sl-2019', marca: 'Nissan', modelo: 'Kicks', versao: 'SL', ano: 2019, km: null, preco: null, cambio: 'Automático', categoria: 'SUV', foto: 'img/carros/kicks-2019.jpg', alt: 'Nissan Kicks cinza no pátio da loja' },
  { id: 'city-ex-2015', marca: 'Honda', modelo: 'City', versao: 'Sedan EX Flex', ano: 2015, km: 173189, preco: 65900, cambio: null, categoria: 'Sedã', foto: 'img/carros/city-2015.jpg', alt: 'Honda City prata no estúdio da Duarte' },
]);
