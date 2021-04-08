const Product = require('../models/category.model.js');

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }
    const product = new Product({
        title: req.body.title, 
        category_name: req.body.category_name,
        createdAt: new Date(),
        updatedAt: new Date(),
    "category_details": [
        {
            product_name: req.body.product_name,
            quantity: req.body.quantity,
            price: req.body.price,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]
        });

    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while inserting the product."
        });
    });
};

//This method used to find latest 3 records.
exports.findAll = (req, res) => {
    Product.find().sort({"updatedAt": -1}).limit(3)
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    Note.findByIdAndUpdate(req.params.Id, {
        category_name: req.body.category || "Untitled Note",
        updatedAt : new Date()
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.Id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Error updating Product with id " + req.params.Id
        });
    });
};

exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.Id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with Id " + req.params.Id
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'Category' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with Id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with Id " + req.params.Id
        });
    });
};