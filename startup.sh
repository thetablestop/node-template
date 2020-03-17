#!/bin/bash

python check-queue.py $RABBITMQ_HOST $RABBITMQ_VHOST $RABBITMQ_USER $RABBITMQ_PASS

# Execute Docker command
exec "$@"