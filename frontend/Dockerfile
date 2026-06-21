# Estágio 1: Build da aplicação React
FROM node:20-alpine AS build

WORKDIR /app

# Copia os arquivos de configuração e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código e gera a pasta 'dist' de produção
COPY . .
RUN npm run build

# Estágio 2: Servidor de Produção Leve (Nginx)
FROM nginx:alpine

# Copia os arquivos compilados do estágio anterior para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração customizada do Nginx para suportar as rotas do React (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta padrão do servidor web
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
