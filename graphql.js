const request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });



request({
    method: 'POST',
    uri: 'https://stirring-flea-21.hasura.app/v1/graphql',
    headers : {
        "content-type" : "application/json",
        "x-hasura-admin-secret" : "ro522rFLirpcr7gcovdYtszj6kJlI60oO43e7TbWBaOnFjox8iVPZQtclc3YqLPi"
    },
    body:JSON.stringify({
        "query":"mutation MyMutation { insert_chat_history_one(object: {topic: \"test\", value: \"test2\"}) {\n    id\n  }\n}\n",
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