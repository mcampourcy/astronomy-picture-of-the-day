# Use an official Node runtime as a parent image
FROM node:carbon-alpine

# Create a new directory
RUN mkdir -p /usr/src

# Sets the directory as the working directory for any COPY, RUN and CMD instructions
WORKDIR /usr/src

# Expose port which the container will listen on
EXPOSE 3000

# Copy the package.json file to the working directory
COPY package.json /usr/src/
COPY package-lock.json /usr/src/

# Install dependencies
RUN npm install

# Copy the entire local directory into our working directory
# to bundle our application source code
COPY . /usr/src

# Sets the default command to execute our container
CMD [ "npm", "start" ]