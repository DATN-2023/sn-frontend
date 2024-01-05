FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./

ENV VUE_AUTH_URL="https://api.egosnet.click/customer"
ENV VUE_SERVER_URL="https://api.egosnet.click/appserver"
ENV VUE_IMAGE_URL="https://images.egosnet.click"

RUN yarn
COPY . .
RUN yarn build
FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
