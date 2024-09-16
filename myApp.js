require('dotenv').config();
let mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema
const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]

})

const Person = mongoose.model("Person", personSchema)

const createAndSavePerson = (done) => {

  let person1 = new Person({
    name: "Snehasish Mohanty",
    age: 22,
    favoriteFoods: ["Apple", "Banana"]

  })
  person1.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

let arrayOfPeople = [
  {
    name: "Snehasish",
    age: 22,
    favoriteFoods: ["Apple"]
  }
];


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, createdPeople) => {
    if (error) {
      console.log(error)
    } else {
      done(null, createdPeople)
    }
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  },function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  },function(err,foodFound){
    if(err) return console.log(err);
    done(null, foodFound)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({
    _id: personId
  },function(err,findId){
    if(err) return console.log(err);
    done(null, findId)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,person) => {
    if(err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);
    person.save((err,updatePerson) => {
      if(err) return console.log(err);
      done(null, updatePerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({
    name: personName
  },{
    age: ageToSet
  },{
    new: true
  },(err,updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,removePrId) => {

    if(err) return console.log(err);
    done(null,removePrId);
  })
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove},(err,removeName) => {
    if(err) return console.log(err);
    done(null,removeName);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 'asc'}).limit(2).select('-age')
      .exec( (err,searchResult) => {
        
        done(null,searchResult);
      })

  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
