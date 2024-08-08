FROM node:20.14.0-alpine AS builder

# Create app directory
WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20.14.0-alpine

ENV NODE_ENV=production

WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --production

COPY --from=builder /usr/app/dist ./dist

USER node

EXPOSE 4000

CMD [ "node", "dist/app.js" ]