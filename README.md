# 🧠 BFF Desafio LuvinCo
https://bff-luvinco.onrender.com/

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
```

---

## 🚀 Instalação e Uso

### 1 — Clonar o repositório

```bash
git clone https://github.com/rodrigosotto/bff-luvinco.git
cd bff-luvinco
```

### 2 — Instalar dependências

```bash
npm install
```

### 3 — Configurar variáveis de ambiente

Crie o arquivo `.env` a partir do template `.env.example`  
(Dados de conexão com banco local e API externa para fins de testes)

---

✅ Para subir os containers com Docker Compose, você precisa ter o **Docker** instalado:

- [Instalar no Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
- [Instalar no Linux (Ubuntu)](https://docs.docker.com/engine/install/ubuntu/)

---

### 🐳 Se você estiver usando Linux:

#### 4 — Dar permissão de execução ao script:

```bash
chmod +x start.sh
```

#### 5 — Subir os containers com Docker Compose:

```bash
docker-compose up --build
```

![Containers conectados](https://i.ibb.co/d0t2FjJm/CONECTADO.png)

---

### 🐳 Se você estiver usando Windows:

(Siga os mesmos passos acima usando o PowerShell ou CMD com Docker Desktop rodando)

---

### 6 — Registrar um usuário (via Postman ou Insomnia)

```http
POST http://localhost:3000/api/auth/registrar
```

**BODY (JSON):**
```json
{
  "nome": "admin",
  "email": "admin@teste.com",
  "senha": "teste123"
}
```

<img width="1309" height="462" alt="image" src="https://github.com/user-attachments/assets/23476809-56bb-40bc-8300-3c1dc994b339" />


---

### 7 — Copie o token JWT retornado para usar nos headers da API

**Use no header Authorization:**

```
Authorization: Bearer SEU_TOKEN
```
<img width="1318" height="488" alt="image" src="https://github.com/user-attachments/assets/bf925b2f-6a9a-471e-9c1e-c850c1aa0800" />

**Se quiser pode testar e verificar se esta logando**
<img width="1307" height="411" alt="image" src="https://github.com/user-attachments/assets/3b5ce8fb-d5d7-408a-b2ad-7cad58451b52" />

---

### 8 — Faça login no frontend Angular

Use o e-mail e a senha cadastrados para testar:

![Tela de login](https://i.ibb.co/bMSJNmCf/login-Page.png)

---

## ✅ Boas Práticas Aplicadas

- 🔒 Configuração via dotenv
- 🔁 Separação clara de camadas (Rotas → Controllers → Services)
- 💬 Tipagem estática robusta (Interfaces/Types)
- 🧼 Middlewares de log e tratamento de erros
- 🐳 Ambiente reproduzível com Docker

---

- Link da API https://bff-luvinco.onrender.com/

## 📝 Licença

Feito com 💙 por **Jefferson Rodrigo Sotto**
