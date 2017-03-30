FROM node:7.6-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install

EXPOSE 3000

CMD [ "npm", "start" ]