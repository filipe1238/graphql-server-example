# ---- Base Node image ----
FROM node:lts-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# ---- Build image ----
FROM base AS build

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# ---- Production image ----
FROM node:lts-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the static html files
COPY src/static ./

# Install production dependencies only
RUN npm install --production

# Copy built application from the build stage
COPY --from=build /app/dist ./dist

# Expose port 80 for HTTP traffic
EXPOSE 80

# Command to start the server on port 80
CMD ["node", "./dist/index.js"]
