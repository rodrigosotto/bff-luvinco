# 🧠 BFF Desafio LuvinCo

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

| Categoria | Ferramenta                         |
| --------- | ---------------------------------- |
| Runtime   | **Node.js LTS**                    |
| Framework | **Express**                        |
| Linguagem | **TypeScript**                     |
| Config    | **dotenv** (variáveis de ambiente) |
| Deploy    | **Docker** / **Docker Compose**    |

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
.env.example (dados de conexão banco local e api externa para fim de testes)


✅ Para subir os container com docker-compose você precisa ter o DOCKER instalado em seu sistema.
https://docs.docker.com/desktop/setup/install/windows-install/
https://docs.docker.com/engine/install/ubuntu/

🐳 Se você estiver usando Linux

4 — Rodar script bash para iniciar o container e o banco de dados (linux)
 -chmod +x start.sh

5 - Rodar comando que sobe os containers definidos no docker-compose.yml
 -docker-compose up --build

  🐳 Se você estiver usando Windows

6 -
7 -

https://i.ibb.co/d0t2FjJm/CONECTADO.png

6 Próximo Passo será registrar um usuário para logar no sistema, você pode usar postman ou insominia.

 -POST http://localhost:3000/api/auth/registrar
 -BODY
 {
  "nome": "admin",
  "email": "admin@teste.com",
  "senha": "teste123"
}

[ADICIONAR IMAGEM DO INSOMNIA COM UM USUARIO REGISTRADO](https://i.ibb.co/bgLHDM2b/REGISTRADO.png)

7 - Feito o registro do usuário, conforme print acima, você deve copiar o token para usar no HEADER Authorization Bearer

(https://i.ibb.co/qY0M1sLK/token.png)
https://i.ibb.co/78tk8Cm/logado.png

8 - Agora acesse o frontend angular e voce já poderá efetuar o login com o email e senha que você criou anteriormente
https://i.ibb.co/bMSJNmCf/login-Page.png


✅ Boas Práticas Aplicadas

    🔒 Configuração via dotenv

    🔁 Separação clara de camadas (Rotas → Controllers → Services)

    💬 Tipagem estática robusta (Interfaces/Types)

    🧼 Middlewares de log e tratamento de erros (quando aplicável)

    🐳 Ambiente reproduzível com Docker

📝 Licença
Feito com 💙 por Jefferson Rodrigo Sotto
```
