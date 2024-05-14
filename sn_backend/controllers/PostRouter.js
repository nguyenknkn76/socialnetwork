const postsRouter = require('express').Router()
const SocialPost = require("social-post-api");
const usersRouter = require('./UsersRouter');

const social = new SocialPost("RQTDH4Z-JYBMP53-KMD8M5D-ZNVQ8XN");

// Define post titles and contents
const postTitles = [
    "Win a Trip to Space!",
    "Ultimate Gamer Giveaway!",
    // "Fitness Frenzy Contest!",
    // "Tech Lover's Dream!",
    // "Baker's Delight Challenge!",
    // "Fashionista's Wardrobe Update!",
    // "Pet Photo Contest!",
    // "DIY Pro Challenge!",
    // "Music Lover’s Giveaway!",
    // "Bookworm Bonanza!",
    // "Movie Marathon Contest!",
    // "Art Enthusiast's Delight!",
    // "Gardener’s Green Thumb Challenge!",
    // "Gourmet Foodie Fest!",
    // "Travel Trivia Contest!",
    // "Photography Showcase!",
    // "Eco-Friendly Innovator’s Award!",
    // "Sports Fanatic's Ultimate Gear!",
    // "Health & Wellness Package!",
    // "Home Makeover Contest!"
];

const postContents = [
    "Enter our sweepstakes to win a trip to space! 🚀",
    "Are you a gaming enthusiast? Enter our Ultimate Gamer Giveaway!",
    // "Join our Fitness Frenzy Contest and win exciting prizes!",
    // "Enter to win the latest tech gadgets in our Tech Lover's Dream contest!",
    // "Are you a baking enthusiast? Show us your skills and win!",
    // "Update your wardrobe with our Fashionista's contest!",
    // "Share a photo of your pet and win exciting prizes!",
    // "Are you a DIY enthusiast? Enter our DIY Pro Challenge!",
    // "Music lovers, here's your chance to win big!",
    // "Calling all bookworms for our Bookworm Bonanza!",
    // "Join our Movie Marathon Contest and win a year of free movies!",
    // "Artists, share your work and win exciting prizes!",
    // "Show off your garden in our Gardener’s Challenge!",
    // "Join our Gourmet Foodie Fest and win a dining experience!",
    // "Test your travel knowledge and win prizes!",
    // "Showcase your photography skills and win!",
    // "Innovate for a better planet and win our Eco-Friendly Award!",
    // "Gear up for our Sports Fanatic's contest!",
    // "Win a health and wellness package to pamper yourself!",
    // "Enter our Home Makeover Contest and transform your space!"
];


const getPostData = (postIndex) => {
    return {
        post: postContents[postIndex],
        shorten_links: true,
        title: postTitles[postIndex],
        platforms: ["twitter", "reddit", "facebook"],
        redditOptions: {
            title: postTitles[postIndex],
            subreddit: "test"  // Modify this as needed for your actual subreddit
        }
    };
};

// const run = async () => {
//     for (let i = 0; i < postTitles.length; i++) {
//         const content = getPostData(i);
//         const json = await social.post(content).catch(console.error);
//         console.log(json);
//     }
// };

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
};

const combinedPosts = combinePostTitleAndContent(postTitles, postContents);

const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

const createPostObjects = (titles, contents) => {
    const combinedPosts = combinePostTitleAndContent(titles, contents);
    return combinedPosts.map(postContent => ({
        postId: generateId(),
        postContent
    }));
};

const posts = createPostObjects(postTitles, postContents);

postsRouter.get('/', async (req, res) => {
    res.json(posts);
});




// run();

module.exports = postsRouter