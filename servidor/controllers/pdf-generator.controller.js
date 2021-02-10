const pdf = require('html-pdf');
const OrderDetail = require('../models/order-detail.model');
const Order = require('../models/order.model');
const emailController = require('../controllers/email.controller');

const create = async (req, res) => {
    let body = req.body;

    let filterByOrder = {
        order: body.order
    };

    /**
     * Consulto un Pedido por su id.
     * Hago un populate de user para obtener tmb name e email.
     */
    const order = await Order.findById(body.order).populate('user', 'name email');

    /**
     * Consulto:
     * Todos los detalles asociados a una orden(pedido)
     * Hago un populate de menu y product xq necesito esos datos para la factura
     */
    OrderDetail.find(filterByOrder)
        .populate('menu', 'description price')
        .populate('product', 'description price')
        .exec((err, ordersDetail) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            /**
             * llamo metodo getContent(detalles del pedido, el pedido)
             *  .toFile() crea un pdf en pdfs folder 
             * El controlador de facturacion crea el billNumber
             */
            pdf.create(getContent(ordersDetail, order))
                .toFile('./pdfs/' + body.billNumber + '.pdf', (err, resPDF) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }

                    /**
                     *  le agrego al request una propiedad pdf con la response del pdf si se creó bien. 
                     */
                    req.body.pdf = resPDF;
                    /**
                     * Desde pdfController llamamos a emailController.
                     * 1)se ejecuta billController(crea una factura)
                     * 2)se ejecuta pdfController(genera un pdf)
                     * 3)se ejecuta emailController con response final.(envia un mail)
                     */
                    emailController.send(req, res);
                });
        });
};

var total = 0.0;

function getContent(details, order) {
    return `
    <style>
         html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:1.8em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:0.9em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{-moz-box-sizing:border-box;box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}html{font-size:10px;line-height:1.5;color:#000;background:#ddd;-moz-box-sizing:border-box;box-sizing:border-box}.container{max-width:800px;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}*,*:before,*:after{-moz-box-sizing:inherit;box-sizing:inherit}[contenteditable]:hover,[contenteditable]:focus,input:hover,input:focus{background:rgba(241,76,76,.1);outline:1px solid #009688}.group:after,.row:after,.invoicelist-footer:after{content:"";display:table;clear:both}a{color:#009688;text-decoration:none}p{margin:0}.row{position:relative;display:block;width:100%;font-size:0}.col,.logoholder,.me,.info,.bank,[class*=col-]{vertical-align:top;display:inline-block;font-size:1rem;padding:0 1rem;min-height:1px}.col-4{width:25%}.col-3{width:33.33%}.col-2{width:50%}.col-2-4{width:75%}.col-1{width:100%}.text-center{text-align:center}.text-right{text-align:right}.control-bar{position:fixed;top:0;left:0;right:0;z-index:100;background:#009688;color:#fff;line-height:4rem;height:4rem}.control-bar .slogan{font-weight:700;font-size:1.1rem;display:inline-block;margin-right:2rem}.control-bar label{margin-right:1rem}.control-bar a{margin:0;padding:.5em 1em;background:rgba(255,255,255,.8)}.control-bar a:hover{background:#fff}.control-bar input{border:none;background:rgba(255,255,255,.2);padding:.5rem 0;max-width:30px;text-align:center}.control-bar input:hover{background:rgba(255,255,255,.3)}.hidetax .taxrelated{display:none}.showtax .notaxrelated{display:none}.hidedate .daterelated{display:none}.showdate .notdaterelated{display:none}header{margin:1rem 0 0;padding:0 0 2rem;border-bottom:3pt solid #009688}header p{font-size:.8rem}header a{color:#000}.logo{margin:0 auto;width:auto;height:auto;border:none;fill:#009688}.logoholder{width:14%}.me{width:30%}.info{width:30%}.bank{width:26%}.section{margin:2rem 0 0}.smallme{display:inline-block;text-transform:uppercase;margin:0 0 2rem;font-size:.8rem}.client{margin:0 0 3rem}h1{margin:0;padding:0;font-size:1.7rem;color:#009688}.details input{display:inline;margin:0 0 0 .5rem;border:none;width:50px;min-width:0;background:0 0;text-align:left}.invoice_detail{border:solid 1px #009688;padding:10px;height:25px;text-align:center}.rate:before,.price:before,.sum:before,.tax:before,#total_price:before,#total_tax:before{content:'$'}.invoicelist-body{margin:1rem}.invoicelist-body table{width:100%}.invoicelist-body thead{text-align:left;border-bottom:1pt solid #666}.invoicelist-body td,.invoicelist-body th{position:relative;padding:1rem}.invoicelist-body tr:nth-child(even){background:#ccc}.invoicelist-body tr:hover .removeRow{display:block}.invoicelist-body input{display:inline;margin:0;border:none;width:80%;min-width:0;background:0 0;text-align:left}.invoicelist-body .control{display:inline-block;color:#fff;background:#009688;padding:3px 7px;font-size:.8rem;text-transform:uppercase;cursor:pointer}.invoicelist-body .control:hover{background:#f36464}.invoicelist-body .newRow{margin:.5rem 0;float:left}.invoicelist-body .removeRow{display:none;position:absolute;top:.1rem;bottom:.1rem;left:-1.3rem;font-size:.6rem;border-radius:3px 0 0 3px;padding:.5rem}.invoicelist-footer{margin:1rem}.invoicelist-footer table{float:right;width:25%}.invoicelist-footer table td{padding:1rem 2rem 0 1rem;text-align:right}.invoicelist-footer table tr:nth-child(2) td{padding-top:0}.invoicelist-footer table #total_price{font-size:1.7rem;color:#009688}.note{margin:1rem}.hidenote .note{display:none}.note h2{margin:0;font-size:.9rem;font-weight:700}footer{display:block;margin:1rem 0;padding:1rem 0 0}footer p{font-size:.7rem}@media print{html{margin:0;padding:0;background:#fff}body{width:100%;border:none;background:#fff;color:#000;margin:0;padding:0}.control,.control-bar,.ads{display:none!important}[contenteditable]:hover,[contenteditable]:focus{outline:none}}
    </style>
    
    <header class="row">
        <div class="logoholder text-center">
            <img src="data:image/png;base64,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" width="60" height="60">
        </div>
        <div class="me">
            <p>
                <strong>El buen sabor</strong><br> Aristides 234<br> Mendoza.<br>
            </p>
        </div>
        <div class="info">
            <p>
                Web: <a href="https:gooogle.com/">www.elbuensabor.com</a><br> E-mail: <a href="mailto:info@obedalvarado.pw">info@elbuensabor.com</a><br> Tel: +456-345-908-559<br> Twitter: @alvarado_obed
            </p>
        </div>
        <div class="bank">
            <p>
                Datos bacarios: <br> Titular de la cuenta: <br> IBAN: <br> BIC:
            </p>
        </div>
    </header>
    <div class="row section">
        <div class="col-2">
            <h1>Factura</h1>
        </div>
        <div class="col-2 text-right details">
            <p>
                Fecha: <input type="text" class="datePicker"><br> Factura #: <input type="text" value="100"><br> Vence: <input class="twoweeks" type="text">
            </p>
        </div>
        <div class="col-2">
            <p class="client">
                <strong>Facturar a</strong><br> ${order.user.name}<br> XXXB<br> Paso de los Andes 87<br> 454576
            </p>
        </div>
        <div class="col-2">
            <p class="client">
                <strong>Enviar a</strong><br> ${order.user.name}<br> XXXB<br> Paso de los Andes 87<br> 454576
            </p>
        </div>
    </div>
    <div class="row section" style="margin-top:-1rem">
        <div class="col-1">
            <table style="width:100%">
                <thead>
                    <tr class="invoice_detail">
                        <th width="25%" style="text-align">Vendedor</th>
                        <th width="25%">Orden de compra </th>
                        <th width="20%">Enviar por</th>
                        <th width="30%">Términos y condiciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="invoice_detail">
                        <td width="25%" style="text-align">El buen sabor</td>
                        <td width="25%">#PO-2020 </td>
                        <td width="20%">DHL</td>
                        <td width="30%">Pago al contado</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="invoicelist-body">
        <table>
            <thead>
                <tr>
                    <th width="5%">Código</th>
                    <th width="60%">Descripción</th>
                    <th width="10%">Cant.</th>
                    <th width="15%">Precio</th>
                    <th width="10%">Total</th>
                </tr>
            </thead>
            <tbody>
            ${generateDetail(details)}
            </tbody>
        </table>
    </div>
    <div class="invoicelist-footer">
        <table>
            <tbody>
                <tr>
                    <td><strong>Total:</strong></td>
                    <td id="total_price">${total}</td>
                </tr>
            </tbody>
        </table>
    </div> `;
}

/**
 * 
 * aqui se generan los items dinamicamente por cada detalle del pedido
 */
function generateDetail(details) {
    let result = "";
    /**
     * Un detalle de pedido: puede ser un menu o un insumo.
     */
    for (const detail of details) {
        let description = detail.menu == undefined ? detail.product.description : detail.menu.description;
        let price = detail.menu == undefined ? detail.product.price : detail.menu.price;
        result +=
            `<tr>
                <td>${detail._id}</td>
                <td>${description}</td>
                <td>${detail.quantity}</td>
                <td>${price}</td>
                <td>${detail.subTotal}</td>
            </tr>`
        total += detail.subTotal;
    }
    return result;
}

module.exports = {
    create
};