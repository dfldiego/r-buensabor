const { response } = require('express');
const ProductCategory = require('../models/product-categories.model');

const list = async (req, res = response) => {
    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;

    try {
        const [productCategories, total] = await Promise.all([
            ProductCategory.find({ status: true })
                .skip(from)
                .limit(limit),
            ProductCategory.countDocuments({ status: true })
        ]);

        res.json({
            ok: true,
            productCategories,
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
    const { description } = req.body;

    console.log(description);

    try {

        if (description === '') {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        const existeDescription = await ProductCategory.findOne({ description });

        if (existeDescription) {
            if (existeDescription.status === true) {
                return res.status(400).json({
                    ok: false,
                    msg: "esa denominacion de categoria de insumos ya se encuentra registrada"
                });
            } else {
                const productCategory = new ProductCategory(req.body);
                productCategory._id = existeDescription._id;

                const productCategoryStored = await ProductCategory.findByIdAndUpdate(productCategory._id, productCategory, { new: true });

                return res.json({
                    ok: true,
                    msg: "categoria de insumo dado de alta nuevamente",
                    productCategoryStored
                });
            }
        }


        // crear una instancia del nuevo category
        const productCategory = new ProductCategory(req.body);

        // guardar category en la BD
        await productCategory.save();

        res.json({
            ok: true,
            productCategory
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

        // encontrar el ProductCategory con el id pasado por URL en la BD
        const categoryDB = await ProductCategory.findById(_id);
        //si la categoria buscado no existe
        if (!categoryDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una categoria con ese id'
            });
        }


        // el Category existe y queremos actualizarlo
        const { description, ...campos } = req.body;

        // verificamos que la descripcion del Category no exista en la BD
        if (categoryDB.description !== description) {
            // Category quiere modificar su descripcion.
            //Verificar que descripcion nueva no sea igual a otro.
            const descriptionExists = await ProductCategory.findOne({ description });
            if (descriptionExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una categoria con esa descripcion'
                });
            }
        }
        // debemos colocar la description que queremos actualizar
        campos.description = description;

        const categoriaProductoActualizada = await ProductCategory.findByIdAndUpdate(_id, campos, { new: true });

        res.json({
            ok: true,
            medico: categoriaProductoActualizada
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

    ProductCategory.findByIdAndUpdate(id, changeStatus, { new: true }, (err, ProductCategoryDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ProductCategoryDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria insumo no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            ProductCategory: ProductCategoryDeleted
        });
    });
}

module.exports = {
    list,
    create,
    update,
    remove
}