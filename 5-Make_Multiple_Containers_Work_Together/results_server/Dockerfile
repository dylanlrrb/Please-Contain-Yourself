FROM node:14-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install

RUN yarn global add nodemon

EXPOSE 3000

CMD [ "npm", "run", "startdev" ]
