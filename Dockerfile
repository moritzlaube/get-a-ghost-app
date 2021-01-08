FROM node:14-slim

WORKDIR /app

ADD package*.json .

RUN npm install

ADD bin ./bin

CMD [ "npm", "run", "dev" ]