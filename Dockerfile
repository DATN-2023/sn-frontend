FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./

ENV VITE_AUTH_URL="https://api.egosnet.click/customer"
ENV VITE_SERVER_URL="https://api.egosnet.click/appserver"
ENV VITE_IMAGE_URL="https://images.egosnet.click"

RUN yarn
COPY . .
COPY .env.local .env
RUN yarn build
FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
