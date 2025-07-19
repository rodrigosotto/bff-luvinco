# 🧠 BFF Desafio LuvinCo

API **Backend For Frontend (BFF)** em **Node.js + TypeScript** que faz a ponte entre o frontend da loja Luvinco e serviços externos/internos, centralizando regras de negócio e simplificando o consumo de dados pelo cliente web.

---

## 📌 Visão Geral

- 🌐 API REST baseada em **Express**
- ⚙️ Projetada em **TypeScript**
- 📁 Arquitetura modular (Routes → Controllers → Services)
- 🐳 Containerizada com **Docker** / **Docker Compose**
- 🔁 Pronta para escalar e estender

---

## 🔧 Tecnologias

| Categoria | Ferramenta                         |
| --------- | ---------------------------------- |
| Runtime   | **Node.js LTS**                    |
| Framework | **Express**                        |
| Linguagem | **TypeScript**                     |
| Config    | **dotenv** (variáveis de ambiente) |
| Deploy    | **Docker** / **Docker Compose**    |

---

## 📂 Estrutura de Pastas

```text
src/
├── app.ts            # Instância principal do Express
├── routes/           # Definição de endpoints
├── controllers/      # Lógica de entrada HTTP
├── services/         # Regras de negócio
├── types/            # Tipagens/Interfaces TS
└── utils/            # Funções auxiliares

🚀 Instalação e Uso
1 — Clonar o repositório

git clone https://github.com/rodrigosotto/bff-luvinco.git
cd bff-luvinco

2 — Instalar dependências

npm install

3 — Configurar variáveis de ambiente

Crie o arquivo .env a partir do template .env.example
(Dados de conexão com banco local e API externa para fins de testes)

✅ Para subir os containers com Docker Compose, você precisa ter o Docker instalado:

    Instalar no Windows

    Instalar no Linux (Ubuntu)

🐳 Se você estiver usando Linux:
4 — Dar permissão de execução ao script:

chmod +x start.sh

5 — Subir os containers com Docker Compose:

docker-compose up --build

Containers conectados
🐳 Se você estiver usando Windows:

(Siga os mesmos passos acima usando o PowerShell ou CMD com Docker Desktop rodando)
6 — Registrar um usuário (via Postman ou Insomnia)

POST http://localhost:3000/api/auth/registrar

BODY (JSON):

{
  "nome": "admin",
  "email": "admin@teste.com",
  "senha": "teste123"
}

Usuário registrado
7 — Copie o token JWT retornado para usar nos headers da API

Use no header Authorization:

Authorization: Bearer SEU_TOKEN

8 — Faça login no frontend Angular

Use o e-mail e a senha cadastrados para testar:

Tela de login
✅ Boas Práticas Aplicadas

    🔒 Configuração via dotenv

    🔁 Separação clara de camadas (Rotas → Controllers → Services)

    💬 Tipagem estática robusta (Interfaces/Types)

    🧼 Middlewares de log e tratamento de erros

    🐳 Ambiente reproduzível com Docker

📝 Licença

Feito com 💙 por Jefferson Rodrigo Sotto
