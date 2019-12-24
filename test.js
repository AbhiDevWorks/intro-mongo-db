//Step 1: Use mongoose library
const  mongoose = require('mongoose');

//Step 2: Connect to DB
const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/whatver')
}

//Step 3:Create Schema
const student = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        unique: true
    },
    faveFoods: [{type: String}],
    info: {
        school: {
            type: String
        }, shoeSize: {
            type: Number
        }
    }
},{timestamps:true}) //timestamps attribute gives createdAt & updatedAt; They dont come by default

//Step 4:Registered Schema as a collection called student(mongo will convert it into students) and then set as a Model
const Student = mongoose.model('student',student);

//Step 5: Execute for setting up connection & in then create a mongoose Document
connect()
    .then(async connection => {
        const studentObj = await Student.create({firstName : 'Tim'}) //Mongoose Document; Its not a JS object; It has many inumerable properties
        //Various fn available on the mongoose document
        const found = await Student.find({firstName: 'Time'});
        const foundById =  await Student.findById('xxx');
        const foundAndUpdated =  await Student.findByIdAndUpdate('xxx',{})
        const findAll = await Student.find({});
        console.log(studentObj); // In console log, we can see only properties that are inumerable
    })
    .catch(e => console.error(e))