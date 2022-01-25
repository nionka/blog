const tagsMock = require('../mock/tags.json');
const Tag = require('../models/Tag');

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (e) {
               return e;
            }
        })
    )
};

module.exports = async () => {
    const tags = await Tag.find();
    
    if (tags.length !== tagsMock.length) {
        await createInitialEntity(Tag, tagsMock);
    }
}
