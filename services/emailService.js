const nodemailer =
  require("nodemailer");


const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {

      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS

    }

  });


const sendFraudAlert =
async (
  email,
  transaction
) => {

  const mailOptions = {

    from:
      process.env.EMAIL_USER,

    to: email,

    subject:
      "🚨 Fraud Alert Detected",

    html: `

      <h2>
        Fraudulent Transaction Detected
      </h2>

      <p>
        Amount:
        ₹${transaction.amount}
      </p>

      <p>
        Location:
        ${transaction.location}
      </p>

      <p>
        Risk Score:
        ${transaction.riskScore}%
      </p>

      <p>
        Severity:
        ${transaction.severity}
      </p>

    `

  };

  await transporter.sendMail(
    mailOptions
  );

};


module.exports =
  sendFraudAlert;