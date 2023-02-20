FROM node:16-slim as builder
WORKDIR /app
COPY . .
RUN npm run build

CMD ["/usr/local/bin/node", "dist/main"]