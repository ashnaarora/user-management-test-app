# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define environment variable for MongoDB URI (can be overridden at runtime)
ENV MONGO_URI=mongodb://mongo:27017/user_management

# Run index.js when the container launches
CMD [ "npm", "start" ] 