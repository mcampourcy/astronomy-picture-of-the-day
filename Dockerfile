# Use an official Node runtime as a parent image
FROM node:7.7.2-alpine

# Create a new directory
RUN mkdir -p /usr/src/app

# Sets the directory as the working directory for any COPY, RUN and CMD instructions
# that follow in the Dockerfile
WORKDIR /usr/src/app

# Copy the package.json file to the working directory
COPY package.json /usr/src/app/

# Install dependencies
RUN npm install

# Copy the entire local directory into our working directory
# to bundle our application source code
COPY . /usr/src/app

# Expose port which the container will listen on
EXPOSE 3000

# Sets the default command to execute our container
CMD [ "npm", "start" ]