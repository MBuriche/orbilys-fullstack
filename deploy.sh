#!/bin/bash
echo "🚀 Iniciando deploy..."
git pull public main
cd frontend-nuxt
npm run build
pm2 restart orbilys-frontend
echo "✅ Deploy concluído!"
