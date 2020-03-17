# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim

# Add diagnostic tools
RUN apt-get -yq update && apt-get install -y iputils-ping dnsutils python python-pip
RUN python -m pip install pika --upgrade

# Create and change to the app directory.
WORKDIR /home/appusr/app

# Copy built code
COPY package*.json ./
COPY node_modules/. node_modules/
COPY src/. src/

COPY startup.sh .
RUN chmod 700 ./startup.sh

COPY check-queue.py .
RUN chmod 700 ./check-queue.py

COPY testdb.js .
COPY testq.js .

# Add app user
RUN useradd -r appusr \
  && chown -R appusr:appusr /home/appusr

# Run app as non privileged.
USER appusr

# Run startup
ENTRYPOINT [ "./startup.sh" ]

# Run the web service on container startup.
CMD [ "yarn", "serve" ]
