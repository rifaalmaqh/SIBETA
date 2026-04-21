FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5009

CMD ["node", "src/server.js"]