const faker = require('faker');
const Post = require('./models/post');

async function seedPosts() {
    console.log('ASDFASDFASDFASDFASDFASDFASDFASDFSADASDFASD');
    // remove currentlt existing posts
    await Post.remove({});
    for(const i of new Array(40)) {
        const post = {
            title: faker.lorem.word(),
            description: faker.lorem.text(),
            author: {
                '_id' : '5d40aab18f0dc77cc4821b49',
                'username' : 'bob'
            }
        }
        await Post.create(post);
    }
    console.log('40 new posts created');
}

module.exports = seedPosts;