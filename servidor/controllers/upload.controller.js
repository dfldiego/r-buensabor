const { response } = require('express');
const User = require('../models/user.model');
const Menu = require('../models/menu.model');
const MenuCategories = require('../models/menu-categories.model');
const ProductCategories = require('../models/product-categories.model');
const fs = require('fs');
const path = require('path');

const upload = async (req, res = response) => {

    // req.files contiene cada uno de los file que subamos.
    // Object.keys es para validar si el objeto esta vacio.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No se ha seleccionado ningún archivo",
        });
    }

    //validamos los modelos que tendrán imagenes.(validamos las carpetas)
    //estas serán carpetas dentro de la carpeta upload
    let type = req.params.type;
    let id = req.params.id;
    const validTypes = ['users', 'menus', 'menu-categories', 'product-categories'];
    if (validTypes.indexOf(type) < 0) {
        return res.json({
            ok: true,
            msg: 'Los tipos permitidos son ' + validTypes.join(', '),
        });
    }

    // vamos a tener en cuanta una sola imagen llamada file.
    let sampleFile = req.files.file;
    let fileName = sampleFile.name;
    let fileNameSplit = fileName.split('.');
    let fileExtension = fileNameSplit[fileNameSplit.length - 1];

    //validamos extensiones
    const validExtensions = ['png', 'jpg'];
    if (validExtensions.indexOf(fileExtension) < 0) {
        return res.json({
            ok: true,
            msg: 'Las extensiones permitidas son ' + validExtensions.join(', '),
        });
    }

    let fileNameToSave = `${id}-${new Date().getMilliseconds()}.${fileExtension}`;
    let pathToSave = `uploads/${type}/${fileNameToSave}`;

    //mv: para guardar archivo
    sampleFile.mv(pathToSave, (err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // validamos que exista el registro respecto al type seleccionado
        // debemos hacer un put en el registro para actualizarle un img
        let collection = null;
        switch (type) {
            case 'users':
                collection = User;
                break;
            case 'menus':
                collection = Menu;
                break;
            case 'menu-categories':
                collection = MenuCategories;
                break;
            case 'product-categories':
                collection = ProductCategories;
                break;
            default:
                break;
        }

        //datos del upload a actualizar
        const genericUpload = {
            id,
            res,
            fileNameToSave,
            model: collection,
            folder: type
        };
        // agregar imagen al objeto de la coleccion.
        addImageToObject(genericUpload);
    });
};

function addImageToObject(upload) {
    upload.model.findById(upload.id, (err, objectDB) => {
        if (err) {
            deleteImg(upload.folder, upload.fileNameToSave);
            return upload.res.status(500).json({
                ok: false,
                err
            });
        }

        if (!objectDB) {
            deleteImg(upload.folder, upload.fileNameToSave);
            return upload.res.status(400).json({
                ok: false,
                msg: 'Objeto no existe con ese id: ' + upload.id,
            });
        }
        deleteImg(upload.folder, objectDB.img);

        objectDB.img = upload.fileNameToSave;

        objectDB.save((err, objectStored) => {
            return upload.res.json({
                ok: true,
                result: objectStored
            });
        });
    });
}

function deleteImg(type, fileName) {

    let pathImage = path.resolve(__dirname, `../uploads/${type}/${fileName}`);
    if (fs.existsSync(pathImage)) {

        fs.unlinkSync(pathImage);
    }
}

module.exports = {
    upload
}