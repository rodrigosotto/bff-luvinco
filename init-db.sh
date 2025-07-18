#!/bin/bash

# Script para inicializar o banco de dados PostgreSQL com todas as tabelas

# Configurações
DB_NAME="luvinco_db"
DB_USER="luvinco_user"
DB_PASSWORD="senha_segura"
CONTAINER_NAME="luvinco-db"

# Verifica se o container Docker está rodando
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "❌ O container '${CONTAINER_NAME}' não está rodando."
  echo "👉 Execute primeiro: docker-compose up -d"
  exit 1
fi

# Comando SQL completo
SQL_COMMAND=$(cat <<EOF
-- Criar extensão para UUID se necessário
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  endereco JSONB,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  marca VARCHAR(50),
  categoria VARCHAR(50),
  imagem_url VARCHAR(255),
  disponivel BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de carrinhos
CREATE TABLE IF NOT EXISTS carrinhos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id) UNIQUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens do carrinho
CREATE TABLE IF NOT EXISTS itens_carrinho (
  id SERIAL PRIMARY KEY,
  carrinho_id INTEGER REFERENCES carrinhos(id) ON DELETE CASCADE,
  produto_id INTEGER REFERENCES produtos(id),
  quantidade INTEGER NOT NULL DEFAULT 1,
  adicionado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (carrinho_id, produto_id)
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pendente',
  metodo_pagamento VARCHAR(50),
  endereco_entrega JSONB,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (status IN ('pendente', 'processando', 'enviado', 'entregue', 'cancelado'))
);

CREATE INDEX IF NOT EXISTS idx_pedidos_usuario ON pedidos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos(status);

-- Tabela de itens de pedido
CREATE TABLE IF NOT EXISTS itens_pedido (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER REFERENCES pedidos(id) ON DELETE CASCADE,
  produto_id INTEGER REFERENCES produtos(id),
  quantidade INTEGER NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  sub_total DECIMAL(10,2) GENERATED ALWAYS AS (quantidade * preco_unitario) STORED
);

-- Visualizar tabelas criadas
\dt
EOF
)

# Executar o comando SQL no container
echo "🔄 Inicializando o banco de dados..."
docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME <<< "$SQL_COMMAND"

if [ $? -eq 0 ]; then
  echo "✅ Banco de dados inicializado com sucesso!"
  echo "📊 Tabelas criadas:"
  docker exec $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME -c "\dt"
else
  echo "❌ Erro ao inicializar o banco de dados"
  exit 1
fi