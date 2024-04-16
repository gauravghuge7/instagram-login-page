import mongoose from 'mongoose';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const { Schema} = mongoose;

const userSchema =  mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "name must be required"],
        minLen: [5,'name must be greater than 5 character']
    },

    username: {

        type: String,
        unique: true,
        required: true,
        
    },

    email: {
        type: String,
        unique: true,
        required: [true, "email must be required"],
        trim: true,
        index: true
    },

    password: {
        type: String,
        required: true,
        select: false,

    },
    bio: {
        type: String,
        required: true,
        maxLen: [300, " bio must be less than 300 character "]
    }

}, {timestamps: true})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            {expiresIn: '24h'}
        )
    }
}


export const userModel = mongoose.model("User", userSchema);