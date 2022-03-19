#build stage
FROM node:14-alpine AS build
# Set working directory
WORKDIR /app

# Copy our node module specification
COPY package.json package.json
COPY yarn.lock yarn.lock

# Copy all files from current directory to working dir in image
# Except the one defined in '.dockerignore'
COPY . .

# install node modules and build assets
RUN yarn install --production

#run and serve stage
FROM nginx:1.21.6
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=builder /app/build .

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'