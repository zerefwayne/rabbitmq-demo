import pika
import time
import uuid

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))

channel = connection.channel()

res = channel.queue_declare(queue='TEST_QUEUE', auto_delete=False)

count = 0

while count < 10:

    message = str(uuid.uuid4())

    print("Sending message", message)

    channel.basic_publish(exchange='', routing_key='TEST_QUEUE', body=message)
    time.sleep(0.5)
    count += 1

connection.close()
