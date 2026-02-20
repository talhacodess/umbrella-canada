import mongoose from "mongoose";
const Schema = mongoose.Schema;
const popupScheme = new Schema({
    name: {
        type: String,
        required: true, // Fixed typo from 'require'
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
       type: String,
       required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

// Use default export to match your controller import
export default mongoose.model('Popup', popupScheme);