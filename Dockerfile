# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim

# Add diagnostic tools
RUN apt-get -yq update && apt-get install -y iputils-ping dnsutils

# Create and change to the app directory.
WORKDIR /home/appusr/app

# Copy built code
COPY package*.json ./
COPY node_modules/. node_modules/
COPY src/. src/

# Add app user
RUN useradd -r appusr \
  && chown -R appusr:appusr /home/appusr

# Run app as non privileged.
USER appusr

# Run the web service on container startup.
CMD [ "yarn", "serve" ]
