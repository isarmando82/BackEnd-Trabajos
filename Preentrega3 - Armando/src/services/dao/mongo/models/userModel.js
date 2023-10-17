import mongoose from 'mongoose';

const colleccionName = 'users';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    logedBy: String,
    role:{
        type: String,
        default: 'user',
        enum : ['user', 'admin']
    },
    carts:{
        type:[
            {
                cart:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'carts'
                },
            }
        ],
        default: [],
    }
})

schema.pre('findOne', function() {
    this.populate('carts.cart');
})

const userModel = mongoose.model(colleccionName, schema);

export default userModel;