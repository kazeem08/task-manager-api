const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);
sgMail.send({
	to: 'kazeem0825@gmail.com',
	from: 'kazeem0825@gmail.com',
	subject: 'my first email creation',
	text: 'Testing my first email'
});

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'kazeem0825@gmail.com',
		subject: 'my first email creation',
		text: `Welcome to the app, ${name}. Let me know how you get along with the app`
	});
};

const cancelEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'kazeem0825@gmail.com',
		subject: 'Cancellation',
		text: `Goodbye${name}. How could we have served you better`
	});
};

module.exports = {
	sendWelcomeEmail,
	cancelEmail
};
