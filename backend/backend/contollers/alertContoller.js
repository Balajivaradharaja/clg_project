// const twilio = require('twilio');

// const accountSid = 'AC43606f80cb8159b48506ae7be1884883';
// const authToken = 'fccbf559a87223f0bfaa51c516fdce1a';
// const twilioNumber = '+19702927295'; 
// const client = new twilio(accountSid, authToken);

// // exports.sendAlertSMS = async (req, res) => {
// //   const { message, to } = req.body;

// //   try {
// //     const sms = await client.messages.create({
// //       body: message,
// //       from:twilioNumber,
// //       to: to,
// //     });

// //     res.status(200).json({ success: true, sid: sms.sid });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// exports.sendAlertSMS = async (req, res) => {
//     const { message, to } = req.body;
  
//     console.log("Incoming SMS Request:", req.body); 
  
//     if (!to || !message) {
//       return res.status(400).json({ error: "Missing 'to' or 'message'" });
//     }
  
//     try {
//       const sms = await client.messages.create({
//         body: message,
//         from: twilioNumber,
//         to: to,
//       });
  
//       res.status(200).json({ success: true, sid: sms.sid });
//     } catch (error) {
//       console.error("Twilio Error:", error); 
//       res.status(500).json({ error: error.message });
//     }
//   };
  
const twilio = require('twilio');
const Product = require('../models/Product'); // adjust path if needed

const accountSid = 'AC43606f80cb8159b48506ae7be1884883';
const authToken = 'fccbf559a87223f0bfaa51c516fdce1a';
const twilioNumber = '+19702927295';
const client = new twilio(accountSid, authToken);

// Destination number (you can also get this from req.body or .env)
const destinationPhone = '+919500281439'; // ← replace with your verified number

exports.sendAlertSMS = async (req, res) => {
  try {
    const products = await Product.find();
    const now = new Date();

    const expired = products.filter(p => new Date(p.expiry) < now);
    const lowStock = products.filter(p => p.stock <= 10); // You can change this threshold

    let messageBody = '🔔 Medical Store Alert:\n';

    if (expired.length === 0 && lowStock.length === 0) {
      messageBody += '✅ All good. No expired or low stock items.';
    } else {
      if (expired.length > 0) {
        messageBody += '\n❌ Expired Medicines:\n';
        expired.forEach(p => {
          messageBody += `- ${p.name} (Expired: ${new Date(p.expiry).toLocaleDateString()})\n`;
        });
      }
      if (lowStock.length > 0) {
        messageBody += '\n⚠️ Low Stock:\n';
        lowStock.forEach(p => {
          messageBody += `- ${p.name} (Only ${p.stock} left)\n`;
        });
      }
    }

    const sms = await client.messages.create({
      body: messageBody,
      from: twilioNumber,
      to: destinationPhone,
    });

    res.status(200).json({ success: true, sid: sms.sid, message: '📲 Alert sent successfully!' });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ success: false, message: '❌ Failed to send SMS.', error: error.message });
  }
};
