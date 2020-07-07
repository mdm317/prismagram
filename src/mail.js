const nodemailer = require('nodemailer');

const main = async () => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: "frethdilem@gmail.com",
        pass: "@eocjs604",
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `dbswh1008@gmail.com`,
      to: "dbswh1008@naver.com",
      subject: 'WDMA Auth Number',
      text: "dsafdf",
      html: `<b>"text"</b>`,
    });
    res.status(200).json({
      status: 'Success',
      code: 200,
      message: 'Sent Auth Email',
    });
  };
  
  main().catch(console.error);