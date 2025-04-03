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
  while (retries) {
    try {
      const connection = await mysql.createConnection(dbConfig);
      await connection.execute("SELECT 1");
      await connection.end();
      console.log("Conexão com MySQL estabelecida!");
      return;
    } catch (err) {
      console.log("Aguardando MySQL...", err.code);
      retries -= 1;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  throw new Error("Não foi possível conectar ao MySQL após várias tentativas");
}

async function initializeDatabase() {
  const connection = await mysql.createConnection(dbConfig);
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `);
  await connection.end();
  console.log("Tabela people criada ou já existente");
}

app.get("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const randomName = `User${Math.floor(Math.random() * 1000)}`;
    await connection.execute("INSERT INTO people (name) VALUES (?)", [
      randomName,
    ]);
    console.log(`Nome ${randomName} inserido`);
    const [rows] = await connection.execute("SELECT name FROM people");
    let html = "<h1>Full Cycle Rocks!</h1><ul>";
    rows.forEach((row) => {
      html += `<li>${row.name}</li>`;
    });
    html += "</ul>";
    await connection.end();
    res.send(html);
  } catch (error) {
    console.error("Erro na rota /:", error);
    res.status(500).send("Erro no servidor");
  }
});

async function startServer() {
  await waitForDatabase();
  await initializeDatabase();
  app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
  });
}

startServer();
