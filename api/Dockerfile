FROM node:16-slim

ENV NODE_ENV=production 

WORKDIR /app

ADD package*.json ./

RUN npm install --production

ADD bin ./bin
ADD src ./src

CMD [ "npm", "start" ]
