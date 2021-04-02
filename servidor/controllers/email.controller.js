require('dotenv').config();
const nodemailer = require('nodemailer');
const Configuration = require('../models/configuration.model');
const path = require('path');

// envio de email
// solo tiene un metodo de envio
const send = async (req, res) => {
    const body = req.body;
    //findOne xq sabemos que configuracion solo tendrá un solo registro
    Configuration.findOne((err, config) => {
        console.log("config:email", config);
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        //autenticacion con correo de la empresa.
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.email,
                pass: config.password
            }
        });
        /**
         * from: desde donde se envia el email
         * to: a quien se le envia el email
         * attachments para mandar archivos en el mail (pdf-factura)
         *      filename: nombre archivo
         *      path: xq tenemos una pdfs folder (enviamos la direccion del folder)
         */

        let mailOptions = {
            from: config.email,
            to: body.clientEmail,
            subject: 'Comprobante de compra El buen sabor',
            text: 'Gracias por su compra.',
            attachments: [{
                filename: body.billNumber + '.pdf',
                path: path.resolve(__dirname, `../pdfs/${body.billNumber}.pdf`),
                contentType: 'application/pdf'
            }],
        };
        /**
         * sendMail(): metodo para enviar un email
         */
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error:",error.message);
                return res.json({
                    ok: false,
                    error
                });
            }
            return res.json({
                ok: true,
                detail: 'Email sent: ' + info.response,
                message: 'Se envió la factura correctamente'
            });
        });
    });
};

module.exports = {
    send
}