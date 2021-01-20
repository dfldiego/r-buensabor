const { response } = require('express');
const MenuCategory = require('../models/menu-categories.model');

const list = async (req, res = response) => {

    try {
        const [categories, total] = await Promise.all([
            MenuCategory.find({ status: true }),
            MenuCategory.countDocuments({ status: true })
        ]);
        console.log(categories);
        res.json({
            ok: true,
            categories,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

const create = async (req, res = response) => {
    const { name } = req.body;
    console.log(name);
    try {

        if (name === '') {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        const existeName = await MenuCategory.findOne({ name });

        if (existeName) {
            if (existeName.status === true) {
                return res.status(400).json({
                    ok: false,
                    msg: "esa denominacion de categoria de menu ya se encuentra registrada"
                });
            } else {
                const menuCategory = new MenuCategory(req.body);
                menuCategory._id = existeName._id;

                const menuCategoryStored = await MenuCategory.findByIdAndUpdate(menuCategory._id, menuCategory, { new: true });

                return res.json({
                    ok: true,
                    msg: "categoria de menu dado de alta nuevamente",
                    menuCategoryStored
                });
            }
        }


        // crear una instancia del nuevo category
        const category = new MenuCategory(req.body);

        // guardar category en la BD
        await category.save();

        res.json({
            ok: true,
            category
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

const update = async (req, res = response) => {
    //obtenemos el id que viene por URL
    const _id = req.params.id;
    try {

        // encontrar el MenuCategory con el id pasado por URL en la BD
        const categoryDB = await MenuCategory.findById(_id);
        //si la categoria buscado no existe
        if (!categoryDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una categoria con ese id'
            });
        }


        // el Category existe y queremos actualizarlo
        const { name, ...campos } = req.body;

        // verificamos que la descripcion del Category no exista en la BD
        if (categoryDB.name !== name) {
            // Category quiere modificar su descripcion.
            //Verificar que descripcion nueva no sea igual a otro.
            const nameExists = await MenuCategory.findOne({ name });
            if (nameExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una categoria con esa descripcion'
                });
            }
        }
        // debemos colocar la description que queremos actualizar
        campos.name = name;

        const categoriaActualizada = await MenuCategory.findByIdAndUpdate(_id, campos, { new: true });

        res.json({
            ok: true,
            menuCategory: categoriaActualizada
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

    MenuCategory.findByIdAndUpdate(id, changeStatus, { new: true }, (err, MenuCategoryDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!MenuCategoryDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria menu no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            MenuCategory: MenuCategoryDeleted
        });
    });
};

const search = async (req, res) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;

    let search = req.params.words;
    let regExWords = new RegExp(search, 'i');

    let conditionSearch = {
        status: true
    }

    if (search != 'undefined') {
        conditionSearch = {
            name: regExWords,
            status: true
        }
    }

    try {
        const [menuCategories, total] = await Promise.all([
            MenuCategory.find(conditionSearch)
                .skip(from)
                .limit(limit),
            MenuCategory.countDocuments(conditionSearch)
        ]);

        res.json({
            ok: true,
            menuCategories,
            total,
            limit,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
}


module.exports = {
    list,
    create,
    update,
    remove,
    search,
}