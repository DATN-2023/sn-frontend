FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./

ENV VITE_AUTH_URL="https://api.egosnet.click/customer"
ENV VITE_SERVER_URL="https://api.egosnet.click/appserver"
ENV VITE_IMAGE_URL="http://minio:9000/social-network"
ENV VITE_THUMBOR_URL="https://images.egosnet.click"
ENV VITE_CHAT_URL="https://api.egosnet.click/chat"

RUN yarn
COPY . .
#COPY .env.local .env
RUN yarn build
FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
