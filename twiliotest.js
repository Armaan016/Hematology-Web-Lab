const accountSid = 'ACfc0330ae14d714789b23d0d0fccb907c';
const authToken = '17bfdf9f16527986a2ac4ef77115a243';

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from twilio-node',
    to: '+919581495753', // Text your number
    from: '13343669296', // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));