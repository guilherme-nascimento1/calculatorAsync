## About Project

This project consists of an application that receives two numbers through an API, stores them in a MongoDB database, publishes a message to RabbitMQ and processes this message in a worker written in C#. 
The worker performs basic mathematical operations (addition, subtraction, multiplication and division) and updates the database with the results.
