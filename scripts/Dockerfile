# This is a multi-stage Dockerfile which contains all CI-related operations as well as images to be deployed in production
FROM node:12.16.2-alpine3.11 as deps

RUN apk add -U git

WORKDIR /build

# Adding user for building the app
RUN addgroup runners && adduser -D runner -G runners
RUN chown -R runner:runners /build
USER runner

# Adding and installing packages
ADD --chown=runner:runners package.json yarn.lock ./
RUN yarn install --frozen-lockfile && rm -rf /home/runner/.cache

FROM deps as src
# image with the source code
ADD --chown=runner:runners . .

FROM src as formatting

RUN yarn run format:check --all

FROM src as security-audit

RUN yarn audit --level moderate

FROM src as builder
ARG APP
ENV APP=${APP}

RUN yarn run build ${APP} --prod

FROM src as linter
ARG APP
ENV APP=${APP}

RUN yarn run lint ${APP}

FROM src as test

CMD yarn run test ${APP}

FROM src as nx-runner
# image use to run NX-related operations (print-affected, etc.)
ENV PATH=./node_modules/.bin:$PATH

FROM node:12.16.2-alpine3.11 as output-base
# this is base image for containers that are to be deployed
ARG GIT_BRANCH
ARG GIT_SHA
LABEL branch=${GIT_BRANCH}
LABEL commit=${GIT_SHA}
ENV GIT_BRANCH=${GIT_BRANCH}
ENV GIT_SHA=${GIT_SHA}
ARG APP
ARG APP_HOME
ARG APP_DIST_HOME
ENV APP=${APP}
ENV NODE_ENV=production

RUN apk add bash -U && rm -rf /var/cache/apk/*
WORKDIR /webapp

# Adding user for running the app
RUN addgroup runners && adduser -D runner -G runners
RUN chown -R runner:runners /webapp
USER runner

FROM output-base as output-express
# image with build of an Express.js app

COPY --from=builder --chown=runner:runners /build/${APP_DIST_HOME} /webapp
COPY --from=builder --chown=runner:runners /build/node_modules /webapp/node_modules

ENTRYPOINT [ "node" ]
CMD [ "main.js" ]

FROM output-base as output-next
# image with build of an Next.js app

COPY --from=builder --chown=runner:runners /build/node_modules /webapp/node_modules
COPY --from=builder --chown=runner:runners /build/${APP_HOME}/next.config.js /webapp
COPY --from=builder --chown=runner:runners /build/${APP_HOME}/public /webapp/public
COPY --from=builder --chown=runner:runners /build/${APP_DIST_HOME} /webapp/.next

ENTRYPOINT [ "npx", "next", "start", "-p", "4200" ]