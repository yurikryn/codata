FROM node

EXPOSE 8080

WORKDIR /app
COPY ./*.js /app/
COPY package.json /app

RUN npm install

CMD ["node", "main"]