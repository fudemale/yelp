
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true, no longer required in the updated mongoose
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = function sample(array) {
    return array[Math.floor(Math.random() * array.length)]
}

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            /// Your User ID
            author: '64ce4458d013bdd388f7c4f9',
            location: `${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dve5sptai/image/upload/v1691943872/YelpCamp/kjxmktdrhtt00isnrtfs.jpg',
                    filename: 'YelpCamp/kjxmktdrhtt00isnrtfs',
                },
                {
                    url: 'https://res.cloudinary.com/dve5sptai/image/upload/v1691943874/YelpCamp/b0u0vo5ebyo46af8nyzr.jpg',
                    filename: 'YelpCamp/b0u0vo5ebyo46af8nyzr',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum consequatur molestias iure eos distinctio dolorum ipsum earum eum. Vero et unde esse atque libero? Facilis inventore recusandae numquam sunt nihil.',
            price,
            geometry: { type: 'Point', 
            coordinates: [ 
                cities[random1000].longitude,
                cities[random1000].latitude,
            ] }

        })
        await camp.save();

    }


}

seedDB().then(() => {
    mongoose.connection.close();
})