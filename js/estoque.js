'use strict';

// Estoque da prévia, montado com os carros que aparecem no Instagram da loja.
// Na versão final estes dados vêm do painel em que a loja cadastra os carros.
// km e câmbio ficam null quando a informação não aparece na publicação.
window.ESTOQUE = Object.freeze([
  { id: 'corolla-xei-2022', marca: 'Toyota', modelo: 'Corolla', versao: 'XEi 2.0', ano: 2022, km: 61000, cambio: 'Automático', categoria: 'Sedã', foto: 'img/carros/corolla-2022.jpg', alt: 'Toyota Corolla XEi cinza na loja da Duarte' },
  { id: 'nivus-comfortline-2024', marca: 'Volkswagen', modelo: 'Nivus', versao: 'Comfortline', ano: 2024, km: null, cambio: 'Automático', categoria: 'SUV', foto: 'img/carros/nivus-2024.jpg', alt: 'Volkswagen Nivus branco em frente à loja' },
  { id: 'strada-volcano-2023', marca: 'Fiat', modelo: 'Strada', versao: 'Volcano CD AT', ano: 2023, km: null, cambio: 'Automático', categoria: 'Picape', foto: 'img/carros/strada-2023.jpg', alt: 'Fiat Strada Volcano branca em frente à loja' },
  { id: 'yaris-xls-2022', marca: 'Toyota', modelo: 'Yaris', versao: 'XLS 1.5', ano: 2022, km: null, cambio: 'Automático', categoria: 'Hatch', foto: 'img/carros/yaris-2022.jpg', alt: 'Toyota Yaris branco em frente à loja' },
  { id: 'kicks-sl-2019', marca: 'Nissan', modelo: 'Kicks', versao: 'SL', ano: 2019, km: null, cambio: 'Automático', categoria: 'SUV', foto: 'img/carros/kicks-2019.jpg', alt: 'Nissan Kicks cinza no pátio da loja' },
  { id: 'corolla-xei-2019', marca: 'Toyota', modelo: 'Corolla', versao: 'XEi 2.0', ano: 2019, km: null, cambio: 'Automático', categoria: 'Sedã', foto: 'img/carros/corolla-2019.jpg', alt: 'Toyota Corolla XEi grafite no pátio da loja' },
  { id: 'l200-triton-2014', marca: 'Mitsubishi', modelo: 'L200 Triton', versao: '4x4', ano: 2014, km: null, cambio: null, categoria: 'Picape', foto: 'img/carros/l200-2014.jpg', alt: 'Mitsubishi L200 Triton branca no showroom' },
]);
