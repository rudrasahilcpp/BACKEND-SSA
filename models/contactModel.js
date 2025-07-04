import mongoose from 'mongoose'

const contactSchema = mongoose.Schema({
    userID: {
        type : String,
        required : true
    },
    name : {
        type : String ,
        required : true
    },
    phone : {
        type : String , 
        required : true
    },
});

const Contact = mongoose.model('Contact' , contactSchema);
export default Contact;