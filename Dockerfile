FROM node:10.16.0

WORKDIR /Users/kazeemjimoh/Desktop/My folders/docker/docker-test

COPY package.json ./

RUN npm install

CMD [ "/bin/bash" ]