const {Schema, model} = require('mongoose');

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    content: { type: String },
    image: { type: String }
}, {
    timestamps: true
});

module.exports = model('Article', schema);