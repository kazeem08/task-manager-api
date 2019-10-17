const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('../config/config');

async function sendMail(email, name){
    try{
        let transporter = nodemailer.createTransport(smtpTransport({
            service: config.mail.service,
            host: config.mail.host,
            auth: {
                   user: config.mail.user,
                   pass: config.mail.pass
               }
            }));
    
        //    let attachment = [{ // file on disk as an attachment '/tmp/' + filename + '.csv';
        //     filename: `${filename}`.csv,
        //     path: `${filePath}${filename}.csv` // stream this file
        // }]
        const mailOptions = {
            from: 'kazeem0825@gmail.com', 
            to: email, 
            subject: 'Task manager', 
            html: `<p>Good day ${name}.</p><br><p>Welcome to task manager Application</p>`
            // attachments: attachment  
          };
    
          let info = await transporter.sendMail(mailOptions);
    
          console.log('Message sent: %s', info.messageId);
    } catch(err){
        console.log("unable to send mail", err)
    }
   
}

module.exports = sendMail;
