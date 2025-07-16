# 🧠 BFF Luvinco

<!-- opcional: badges de build, cobertura, licença -->
<!-- ![Build](https://img.shields.io/github/actions/workflow/status/rodrigosotto/bff-luvinco/ci.yml?branch=main) -->
<!-- ![License](https://img.shields.io/github/license/rodrigosotto/bff-luvinco) -->

API **Backend For Frontend (BFF)** em **Node.js + TypeScript** que faz a ponte entre o frontend da loja Luvinco e serviços externos/internos, centralizando regras de negócio e simplificando o consumo de dados pelo cliente web.

---

## 📌 Visão Geral

- 🌐 API REST baseada em **Express**
- ⚙️ Projetada em **TypeScript**
- 📁 Arquitetura modular (Routes → Controllers → Services)
- 🐳 Containerizada com **Docker** / **Docker Compose**
- 🔁 Pronta para escalar e estender

---

## 🔧 Tecnologias

| Categoria | Ferramenta                                  |
| --------- | ------------------------------------------- |
| Runtime   | **Node.js LTS**                             |
| Framework | **Express**                                 |
| Linguagem | **TypeScript**                              |
| HTTP      | **Axios** (requisições a serviços externos) |
| Config    | **dotenv** (variáveis de ambiente)          |
| Dev       | **Nodemon** (hot‑reload)                    |
| Deploy    | **Docker** / **Docker Compose**             |

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
1 — Clonar o repositório

git clone https://github.com/rodrigosotto/bff-luvinco.git
cd bff-luvinco

2 — Instalar dependências

npm install

3 — Configurar variáveis de ambiente

Crie o arquivo .env a partir do template:

cp .env.example .env

Preencha valores, por exemplo:

PORT=3000
PRODUCTS_API_URL=https://api.exemplo.com/produtos

4 — Rodar em modo desenvolvimento

npm run dev
# Acesse em http://localhost:3000

5 — Build & Prod

npm run build       # gera dist/
npm start           # executa dist/index.js

🐳 Docker

Para subir tudo em containers:

docker-compose up --build

Isso cria uma imagem do app e o expõe na porta definida em docker-compose.yml.
🔗 Endpoints Principais (exemplo)
Método	Rota	Descrição
GET	/products	Lista todos os produtos
GET	/products/:id	Detalhes de um produto
POST	/cart	Adiciona itens ao carrinho
GET	/cart	Recupera o carrinho atual
POST	/checkout	Finaliza um pedido

    Ajuste conforme as rotas realmente implementadas.

🧪 Scripts Disponíveis
Comando	Descrição
npm run dev	Inicia com Nodemon (hot‑reload)
npm start	Executa em modo produção (dist/)
npm run build	Transpila TypeScript para JavaScript
npm run lint	(Opcional) executa o linter configurado
✅ Boas Práticas Aplicadas

    🔒 Configuração via dotenv

    🔁 Separação clara de camadas (Rotas → Controllers → Services)

    💬 Tipagem estática robusta (Interfaces/Types)

    🧼 Middlewares de log e tratamento de erros (quando aplicável)

    🐳 Ambiente reproduzível com Docker

📈 Roadmap / Melhorias Futuras

Autenticação JWT/OAuth

Testes unitários e de integração (Jest + Supertest)

Cache (Redis) para endpoints de produtos

Integração com gateway de pagamento real

    Observabilidade (logs estruturados, Prometheus)

🤝 Como Contribuir

    Fork do projeto

    Crie sua branch: git checkout -b minha-feature

    Commit: git commit -m 'feat: Minha feature'

    Push: git push origin minha-feature

    Abra um Pull Request

📝 Licença

Distribuído sob a licença MIT. Veja LICENSE para detalhes.
Feito com 💙 por Jefferson Rodrigo Sotto
```
