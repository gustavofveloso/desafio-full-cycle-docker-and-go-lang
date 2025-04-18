# Desafio Full Cycle - Imagem Docker com Go

Este projeto cria uma imagem Docker leve (< 2MB) usando Go que imprime "FullCycle Rocks!" no terminal ao ser executada.

## Estrutura do Projeto

- `main.go`: Código Go que imprime a mensagem.
- `Dockerfile`: Configuração para construir a imagem otimizada.
- `docker-compose.yaml`: Configuração para rodar o container com Docker Compose.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado.
- [Docker Compose](https://docs.docker.com/compose/install/) instalado (opcional).
- [Git](https://git-scm.com/downloads) instalado (opcional, para versionamento).

## Como Construir e Rodar

### Usando Docker

1. Clone o repositório (se aplicável):
   ```bash
   git clone https://github.com/gustavofveloso/desafio-full-cycle-docker-and-go-lang.git
   cd go-lang
   ```
2. Construa a imagem:
   ```bash
   docker build -t gustavofveloso/desafio-um-full-cycle-go .
   ```
3. Rode o container:
   ```bash
   docker run gustavofveloso/desafio-um-full-cycle-go
   ```

### Alternativa: Usando Docker Hub

1. Rode o container:
   ```bash
   docker run gustavofveloso/desafio-um-full-cycle-go:latest
   ```

### Saída Esperada

    FullCycle Rocks!

### Para Verificar o Tamanho da Imagem

    docker images gustavofveloso/desafio-um-full-cycle-go

Tamanho esperado: 1.73MB

Link do Docker Hub: https://hub.docker.com/repository/docker/gustavofveloso/desafio-um-full-cycle-go/general
