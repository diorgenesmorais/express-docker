FROM node:22.15.0-alpine AS builder

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22.15.0-alpine

ENV NODE_ENV=production

WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm ci --production

COPY --from=builder /app/dist ./dist

RUN mkdir -p /app/logs && chown -R node:node /app

USER node

EXPOSE 4000

CMD [ "node", "dist/app.js" ]