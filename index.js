const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //Iteration 2
    /*Recipe.create(data[0]).then(recipe => {console.log(recipe.title)
    })*/
    /*Recipe.create(data[0]).then(() => {
                console.log("Iteration 2: Document created")
    })*/

    //Iteration 3
    Recipe.insertMany(data)

    .then(recipes => recipes.forEach(recipe => {console.log(recipe.title)}))

    .catch(err => console.log(err))
    /*Recipe.insertMany(data).then(() => {
      Recipe.create(data[0]).then(recipe => {console.log(recipe.title)
      Recipe.find({},{title: 1, _id: 0})
         .then(recipes => {
           console.log("Iteration 3")
           console.log(recipes)
         })
         .catch(err => console.log(err))
    })*/
    //Iteration 4
    Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {duration: 100}
    ).then(
      console.log("Iteration 4: Success updating")
    ).catch(err => console.log(err))
    //Iteration 5
    Recipe.deleteOne(
      {title: 'Carrot Cake'}
    ).then(console.log("Iteration 5: Deleted successfully")).catch((err => console.log(err)))
      
  }).then(() => {
      //Iteration 6
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Iteration 6: Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  