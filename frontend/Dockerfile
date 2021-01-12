FROM node:14-slim

WORKDIR /app

ADD package*.json ./

RUN npm install

ADD public ./public
ADD .browserslistrc .eslintrc.js .prettierrc babel.config.js vue.config.js ./

CMD [ "npm", "run", "serve" ]