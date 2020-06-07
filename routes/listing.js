const router = require('express').Router();
let Listing = require('../models/listing.model');

router.route('/').get((req, res) => {
    Listing.find()
        .then(listings => res.json(listings))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const email = req.body.email;
    const description = req.body.description;
    const price = req.body.price;
    const name = req.body.name;
    const sample_img = req.body.sample_img;
    const images = [];

    const newListing = new Listing({ title: title, email: email, description: description, price: price, completed: false, name: name, sample_img: sample_img, images: images });

    newListing.save()
        .then(() => res.json('Listing added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
    Listing.findById(req.params.id)
        .then(listing => res.json(listing))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Listing.findById(req.params.id)
        .then(listing => {
            listing.images = [...listing.images, ...req.body.images];
            listing.completed = req.body.completed;

            listing.save()
                .then(() => res.json('Listing updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;