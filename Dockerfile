# Use official Node.js LTS image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
