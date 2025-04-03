# Desafio Full Cycle - Docker

Este repositório contém dois projetos desenvolvidos como parte do desafio Full Cycle, utilizando Docker para conteinerização.

## Estrutura do Projeto

```
desafio-full-cycle-docker/
│── go-lang/                    # Aplicativo em Go
│   ├── Dockerfile              # Dockerfile para criar o container
│   ├── docker-compose.yaml     # Configuração do Docker Compose
│   ├── main.go                 # Código-fonte da aplicação Go
│   ├── README.md               # Documentação do projeto Go
│
│── nginx-with-nodejs-and-mysql/ # Aplicativo Node.js com MySQL e Nginx
│   ├── app/                     # Código-fonte do backend Node.js
│   ├── nginx/                   # Configuração do Nginx
│   ├── docker-compose.yaml      # Configuração do Docker Compose
│   ├── README.md                # Documentação do projeto Node.js
```

## Como Rodar os Projetos

### 1. Aplicativo em Go

Para rodar a aplicação Go, entre na pasta `go-lang/` e execute:

```sh
docker-compose up --build
```

### 2. Aplicativo Node.js + MySQL + Nginx

Entre na pasta `nginx-with-nodejs-and-mysql/` e execute:

```sh
docker-compose up --build
```

Depois de subir os containers, acesse:

- **Nginx:** [http://localhost:8080](http://localhost:8080)
- **Node.js (direto):** [http://localhost:3000](http://localhost:3000)

## Tecnologias Utilizadas

- **Docker & Docker Compose** - Para conteinerização e gerenciamento de serviços.
- **Go** - Para a aplicação de demonstração.
- **Node.js & Express** - Para a API backend.
- **MySQL** - Banco de dados relacional.
- **Nginx** - Servidor reverso para roteamento de requisições.

## Autor

Gustavo Farias - Desenvolvido como parte do desafio **Full Cycle** 🚀
