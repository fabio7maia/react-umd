import path from "node:path";
import express from "express";

const app = express();
const PORT = 3000;

// Servir arquivos estáticos da pasta 'dist'
app.use("/cdn", express.static(path.join(__dirname, "../dist")));

// Rota principal para servir o arquivo HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.dev.html"));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(
    `Servidor de desenvolvimento rodando em http://localhost:${PORT}`
  );
});
