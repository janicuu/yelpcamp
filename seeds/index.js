const mongoose = require('mongoose');
const cities = require('./cities');
const{places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', 
{useNewUrlParser: true,
useCreateIndex: true,
 useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i< 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60872ca0013aac2604a4ca7b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat autem laborum amet consequuntur ex fugiat harum, obcaecati minima iste vitae rerum quis cupiditate quibusdam illo tenetur alias accusantium dolores voluptates?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                            cities[random1000].longitude,
                            cities[random1000].latitude,
            ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/janicu/image/upload/v1619984510/YelpCamp/camp-1.jpg',
                    filename: 'camp-1'
                },
                {
                    url: 'https://res.cloudinary.com/janicu/image/upload/v1619986405/YelpCamp/camp-2.jpg',
                    filename: 'camp-2'
                },
                {
                    url: 'https://res.cloudinary.com/janicu/image/upload/v1619986406/YelpCamp/camp-3.jpg',
                    filename: 'camp-3'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

