'use strict';

(() => {
  const WHATS = '5548998059428';
  const whatsLink = (texto) => `https://wa.me/${WHATS}?text=${encodeURIComponent(texto)}`;

  document.querySelectorAll('[data-whats]').forEach((a) => {
    a.href = whatsLink(a.dataset.whats);
  });

  const estoque = Array.isArray(window.ESTOQUE) ? window.ESTOQUE : [];
  const kmFormat = new Intl.NumberFormat('pt-BR');
  const precoFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  const textoPreco = (c) => (Number.isFinite(c.preco) ? precoFormat.format(c.preco) : 'Consulte o preço');

  const nomeCompleto = (c) => `${c.marca} ${c.modelo} ${c.versao} ${c.ano}`;
  const textoKm = (c) => (Number.isFinite(c.km) ? `${kmFormat.format(c.km)} km` : 'km sob consulta');
  const mensagemInteresse = (c) => `Olá! Vi no site o ${nomeCompleto(c)} e tenho interesse. Ainda está disponível?`;

  // Tudo é montado com createElement/textContent: nenhum dado vira HTML,
  // então um texto malicioso no estoque nunca é executado como código.
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const svgIcon = (id, size) => {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(ns, 'use');
    use.setAttribute('href', `#${id}`);
    svg.append(use);
    return svg;
  };

  const spec = (icon, text) => {
    const li = el('li');
    li.append(svgIcon(icon, 16), el('span', '', text));
    return li;
  };

  // ─── Filtros ────────────────────────────────────────────────
  const busca = document.getElementById('f-busca');
  const marca = document.getElementById('f-marca');
  const categoria = document.getElementById('f-categoria');
  const ordem = document.getElementById('f-ordem');

  const preencherOpcoes = (select, valores) => {
    [...new Set(valores)].sort((a, b) => a.localeCompare(b, 'pt-BR')).forEach((v) => {
      const opt = el('option', '', v);
      opt.value = v;
      select.append(opt);
    });
  };
  preencherOpcoes(marca, estoque.map((c) => c.marca));
  preencherOpcoes(categoria, estoque.map((c) => c.categoria));

  // Busca ignora acentos e maiúsculas: "COROLLA", "volks" e "sedã"/"seda" funcionam
  const normalizar = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

  const ordenadores = {
    novos: (a, b) => b.ano - a.ano,
    antigos: (a, b) => a.ano - b.ano,
    nome: (a, b) => nomeCompleto(a).localeCompare(nomeCompleto(b), 'pt-BR'),
  };

  // ─── Lista ──────────────────────────────────────────────────
  const lista = document.getElementById('cars');
  const vazio = document.getElementById('empty');
  const contador = document.getElementById('count');

  const card = (c) => {
    const li = el('li', 'car');

    const abrir = el('button', 'car-open');
    abrir.type = 'button';
    abrir.setAttribute('aria-label', `Ver detalhes do ${nomeCompleto(c)}`);
    abrir.addEventListener('click', () => abrirDetalhes(c));

    const foto = el('img');
    foto.src = c.foto;
    foto.alt = c.alt;
    foto.width = 640;
    foto.height = 480;
    foto.loading = 'lazy';
    foto.decoding = 'async';

    const tag = el('span', 'car-tag', c.categoria);
    abrir.append(foto, tag);

    const corpo = el('div', 'car-body');
    corpo.append(el('p', 'car-brand', c.marca), el('h3', '', `${c.modelo} ${c.versao}`));

    const specs = el('ul', 'specs');
    specs.append(spec('i-calendar', String(c.ano)), spec('i-gauge', textoKm(c)));
    corpo.append(specs, el('p', Number.isFinite(c.preco) ? 'car-price' : 'car-price car-price-ask', textoPreco(c)));

    const acoes = el('div', 'car-actions');
    const detalhes = el('button', 'link-btn', 'Ver detalhes');
    detalhes.type = 'button';
    detalhes.addEventListener('click', () => abrirDetalhes(c));

    const interesse = el('a', 'btn btn-whats btn-small');
    interesse.href = whatsLink(mensagemInteresse(c));
    interesse.target = '_blank';
    interesse.rel = 'noopener noreferrer';
    interesse.append(svgIcon('i-whats', 18), el('span', '', 'Tenho interesse'));

    acoes.append(interesse, detalhes);
    corpo.append(acoes);
    li.append(abrir, corpo);
    return li;
  };

  const cardContato = () => {
    const li = el('li', 'car car-cta');
    li.append(el('h3', '', 'Procurando outro modelo?'), el('p', '', 'Conte pra gente qual carro você quer e a nossa equipe te ajuda a encontrar.'));
    const link = el('a', 'btn btn-light');
    link.href = whatsLink('Olá! Estou procurando um carro que não vi no site. Vocês podem me ajudar?');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.append(svgIcon('i-whats', 20), el('span', '', 'Falar com a equipe'));
    li.append(link);
    return li;
  };

  const render = () => {
    const termo = normalizar(busca.value);
    const resultado = estoque
      .filter((c) => !marca.value || c.marca === marca.value)
      .filter((c) => !categoria.value || c.categoria === categoria.value)
      .filter((c) => !termo || normalizar(`${nomeCompleto(c)} ${c.categoria}`).includes(termo))
      .sort(ordenadores[ordem.value] || ordenadores.novos);

    const itens = resultado.map(card);
    // O último quadro do estoque convida a falar com a equipe sobre outros modelos
    if (resultado.length) itens.push(cardContato());
    lista.replaceChildren(...itens);
    vazio.hidden = resultado.length > 0;
    contador.textContent = resultado.length === 1 ? '1 veículo' : `${resultado.length} veículos`;
  };

  [busca, marca, categoria, ordem].forEach((campo) => campo.addEventListener('input', render));
  render();

  // ─── Detalhes ───────────────────────────────────────────────
  const dialog = document.getElementById('car-dialog');
  const dlgFoto = document.getElementById('dlg-foto');
  const dlgMarca = document.getElementById('dlg-marca');
  const dlgTitulo = document.getElementById('dlg-titulo');
  const dlgSpecs = document.getElementById('dlg-specs');
  const dlgWhats = document.getElementById('dlg-whats');
  const dlgPreco = document.getElementById('dlg-preco');

  function abrirDetalhes(c) {
    dlgFoto.src = c.foto;
    dlgFoto.alt = c.alt;
    dlgMarca.textContent = c.marca;
    dlgTitulo.textContent = `${c.modelo} ${c.versao}`;
    dlgSpecs.replaceChildren(
      spec('i-calendar', `Ano ${c.ano}`),
      spec('i-gauge', textoKm(c)),
      spec('i-shield', c.cambio ? `Câmbio ${c.cambio.toLowerCase()}` : 'Câmbio sob consulta'),
      spec('i-doc', c.categoria),
    );
    dlgPreco.textContent = Number.isFinite(c.preco) ? `${textoPreco(c)} · consulte as condições de pagamento` : 'Consulte o preço e as condições de pagamento';
    dlgWhats.href = whatsLink(mensagemInteresse(c));
    dialog.showModal();
  }

  document.getElementById('dlg-close').addEventListener('click', () => dialog.close());
  // Toque fora do quadro também fecha
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
})();
