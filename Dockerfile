## ---- Base Node image ----
#FROM node:lts-alpine AS base
#
## Set the working directory inside the container
#WORKDIR /app
#
## Copy package.json and package-lock.json to the working directory
#COPY package*.json ./
#COPY src/static ./index.html
#
## Install production dependencies only
#RUN npm install --production
#
## ---- Build image ----
#FROM base AS build
#
## Copy the rest of the application code to the working directory
#COPY . .
#
## Build the application
#RUN npm run build

# ---- Production image ----
FROM node:lts-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY src/static ./index.html

# Install production dependencies only
RUN npm install --production

RUN npm run build

# Copy the built application to the working directory
COPY . .

# Expose the port the application runs on
EXPOSE 80

# Serve the application
CMD ["node", "./dist/index.js"]
