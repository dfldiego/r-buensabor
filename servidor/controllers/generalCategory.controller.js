const { response } = require('express');
const GeneralCategory = require('../models/GeneralCategory.model');

const list = async (req, res = response) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;

    try {
        const [categories, total] = await Promise.all([
            GeneralCategory.find({ status: true })
                .skip(from)
                .limit(limit),
            GeneralCategory.countDocuments({ status: true })
        ]);

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

    try {

        const existeName = await GeneralCategory.findOne({ name });
        if (existeName) {
            return res.status(400).json({
                ok: false,
                msg: "esa denominacion ya se encuentra registrada"
            });
        }
        if (name === '') {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        // crear una instancia del nuevo category
        const category = new GeneralCategory(req.body);

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

        // encontrar el GeneralCategory con el id pasado por URL en la BD
        const categoryDB = await GeneralCategory.findById(_id);
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
            const nameExists = await GeneralCategory.findOne({ name });
            if (nameExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una categoria con esa descripcion'
                });
            }
        }
        // debemos colocar la description que queremos actualizar
        campos.name = name;

        const categoriaActualizada = await GeneralCategory.findByIdAndUpdate(_id, campos, { new: true });

        res.json({
            ok: true,
            medico: categoriaActualizada
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

    try {

        const categoryDB = await GeneralCategory.findById(id);

        if (!categoryDB) {
            return res.status(404).json({
                ok: true,
                msg: 'categoria no encontrada por id',
            });
        }

        await GeneralCategory.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Categoria borrada'
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

module.exports = {
    list,
    create,
    update,
    remove,
}