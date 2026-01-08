import path from "node:path";
import express from "express";

const args = process.argv.slice(2);
const isMbcp = args.includes("--mbcp");

const app = express();
const PORT = 3000;

// Servir arquivos estáticos da pasta 'dist'
app.use("/cdn", express.static(path.join(__dirname, "../dist")));

// Rota principal para servir o arquivo HTML
app.get("/", (req, res) => {
  if (isMbcp) {
    res.sendFile(path.join(__dirname, "../public/index.mbcp.html"));
    return;
  }

  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor de produção rodando em http://localhost:${PORT}`);
});
