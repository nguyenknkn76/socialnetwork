const postsRouter = require('express').Router()
const SocialPost = require("social-post-api");
const Post = require("../models/postModel")
const usersRouter = require('./UsersRouter');



const getPostData = (description, title, platforms) => {
    return {
        post: description,  // Assuming 'post' is expecting the description/content of the post
        shorten_links: true,
        title: title,
        platforms: platforms,
        redditOptions: {
            title: title,
            subreddit: "test"  // Modify this as needed for your actual subreddit
        }
    };
};


const run = async () => {
    for (let i = 0; i < postTitles.length; i++) {
        const content = getPostData(i);
        const json = await social.post(content).catch(console.error);
        console.log(json);
    }
}

const combinePostTitleAndContent = (titles, contents) => {
    const length = Math.min(titles.length, contents.length);
    return titles.slice(0, length).map((title, index) => `${title} - ${contents[index]}`);
}


const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

const createPostObjects = (titles, contents) => {
    const combinedPosts = combinePostTitleAndContent(titles, contents);
    return combinedPosts.map(postContent => ({
        id: generateId(),
        content: postContent
    }));
};

postsRouter.get('/', async(req,res) => {
    const posts = await Post.find({})
    res.json(posts) 
})

postsRouter.get('/:id', async (req,res) => {
    const post = await Post.findById(req.params.id)
    res.json(post)
})

postsRouter.post('/', async (req,res) => {
    const {title,content} = req.body
    const post = new Post({
        title,
        content
    })
    const savedPost = await post.save()
    res.status(201).json(savedPost)
})

postsRouter.post('/upload', async (req, res) => {
    const {selectedPlatforms, selectedPosts, selectedUser , apikey} = req.body
    const results = []; // Store results of API calls
    const social = new SocialPost(apikey);
    console.log(selectedPlatforms)
    const processedPosts = selectedPosts.map(post => {
        const [title, ...descriptionParts] = post.content.split(' - ');
        const description = descriptionParts.join(' - ') // Re-join in case there are multiple hyphens
        return {
            id: post.id,
            title: title.trim(),
            description: description.trim()
        }
    })
    console.log("processdPosts", processedPosts)
    const run = async () => {
        for (let i = 0; i < processedPosts.length; i++) {
            const post = processedPosts[i];
            const content = getPostData(post.description, post.title, selectedPlatforms)
            // const json = await social.post(content).catch(console.error);
            // console.log(json);
            
            try {
                const json = await social.post(content);
                console.log("json", json)
                results.push({...json, status: 'success'}); // Append success status
            } catch (error) {
                console.error(error);
                results.push({ error: true, message: error.message, status: 'error' }); // Append error status
            }  
        }
        console.log(results)
        res.json(results)
    }
    run()
})

module.exports = postsRouter