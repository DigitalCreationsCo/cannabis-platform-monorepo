FROM node:16-alpine
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

RUN echo 'set workdir monorepo'
WORKDIR /root/monorepo
RUN echo 'copy files'
COPY . .
RUN echo 'set yarn version'
RUN yarn set version berry
RUN yarn workspaces focus @cd/app
RUN echo 'set workdir apps/app'
WORKDIR /root/monorepo/apps/app
RUN echo 'install pm2'
RUN npm install --global pm2
RUN yarn build
RUN echo 'yarn build'

EXPOSE 3000
RUN echo 'expose port 3000'
USER node
RUN echo 'pm2 start'
CMD [ "pm2-runtime", "start", "yarn", "--", "start" ]
# RUN docker run --rm -it -p3000:3000 web