FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/build . 

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]