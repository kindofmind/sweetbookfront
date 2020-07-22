FROM node:current-slim

WORKDIR /root/sweetbookfront/
COPY package.json .
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]

COPY . .