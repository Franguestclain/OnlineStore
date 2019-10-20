const express = require('express');
const multer = require('multer');
const router = express.Router();
const auth = require('../../middleware/auth');

const Item = require('../../models/Item');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/img/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });


// @route   GET api/items
// @desc    Get All items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
    .sort({nombre: -1})
    .then(item => {
        res.send(item);
        console.log(item);
    });
});


// @route   GET api/items/:id
// @desc    Get an item
// @access  Public
router.get('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => res.send(item));
});

// @route   POST api/items
// @desc    POST an item
// @access  Private
router.post('/', auth, upload.any(), (req, res) => {
    let imagenes = req.files.map( item => ({
            path: item.path,
            originalName: item.originalname
        }));
    let newItem = new Item({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        oferta: {
            activada: req.body.oferta,
            valor: req.body.valorOferta
        },
        imagenes
    });

    newItem.save().then(item => res.json(item));
});


module.exports = router;