FROM node:16-alpine AS client-build

RUN mkdir -p /lawyer

WORKDIR /lawyer

COPY . .

RUN yarn config set registry https://registry.npm.taobao.org

EXPOSE 4173

FROM nginx:stable-alpine

COPY --from=client-build /lawyer/dist /usr/share/nginx/html/

COPY ./cert /etc/nginx/

COPY nginx.conf /etc/nginx/conf.d/