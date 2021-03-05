// Require library
var xl = require('excel4node');

const create = async (req, res) => {
    const data = req.body.ranking;
    console.log("req.body.ranking", req.body.ranking);

    //transformar un array de objetos ==> un array de array(matriz) para poder recorrer 2 for.
    let matriz = [];

    // first row
    let títulos = ["Descripcion", "Cantidad"]
    matriz.unshift(títulos);

    // data in matriz
    const getData = data.map(item => [item.description, item.quantity]);
    matriz.push(getData);

    // kill inside arrays of matriz
    let newMatriz = matriz.flat(2);

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
}

module.exports = {
    create,
}