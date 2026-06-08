# syntax=docker/dockerfile:1.7

# ============================================================
# Stage 1: dev — laufender Dev-Server
# ============================================================
FROM oven/bun:1.3-alpine AS dev
WORKDIR /app

COPY package.json ./
RUN bun install --no-frozen-lockfile

COPY . .

EXPOSE 4321
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]

# ============================================================
# Stage 2: build — statisches Bundle für GH Pages
# ============================================================
FROM oven/bun:1.3-alpine AS build
WORKDIR /app

COPY package.json ./
RUN bun install --no-frozen-lockfile

COPY . .
RUN bun run build

# ============================================================
# Stage 3: serve — Production nginx Container (Self-Hosting)
# ============================================================
FROM nginx:1.27-alpine AS serve
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
