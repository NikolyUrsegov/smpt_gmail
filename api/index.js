const express = require("express");
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')



const app = express();
app.use(cors())
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

    let info = await transporter.sendMail({
        from: 'test1',
        to: "ursegovnikolaj@gmail.com",
        subject: "test1",
        html: "<b>test1</b>",
    });
    response.send('ok')
});

let PORT = process.env.PORT || 3010

app.listen(PORT, () => console.log('start'));