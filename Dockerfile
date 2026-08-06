FROM node:24-bookworm-slim AS base
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg fonts-dejavu-core && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV LORE_FONT_PATH=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf
COPY --from=build /app .
RUN mkdir -p /app/data /app/storage/uploads /app/storage/renders && chown -R node:node /app
USER node
EXPOSE 3000
CMD ["npm", "start"]
