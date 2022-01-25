const {Schema, model} = require('mongoose');

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    description: { type: String },
    content: { type: String },
    image: { type: String },
    tags: { type: Schema.Types.ObjectId, ref: 'Tag', required: true }
}, {
    timestamps: true
});

module.exports = model('Article', schema);