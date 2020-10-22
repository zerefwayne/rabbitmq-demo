const amqp = require("amqplib/callback_api");

const CONN_URL = "amqp://localhost:5672/";

let chan = null;

amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {
       
      chan = channel;

      channel.consume('TEST_QUEUE', function (msg) {
        console.log('.....');
            console.log("Message:", msg.content.toString());
        },{ noAck: true }
      );

   });
});

process.on('exit', (code) => {
    chan.close();
    console.log(`Closing rabbitmq channel`);
 });