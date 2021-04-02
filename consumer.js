var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }),
    consumer = new Consumer(client,
        [{ topic: 'chat_101', offset: 0 }],
        {
            autoCommit: false
        }
    );

const request = require('request');



consumer.on('message', function (message) {
    console.log(message);
    request({
        method: 'POST',
        uri: 'https://stirring-flea-21.hasura.app/v1/graphql',
        headers : {
            "content-type" : "application/json",
            "x-hasura-admin-secret" : "ro522rFLirpcr7gcovdYtszj6kJlI60oO43e7TbWBaOnFjox8iVPZQtclc3YqLPi"
        },
        body:JSON.stringify({
            "query":`mutation MyMutation { insert_chat_history_one(object: {topic:  \"${message.topic}\", value: ${message.value}}) {id}}`,
            "variables":null,
            "operationName":"MyMutation"
        })
      },
      function (error, response, body) {
        if (error) {
          return console.error('upload failed:', error);
        }
        console.log('Upload successful!  Server responded with:', body);
      })
});

consumer.on('error', function (err) {
    console.log('Error:', err);
})

consumer.on('offsetOutOfRange', function (err) {
    console.log('offsetOutOfRange:', err);
})