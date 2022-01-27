FROM node:16.13.0-alpine3.12

WORKDIR /usr/src/app

ENV JWTSECRET=SecretKey
ENV JWTEXPIRE=60s
ENV PORT=3000
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=docker
ENV DATABASE=nestjs
ENV DEBUG_MODE=TRUE
ENV GQP_SCHEMA_FILE=schema.gql
ENV GQL_SUBSCRIPTIONS_ACTIVE=FALSE
ENV TYPEORM_SYNCHRONIZE=FALSE

COPY package.json package.json
#COPY . .
#COPY package-lock.json package-lock.json
RUN npm cache verify
RUN npm --verbose install

COPY dist/ /usr/src/app/dist/

EXPOSE $PORT
CMD [ "npm", "run", "start:prod" ]
