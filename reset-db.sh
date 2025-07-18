#!/bin/bash

# Parar e remover containers
docker-compose down -v

# Iniciar containers
docker-compose up -d --build

# Inicializar banco de dados
./init-db.sh

echo "✅ Banco de dados reinicializado completamente!"