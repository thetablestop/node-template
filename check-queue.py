#!/usr/bin/env python
import pika
import sys

host = sys.argv[1]
vhost = sys.argv[2]
user = sys.argv[3]
pwd = sys.argv[4]
credentials = pika.PlainCredentials(user, pwd)
connection = pika.BlockingConnection(
        pika.ConnectionParameters(host, 5672, vhost, credentials))
print('connection successful!')
channel = connection.channel()
print('channel creation successful!')
