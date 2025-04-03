FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install && apk add --no-cache curl

COPY . .

CMD ["node", "index.js"]