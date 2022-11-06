const express = require("express");
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')



const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
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

app.get("/", function(request, response){
    response.send('ok')
});

app.post("/sendMessage", async function(request, response){

    const {name, phone, email, comments, INN} = request.body

//     let info = await transporter.sendMail({
//         from: name,
//         to: "ursegovnikolaj@gmail.com",
//         subject: "test1",
//         html: `<h2>Сообщение с TTK</h2>
// <div><b>Имя: </b> </div>
// <div><b>Телефон: </b> <span>${phone}</span> </div>
// <div><b>Email: </b> <span>${email}</span></div>
// <div><b>ИНН: </b> <span>${INN}</span></div>
// <div><b>Коментарий: </b> <span>${comments}</span></div>
// `,
//     });
    response.send(request)
});

let PORT = process.env.PORT || 3010

app.listen(PORT, () => console.log('start'));