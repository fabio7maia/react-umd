# react-umd

Builds UMD bundles for React and ReactDOM, facilitando o uso em ambientes que não suportam módulos ES, como integrações legadas ou carregamento via CDN.

## Estrutura do Projeto

```
/
├── public/
│   ├── index.html
│   ├── index.dev.html
│   └── index.mbcp.html
├── scripts/
│   ├── build-umd.mjs
│   ├── dev.ts
│   └── serve.ts
├── src/
│   ├── react.entry.js
│   └── react-dom.entry.js
├── package.json
├── pnpm-lock.yaml
├── LICENSE
└── README.md
```

## Scripts

- `scripts/build-umd.mjs`: Gera os bundles UMD de React e ReactDOM.
- `scripts/dev.ts`: Ambiente de desenvolvimento.
- `scripts/serve.ts`: Servidor local para testes.

## Como usar

1. Instale as dependências:
   ```sh
   pnpm install
   ```
2. Para gerar os bundles UMD:

   ```sh
   pnpm run build
   ```

   _(Certifique-se de que o script `build` está configurado no `package.json` para rodar `node scripts/build-umd.mjs`)_

3. Os arquivos gerados podem ser servidos via CDN ou incluídos diretamente em páginas HTML.

## Exemplos de uso

Veja os arquivos em `public/` para exemplos de inclusão dos bundles UMD em HTML.

```html
<script src="react.umd.js"></script>
<script src="react-dom.umd.js"></script>
<script>
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement("h1", null, "Hello, React UMD!"));
</script>
```

## Licença

Distribuído sob a licença [LICENSE](LICENSE).

---

> Projeto para facilitar o uso de React em ambientes sem suporte a módulos modernos.
