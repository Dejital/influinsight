FROM alpine

WORKDIR /app

RUN apk add --update nodejs nodejs-npm
RUN apk add yarn
RUN apk add python3
RUN apk add py-pip
RUN pip install instaloader

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 80

RUN yarn run build

CMD [ "yarn", "run", "start" ]

