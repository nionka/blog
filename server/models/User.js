const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: { type: String },
    email: { type: String , required: true },
    password: { type: String },
    image: { type: String },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
}, {
    timestamps: true
});

module.exports = model('User', schema);