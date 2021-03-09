// Require library
/* var xl = require('excel4node'); */
const express = require("express")
const fs = require('fs');
const csv = require('fast-csv');
const app = express();

const create = async (req, res) => {
    const data = req.body.ranking;

    app.use("/excels", express.static(__dirname + "/excels"));

    // first row
    let títulos = ["Descripcion", "Cantidad"]

    // data in matriz
    const getData = data.map(item => [item.description, String(item.quantity)]);
    getData.unshift(títulos);
    console.log("getData", getData);

    let ws = fs.createWriteStream("excels/ranking.csv");
    /* const filename = "excels/ranking.csv"
    res.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=' + filename
    }) */

    csv.write(getData, { headers: true })
        /* .on("finish", function () {
             res.send("<a href='/excels/ranking.csv' download='ranking.csv' id='download-link'></a> <script>document.getElementById('download-link').click();</script>");
        }) */
        .pipe(ws);
}

module.exports = {
    create,
}

/**
 *
 *
 // kill inside arrays of matriz
    let newMatriz = matriz.flat(2);
    console.log("newMatriz", newMatriz);

// Create a new instance of a Workbook class
var wb = new xl.Workbook();

// Add Worksheets to the workbook
var ws = wb.addWorksheet('Ranking Menus');

// Create a reusable style
var style = wb.createStyle({
    font: {
        color: '#171113',
        size: 10,
    }
});

let contador = 0;
for (let i = 1; i <= newMatriz.length / 2; i++) {
    for (let j = 1; j <= 2; j++) {
        ws.cell(i, j)
            .string(`${newMatriz[contador]}`)
            .style(style);
        contador += 1;
    }
}

wb.write('Ranking.xlsx', res);
 */