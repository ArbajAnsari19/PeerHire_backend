# Stage 1: Build TypeScript code
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Add debugging steps
RUN echo "Content of src directory:" && ls -la src/
RUN npm run build
RUN echo "Content of dist directory:" && ls -la dist/

# Stage 2: Run built code
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY .env ./
# Add debugging step
RUN echo "Content of dist directory in final stage:" && ls -la dist/

CMD ["node", "dist/index.js"]