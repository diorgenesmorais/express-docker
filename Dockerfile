FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm audit --audit-level=moderate || echo "Vulnerabilities found"
COPY . .
RUN npm run build

FROM node:lts-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
RUN mkdir -p /app/logs && chown -R node:node /app
USER node
EXPOSE 4000
CMD [ "node", "dist/app.js" ]