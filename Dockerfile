FROM node:16.16-alpine
ENV YARN_VERSION 3.3.1
ENV TURBO_VERSION 1.6.3

RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /monorepo
RUN npm install turbo@$TURBO_VERSION --location=global
COPY . .
COPY .gitignore .gitignore
COPY package.json .
COPY ecosystem.config.js .
COPY turbo.json .

RUN yarn install
RUN yarn build

EXPOSE 3000
EXPOSE 6001

RUN ls -al -R
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]