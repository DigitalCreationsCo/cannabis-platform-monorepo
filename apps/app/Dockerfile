FROM --platform=linux/amd64 node:16-alpine3.17
# # Set working directory
# WORKDIR /usr/app
# # Install PM2 globally
# RUN npm install --global pm2
# # Copy "package.json" and "package-lock.json" before other files
# # Utilise Docker cache to save re-installing dependencies if unchanged
# COPY ./package*.json ./
# COPY ../../yarn.lock ./
# # Install dependencies
# RUN yarn set version berry
# RUN yarn install
# # Copy all files
# COPY ./ ./
# # Build app
# RUN yarn build
# # Expose the listening port
# EXPOSE 3000
# # Run container as non-root (unprivileged) user
# # The "node" user is provided in the Node.js Alpine base image
# USER node
# # Launch app with PM2
# CMD [ "pm2-runtime", "start", "yarn", "--", "start" ]

ENV YARN_VERSION 3.3.1

# RUN apk add --no-cache libc6-compat
# RUN apk add --update --no-cache libc6-compat openssl openssl-dev
# RUN apk add --update --no-cache libc6-compat openssl libressl-dev
# RUN apt-get install openssl openssl-dev libc6 
RUN apk add --update --no-cache libc6-compat openssl1.1-compat
WORKDIR /root/monorepo
COPY package.json ./
COPY yarn.lock ./
RUN npm install --global pm2
COPY . .

# RUN npm install -global turbo
RUN yarn set version $YARN_VERSION
RUN yarn install

# RUN apk update && apk add openssl openssl-dev
#  libssl-dev
# RUN yarn db generate
RUN npx prisma generate
RUN yarn build

WORKDIR /root/monorepo/apps/app
EXPOSE 3000
USER node
CMD [ "pm2-runtime", "start", "yarn", "--", "start" ]
# RUN docker run --rm -it -p3000:3000 web