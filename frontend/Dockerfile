# Name the node stage "builder"
FROM node:15-alpine AS builder

# Set working directory
WORKDIR /app

# Copy our node module specification
COPY package.json package.json
COPY yarn.lock yarn.lock

# install node modules and build assets
RUN yarn install --production --ignore-engines

# Copy all files from current directory to working dir in image
# Except the one defined in '.dockerignore'
COPY . .

# Set Environment Variable
# ARG REACT_APP_IPV4ADDRESS
# ENV REACT_APP_IPV4ADDRESS=$REACT_APP_IPV4ADDRESS
# ARG REACT_APP_IPV6ADDRESS
# ENV REACT_APP_IPV6ADDRESS=$REACT_APP_IPV6ADDRESS

# Create production build of React App
RUN yarn build

# Choose NGINX as our base Docker image
# FROM nginx:1.21.6

# # Set working directory to nginx asset directory
# WORKDIR /usr/share/nginx/html

# # Remove default nginx static assets
# RUN rm -rf *

# # Add your nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copy static assets from builder stage
# COPY --from=builder /app/build .

# # EXPOSE 80

# # Entry point when Docker container has started
# CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

# ENTRYPOINT ["nginx", "-g", "daemon off;"]
FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.config /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /opt/web/build /usr/share/nginx/html