const mongoose = require('mongoose');
const Campsite = require('./models/campsite'); // import model Campsite

const url = 'mongodb://localhost:27017/nucampsite';

// connect to mongodb with added function compared with mongoclient driver
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then(() => {

  console.log('Connected correctly to the server');

  Campsite.create({
    name: 'React Lake Campground',
    description: 'test'
  })
  .then(campsite => {
    console.log(campsite);

    return Campsite.findByIdAndUpdate(campsite._id, {
      $set: { descriptions: 'Updated Test Document'}
    }, {
      new: true // causes this method to return the updated document otherwise will return the old docuent
    });
  })
  .then(campsite => {
    console.log(campsite);

    campsite.comments.push({
      rating: 5,
      text: 'What a magnificent view',
      author: 'Tinus Lorvaldes'
    });

    return campsite.save();
  })
  .then(campsite => {
    console.log(campsite);
    return Campsite.deleteMany();
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });
});