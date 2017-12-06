FROM node:carbon

# Since node:carbon has yarn built-in, we don't need to install yarn

# Create app directory
WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN npm run build