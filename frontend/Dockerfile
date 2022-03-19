#build stage
FROM node:14-alpine AS build
WORKDIR /usr/src/ssat-prep/client
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN yarn install --production && yarn build 

#run and serve stage
FROM nginx:alpine
COPY --from=build-stage /usr/src/app/_site/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'