FROM node:15.0.1-buster-slim as build-stage

WORKDIR /usr/src/app

COPY  package*.json ./

RUN npm install

COPY . /usr/src/app/

RUN npm run build


FROM nginx:1.19-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

COPY prod.nginx.conf /etc/nginx/conf.d/default.conf


