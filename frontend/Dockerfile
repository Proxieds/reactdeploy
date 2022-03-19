#build stage
FROM node:14-alpine AS build
WORKDIR /usr/src/ssat-prep/client
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN yarn install --production && yarn build 

#run and serve stage
FROM nginx:alpine
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=build /usr/src/ssat-prep/client/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]