
const twilio = require('twilio');

const accountSid = 'AC43606f80cb8159b48506ae7be1884883';
const authToken = 'fccbf559a87223f0bfaa51c516fdce1a';
const fromPhone = '+19702927295';

const client = new twilio(accountSid, authToken);

const sendsms = (message, to) => {
  return client.messages.create({
    body: message,
    from: fromPhone,
    to,
  });
};

module.exports = sendsms;
