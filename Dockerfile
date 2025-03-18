FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache openssl3
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm" "run" "start:dev"]