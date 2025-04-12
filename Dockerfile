# Use official Node.js 22 image
FROM node:22

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose port 8080 (container-side)
EXPOSE 8080

# Run Next.js development server on port 8080
CMD ["npm", "run", "dev"]
