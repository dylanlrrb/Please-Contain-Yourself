FROM node:7.6-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install -g yarn

RUN yarn install

EXPOSE 8080

CMD [ "npm", "start" ]