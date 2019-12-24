//Step 1: Use mongoose library
const  mongoose = require('mongoose');

//Step 2: Connect to DB
const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/whatver')
}

//Step 3:Create Schema
const school = new mongoose.Schema({
    name:String
})

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
    },
    school:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'school'
    }    
},{timestamps:true}) //timestamps attribute gives createdAt & updatedAt; They dont come by default

//Step 4:Registered Schema as a collection called student(mongo will convert it into students) and then set as a Model
const School = mongoose.model('school',school);
const Student = mongoose.model('student',student);

//Step 5: Execute for setting up connection & in then create a mongoose Document
connect()
    .then(async connection => {

        /* Commit 1
        const studentObj = await Student.create({firstName : 'Tim'}) //Mongoose Document; Its not a JS object; It has many inumerable properties
        //Various fn available on the mongoose document
        const found = await Student.find({firstName: 'Time'});
        const foundById =  await Student.findById('xxx');
        const foundAndUpdated =  await Student.findByIdAndUpdate('xxx',{})
        const findAll = await Student.find({});
        console.log(studentObj); // In console log, we can see only properties that are inumerable
        */


        const schoolObj = await School.create({name : 'mlk elementry'}); //Mongoose Document; Its not a JS object; It has many non-inumerable properties which wont show up on console.log but can be accessed by pressing .
        /*ALTERNATE way
        const schoolObj = await School.findOneAndUpdate({name : 'mlk elementry'},{name:'mlk elementry'},{upsert:true, new: true}).exec();*/
        const studentObj = await Student.create({firstName : 'Trisha', school: schoolObj._id});
        const studentObj2 = await Student.create({firstName : 'Mark', school: schoolObj._id});
        const match = await Student.findById(studentObj.id)
            .populate('school') //By using populate, we get the referenced object'git stats data inside the queried object's result set
            .exec();
        console.log('match...' + match);
        const match2 = await Student.findOne({firstName: 'Trisha'}).exec();
        console.log('match2...' + match2);
        //const match3 = await Student.find({school: {type: schoolObj._id}}); //DOESNT WORK: Cast to ObjectId failed for value "{ type: 5e017af5dc2fe3062c0abb58 }" at path "school" for model "student"'
        const match3 = await Student.find({school: schoolObj._id}).exec();
        console.log('match3...' + match3); 

    })
    .catch(e => console.error(e))