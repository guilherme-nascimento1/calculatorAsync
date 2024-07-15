# Stage 1: Build the application
FROM node:18 as build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY tsconfig.json ./
COPY src ./src

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json and install production dependencies
COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm install --only=production

# Copy the build output
COPY --from=build /app/dist ./dist

# Copy the environment variables file if it exists
COPY .env .env

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/server.js"]
