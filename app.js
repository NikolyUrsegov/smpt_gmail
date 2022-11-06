const express = require("express");
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express();
// const whitelist = ['http://localhost:3000', 'https://ttktest.vercel.app/']; //white list consumers
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(null, false);
//         }
//     },
//     methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
//     optionsSuccessStatus: 200,
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
// };
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smpt_login = process.env.SMPT_LOGIN || '---'
let smpt_password = process.env.SMPT_PASSWORD || '---'


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smpt_login,
        pass: smpt_password,
    },
});

app.get("/", function (request, response) {
    response.send('ok')
});

app.post("/sendMessage", async function (request, response) {

    const {name, phone, email, comments, INN} = request.body

    await transporter.sendMail({
        from: name,
        to: "ursegovnikolaj@gmail.com",
        subject: "ТТК",
        html: `<h2>Сообщение с TTK</h2>
<div><b>Имя: </b> <span>${name}</span></div>
<div><b>Телефон: </b> <span>${phone}</span> </div>
<div><b>Email: </b> <span>${email}</span></div>
<div><b>ИНН: </b> <span>${INN || 'Клиент не оставил ИНН'}</span></div>
<div><b>Коментарий: </b> <span>${comments || 'Клиент не оставил комментария'}</span></div>
`,
    });
    response.send('ok')
});

let PORT = process.env.PORT || 3010

app.listen(PORT, () => console.log('start'));