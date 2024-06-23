FROM node as builder

# Create app directory
WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20.14.0-alpine

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/app/dist ./dist

EXPOSE 4000
CMD [ "node", "dist/app.js" ]