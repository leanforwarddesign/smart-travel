FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Use development environment
ENV NODE_ENV=development

# Install ts-node and nodemon globally (optional)
RUN npm install -g ts-node nodemon

# Start the app in dev mode
CMD ["npm", "run", "dev"]
