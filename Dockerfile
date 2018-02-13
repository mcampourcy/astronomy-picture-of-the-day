# Use an official Node runtime as a parent image
FROM node:carbon-alpine

# Create a new directory
RUN mkdir -p /usr/src/app

# Sets the directory as the working directory for any COPY, RUN and CMD instructions
# that follow in the Dockerfile
WORKDIR /usr/src/app

# Expose port which the container will listen on
# Déclaré avant les packages, puisque ne sera pris en compte qu'une fois
EXPOSE 3000

# Copy the package.json file to the working directory
# tant que package ne change pas, ne fait pas d'install (perf+++)
# si modif package, fait tout à partir de cette ligne
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

# Install dependencies
RUN npm install

# Copy the entire local directory into our working directory
# to bundle our application source code
COPY . /usr/src/app

# Le container docker lance un npm start (avec monitoring, thanks to nodemon)
# pour vsualiser les logs du server : docker-compose logs -f app
# Sets the default command to execute our container
CMD [ "npm", "start" ]