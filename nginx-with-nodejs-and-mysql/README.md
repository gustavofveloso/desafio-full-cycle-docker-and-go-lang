# Desafio Full Cycle: Nginx com Node.js e MySQL

Este projeto implementa um sistema simples onde o Nginx atua como proxy reverso para uma aplicação Node.js, que por sua vez interage com um banco de dados MySQL. O objetivo é que, ao acessar o Nginx na porta 8080, um nome aleatório seja inserido no banco de dados e uma lista de nomes seja retornada no formato HTML.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

## Como Executar

1. **Clone o repositório**:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd nginx-with-nodejs-and-mysql
   ```

2. **Inicie os serviços**:

   ```bash
   docker-compose up -d --build
   ```

3. **Acesse a aplicação**:

   ```bash
   http://localhost:8080
   ```
