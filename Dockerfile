# Frontend Dockerfile (frontend/Dockerfile)

# Use official Node.js image (v20.16.0)
FROM node:20.16.0-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Copy the environment file (if required during build time)
COPY .env.local .env.local

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the frontend port (Next.js runs on port 3000 by default)
EXPOSE 3000

# Build the Next.js application
RUN npm run build

# Start the Next.js server
CMD ["npm", "run", "start"]
