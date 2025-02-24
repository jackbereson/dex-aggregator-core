#   ____  _    _ _____ _      _____
#  |  _ \| |  | |_   _| |    |  __ \
#  | |_) | |  | | | | | |    | |  | |
#  |  _ <| |  | | | | | |    | |  | |
#  | |_) | |__| |_| |_| |____| |__| |
#  |____/ \____/|_____|______|_____/
#
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache python3 make g++ bash
RUN npm update -g npm
RUN npm install -f
COPY . .
RUN npm run build-ts
RUN npm prune --production

#   _____  _    _ _   _npm run build
#  |  __ \| |  | | \ | |
#  | |__) | |  | |  \| |
#  |  _  /| |  | | . ` |
#  | | \ \| |__| | |\  |
#  |_|  \_\\____/|_| \_|
#
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
RUN mkdir -p ./public
EXPOSE 5555
CMD [ "node", "dist/server.js"]
