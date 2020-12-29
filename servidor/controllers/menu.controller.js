const response = require('express');
const Menu = require('../models/menu.model');
const MenuDetail = require('../models/menu-details.model');

const list = async (req, res = response) => {

    const menus = await Menu.find({ status: true })
        .populate('category', 'name')
    res.json({
        ok: true,
        menus
    });
}

const create = async (req, res = response) => {
    const { description } = req.body;

    try {
        const existeDescription = await Menu.findOne({ description });
        if (existeDescription) {
            if (existeDescription.status === true) {
                return res.status(400).json({
                    ok: false,
                    msg: "ese menu ya se encuentra registrado"
                });
            } else {
                const menu = new Menu(req.body);
                menu._id = existeDescription._id;

                const menuStored = await Menu.findByIdAndUpdate(menu._id, menu, { new: true });

                return res.json({
                    ok: true,
                    msg: "menu dado de alta nuevamente",
                    menuStored
                });
            }
        }

        // creo un menu nuevo
        const menu = new Menu(req.body);

        // guardo el nuevo menu en la DB
        const menuDB = await menu.save();

        res.json({
            ok: true,
            menu: menuDB
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            err,
        });
    }

}

const getById = async (req, res) => {
    let menuId = req.params.id;

    Menu.findById(menuId).exec((err, menu) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let menuSearchData = {
            menu: menuId
        };

        MenuDetail.find(menuSearchData, { status: true })
            .populate('product', 'description')
            .exec((errr, ingredients) => {
                if (errr) {
                    return res.status(500).json({
                        ok: false,
                        errr
                    });
                }




                res.json({
                    ok: true,
                    menu,
                    ingredients
                });
            });
    });
};

const update = async (req, res = response) => {

    //obtenemos el id que viene por URL
    const _id = req.params.id;
    try {

        // encontrar el menu con el id pasado por URL en la BD
        const menuDB = await Menu.findById(_id);
        //si el usuario buscado no existe
        if (!menuDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un menu con ese id'
            });
        }


        // el menu existe y queremos actualizarlo
        const { description, ...campos } = req.body;

        // verificamos que la descripcion del menu no exista en la BD
        if (menuDB.description !== description) {
            // menu quiere modificar su descripcion. 
            //Verificar que descripcion nueva no sea igual a otro.
            const existeDescripcion = await Menu.findOne({ description });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un menu con esa descripcion'
                });
            }
        }
        // debemos colocar la description que queremos actualizar
        campos.description = description;

        const menuActualizado = await Menu.findByIdAndUpdate(_id, campos, { new: true });

        res.json({
            ok: true,
            medico: menuActualizado
        })

    } catch (err) {
        console.log(err);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const remove = async (req, res = response) => {
    const id = req.params.id;
    let changeStatus = {
        status: false
    };
    try {

        const menuDB = await Menu.findById(id);

        if (!menuDB) {
            return res.status(404).json({
                ok: true,
                msg: 'menu no encontrado por id',
            });
        }

        Menu.findByIdAndUpdate(id, changeStatus, { new: true }, (err, menuDeleted) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Menu borrado',
                menu: menuDeleted
            });
        });


    } catch (err) {

        console.log(err);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    list,
    create,
    getById,
    update,
    remove,
}