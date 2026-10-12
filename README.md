# Duarte Multimarcas: prévia do site

Prévia de site para a Duarte Multimarcas (Meleiro/SC), com estoque filtrável, página de detalhes de cada carro e contato pelo WhatsApp já dizendo qual carro interessa.

Site estático em HTML, CSS e JavaScript puro, publicado no GitHub Pages por GitHub Actions.

## Segurança

- **Content Security Policy** restritiva: só roda o JavaScript do próprio site, sem scripts inline nem de terceiros, e bloqueia plugins, envio de formulários e troca da URL base.
- **Nada vira HTML:** o estoque é montado com `createElement` e `textContent`, então um texto malicioso nos dados é exibido como texto e nunca executado.
- **Links externos isolados** com `rel="noopener noreferrer"`, e o mapa embutido roda em `iframe` com `sandbox`.
- **Sem dados pessoais:** não há formulários, cookies nem rastreadores; o contato acontece direto no WhatsApp.
- **Fora dos buscadores** (`noindex`) enquanto for prévia.

## Próximos passos

- Painel para a loja cadastrar e tirar carros do estoque (API em Java com Spring Boot, login protegido e validação de tudo o que é enviado).
- Fotos originais, preço, quilometragem e opcionais de cada veículo.

---

Desenvolvido por [Gabriel Pacheco Kiesel](https://gabriel-pacheco-k.github.io).
