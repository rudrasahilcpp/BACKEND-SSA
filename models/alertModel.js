import mongoose from "mongoose";

const alertSchema = mongoose.Schema({
    userID : {
        type : String,
        require : true
    },
    name: {
        type : String ,
        require : true
    },
    message : {
        type : String,
        require : true
    },
    tags : [String],
    contacts: [String],
    location: {
        latitude: {
            type: Number,
            default: null
        },
        longitude: {
            type: Number,
            default: null
        }
    },
    status: {
        type: String,
        enum: ['active', 'resolved'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Alert = mongoose.model("Alert" , alertSchema);
export default Alert;