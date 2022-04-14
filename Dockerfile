FROM node:16-alpine as build-stage
WORKDIR /app
COPY ./package.json ./
RUN yarn
COPY . .
ARG NODE_ENV
ARG NUXT_HOST
ARG NUXT_ENV_API_URL
ARG NUXT_ENV_SYSTEM_ID
ARG NUXT_ENV_SENTRY_DSN
ENV NODE_ENV=${NODE_ENV}
ENV NUXT_HOST=${NUXT_HOST}
ENV NUXT_ENV_API_URL=${NUXT_ENV_API_URL}
ENV NUXT_ENV_SYSTEM_ID=${NUXT_ENV_SYSTEM_ID}
ENV NUXT_ENV_SENTRY_DSN=${NUXT_ENV_SENTRY_DSN}
RUN yarn build

FROM node:16-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app/package.json ./
COPY --from=build-stage /app/yarn.lock ./
RUN yarn --production
COPY --from=build-stage /app/.nuxt ./.nuxt
COPY --from=build-stage /app/.server ./.server
COPY --from=build-stage /app/static ./static
ARG NODE_ENV
ARG NUXT_HOST
ENV NODE_ENV=${NODE_ENV}
ENV NUXT_HOST=${NUXT_HOST}
ENV NODE_EXTRA_CA_CERTS=/app/.server/ca_intermediate_root_bundle.pem
EXPOSE 3000
CMD [ "yarn", "start"]
