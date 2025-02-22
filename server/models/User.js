const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        firstName: {
            type: String,
            required: true,
            unique: false,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            unique: false,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        wallet: {
            type: Number,
            default: 0
        },
        resources: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Resource'
            }
        ],
        paidResources: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Resource'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// Middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('resourceCount').get(function() {
    return this.resources.length;
});

const User = model('User', userSchema);

module.exports = User;
