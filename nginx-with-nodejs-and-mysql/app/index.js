const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

const dbConfig = {
  host: "db",
  user: "root",
  password: "root",
  database: "fullcycle",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

async function waitForDatabase() {
  let retries = 10;
  while (retries > 0) {
    try {
      const connection = await mysql.createConnection(dbConfig);
      await connection.execute("SELECT 1");
      console.log("Conexão com MySQL estabelecida!");
      await connection.end();
      return;
    } catch (err) {
      retries -= 1;
      console.log(
        `Aguardando MySQL... Tentativas restantes: ${retries}, Erro: ${err.code}`
      );
      if (retries === 0) {
        throw new Error(
          "Não foi possível conectar ao MySQL após várias tentativas"
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

async function initializeDatabase() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);
    console.log("Tabela 'people' criada ou já existente");
  } catch (err) {
    console.error("Erro ao criar a tabela:", err.message);
    throw err;
  } finally {
    await connection.end();
  }
}

const requestIds = new Set();
app.use((req, res, next) => {
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  req.requestId = requestId;
  console.log(
    `[${new Date().toISOString()}] Requisição recebida: ${req.method} ${
      req.url
    } (ID: ${requestId})`
  );
  next();
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", async (req, res) => {
  let connection;
  try {
    if (requestIds.has(req.requestId)) {
      console.log(
        `[${new Date().toISOString()}] Requisição duplicada ignorada (ID: ${
          req.requestId
        })`
      );
      const [rows] = await connection.execute("SELECT name FROM people");
      let html = "<h1>Full Cycle Rocks!</h1><ul>";
      rows.forEach((row) => {
        html += `<li>${row.name}</li>`;
      });
      html += "</ul>";
      res.send(html);
      return;
    }

    connection = await mysql.createConnection(dbConfig);
    const randomName = `User${Math.floor(Math.random() * 1000)}`;
    await connection.execute("INSERT INTO people (name) VALUES (?)", [
      randomName,
    ]);
    console.log(
      `[${new Date().toISOString()}] Nome '${randomName}' inserido com sucesso (ID: ${
        req.requestId
      })`
    );

    const [rows] = await connection.execute("SELECT name FROM people");
    let html = "<h1>Full Cycle Rocks!</h1><ul>";
    rows.forEach((row) => {
      html += `<li>${row.name}</li>`;
    });
    html += "</ul>";
    requestIds.add(req.requestId);
    res.set("Cache-Control", "no-store");
    res.send(html);

    setTimeout(() => requestIds.delete(req.requestId), 5000);
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Erro na rota / (ID: ${req.requestId}):`,
      error.message
    );
    res.status(500).send("Erro no servidor");
  } finally {
    if (connection) await connection.end();
  }
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

async function startServer() {
  try {
    await waitForDatabase();
    await initializeDatabase();
    app.listen(port, () => {
      console.log(`App rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error.message);
    process.exit(1);
  }
}

startServer();
