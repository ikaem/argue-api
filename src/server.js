require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const { users, posts, replies, topis } = require("./assets/fakeDB");
const { 
    createAccessToken, 
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
    authenticateAccessToken,
    authenticateRefreshToken } = require("./helpers/auth");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: "https://floating-caverns-79930.herokuapp", credentials: true}));
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }))
app.use(cookieParser());

// endpoints // 
app.get("/", (req, res) => {
    res.redirect("/posts/1");
})
app.get("/posts/:page", async (req, res) => {
    const { page } = req.params;
    const startSlice = Number(page) * 4 - 4;
    const endSlice = Number(page) * 4; 
    try {
        // will need to async fetch posts from db
        const sortedPosts = posts.slice().sort((a, b) => b.dateCreated - a.dateCreated).slice(startSlice, endSlice);

        // sending also number of pages for all posts...
        res.json({data: {sortedPosts: sortedPosts, pagesNumber: Math.ceil(posts.length/4)}, message: "posts successfully retrieved"})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({data: {}, message: "unable to load posts"})
    }
});

app.get("/searchposts/:page", async (req, res) => {
    const { page } = req.params;
    const { searching } = req.query;
    console.log(req.query);

    const startSlice = Number(page) * 2 - 2;
    const endSlice = Number(page) * 2; 
    try {
        // will need to async fetch posts from db
        const searchResults = posts.filter(post => post.text.toLowerCase().includes(searching) || post.author === searching);
        const sortedSearchResults = searchResults.slice().sort((a, b) => b.dateCreated - a.dateCreated).slice(startSlice, endSlice);

        // sending also number of pages for all posts...
        res.json({data: {sortedPosts: sortedSearchResults, pagesNumber: Math.ceil(searchResults.length/2)}, message: "posts successfully retrieved"})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({data: {}, message: "unable to load posts"})
    }
});


app.post("/newpost", /* authenticateAccessToken,  */async (req, res) => {
    const { postBody, loggedUserId, loggedUserName } = req.body;
    try {
        // make sure post text is true
        if(!postBody) return res.status(500).json({data: {}, message: "cannot create empty post"});
        posts.push({
            id: posts.length + 1,
            author: loggedUserName,
            text: postBody,
            dateCreated: new Date(Date.now()),
        });
        // send topics to topic db
        // const noChars = postBody.replace(/\.|,/g,"");
        // const hashesArray = noChars.split(" ").filter(hash => hash.charAt(0) === "#");
        // const noDoubles = [...new Set(hashesArray)];
        // console.log(noDoubles);

        

        // noDoubles.forEach(newTopic => {
        //     const existingTopicIndex = topics.findIndex(topic => {
        //         topic.title === newTopic;
        //     });
        //     if
        // })
        res.json({data: {}, message: "new post successfully created"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({data: err, message: err.message});
    }
})
app.put("/editpost/:id", /* authenticateAccessToken, */ async (req, res) => {
    const { textForUpdate } = req.body;
    const { id } = req.params;
    try { 
        if(!textForUpdate) return res.status(500).json({data: {}, message: "cannot update to an empty post"});
        // find post to be updated
        const postIndex = posts.findIndex(post => post.id === Number(id));
        if(postIndex === -1) return res.status(500).json({data: {}, message: "unable to find a post to update"});
        posts[postIndex] = {...posts[postIndex], text: textForUpdate, dateEdited: new Date(Date.now())};
        res.json({data: {}, message: "post updated successfully"});

    }
    catch (err) {
        console.log(err);
        res.status(500).json({data: err, message: err.message});
    }
})
app.delete("/deletepost/:id", /* authenticateAccessToken,  */async (req, res) => {
    const { id } = req.params;
    try {
        const postIndex = posts.findIndex(post => post.id === Number(id));
        if(postIndex === -1) return res.status(500).json({data: {}, message: "unable to find a post do delete"});
        posts.splice(postIndex, 1);
        // also will have to delete all replies for this post
        replies.forEach(reply => {
            replies.splice(replies.findIndex(indReply => indReply.postId === Number(id)), 1);
        });
        res.json({data: {}, message: "post deleted successfully"});
    }
    catch {
        console.log(err);
        res.status(500).json({data: {}, message: err.message});
    }
})

app.get("/replies/:postid/:page", async (req, res) => {
    const { postid, page } = req.params;
    const startSlice = Number(page) * 3 - 3;
    const endSlice = Number(page) * 3; 
    try {
        // will need to async fetch replies from db
        // but that match post id
        const filteredReplies = replies.filter(reply => reply.postId === Number(postid)).sort((a, b) => b.dateCreated - a.dateCreated);
        const pagedReplies = filteredReplies.slice(startSlice, endSlice)

        // sending also number of pages for all posts...
        res.json({data: {sortedReplies: pagedReplies, pagesNumber: Math.ceil(filteredReplies.length/3)}, message: "replies successfully retrieved"})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({data: {}, message: "unable to load replies"})
    }
});
app.post("/newreply", /* authenticateAccessToken,  */async (req, res) => {
    const { replyBody, postId, loggedUserId, loggedUserName } = req.body;
    console.log(req.body);
    try {
        if(!replyBody) return res.status(500).json({data: {}, message: "cannot create empty reply"});
        replies.push({
            id: replies.length + 1,
            postId: Number(postId),
            // temportary until authenticate token enabled...
            author: "karlo",
            // author: loggedUserName,
            text: replyBody,
            dateCreated: new Date(Date.now()),
        })
        res.json({data: {}, message: "new reply successfully created"});
        console.log(replies);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({data: err, message: err.message});
    }
})
app.put("/editreply/:id", /* authenticateAccessToken, */ async (req, res) => {
    const { replyTextForUpdate } = req.body;
    const { id } = req.params;
    try { 
        if(!replyTextForUpdate) return res.status(500).json({data: {}, message: "cannot update to an empty reply"});
        // find post to be updated
        const replyIndex = replies.findIndex(reply => reply.id === Number(id));
        if(replyIndex === -1) return res.status(500).json({data: {}, message: "unable to find a reply to update"});
        replies[replyIndex] = {...replies[replyIndex], text: replyTextForUpdate, dateEdited: new Date(Date.now())};
        console.log(replies);
        res.json({data: {}, message: "reply updated successfully"});

    }
    catch (err) {
        console.log(err);
        res.status(500).json({data: err, message: err.message});
    }
});
app.delete("/deletereply/:id", /* authenticateAccessToken,  */async (req, res) => {
    const { id } = req.params;
    try {
        const replyIndex = replies.findIndex(reply => reply.id === id);
        if(replyIndex === -1) return res.status(500).json({data: {}, message: "unable to find a reply do delete"});
        replies.splice(replyIndex, 1);
        res.json({data: {}, message: "reply deleted successfully"});
    }
    catch {
        console.log(err);
        res.status(500).json({data: {}, message: err.message});
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try{
        // checking if credentials submitted
        if(!(email && password)) return res.status(403).json({data: {}, message: "incomplete data submitted"});
        const user = users.find(user => user.email === email);
        // check if user exists
        if(!user) return res.status(401).json({data: {}, message: "no such user"});
        // check if passwords match - leaving throwing error for later to find out is it better than returning error statuses
        if(!await bcrypt.compare(password, user.password)) throw new Error("incorrect password");
        // create and send access and refresh tokens, add refresh token to the user
        sendRefreshToken(res, createRefreshToken({id: user.id, name: user.name}, user));
        sendAccessToken(req, res, createAccessToken({id: user.id, name: user.name}));
    }
    catch(err){
        console.log(err);
        res.json({data: err, message: err.message});
    }
});
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if(!(name && email && password)) return res.status(403).json({data: {}, message: "incomplete data submitted"});
        const hashedPassword = await bcrypt.hash(password, 10);
        if(!hashedPassword) return res.status(403).json({data: {}, message: "unable to hash password. user not registered"});
        // check if already user with same email or name
        const user = users.find(user => user.email === email || user.name === name);
        // with database we will get info from db where exactly the conflict was
        if(user) return res.status(403).json({data: {}, message: "user with the same email or name already exists. please choose diffferent email or name"})
        // pushing user into array for now. later will actually need to store in database 
        users.push({id: uuid(), name, email, password: hashedPassword});
        res.json({data: {}, message: "new user successfully registered. please login"})
    }
    catch (err) {
            console.log(err);
            res.status(401).json({data: err, message: err.message});

    }
})
app.post("/protected", authenticateAccessToken, async (req, res) => {
    const { loggedUserId } = req.body;
    const userPassword = users.find(user => user.id === loggedUserId).password;
    // jsut test to return something secret
    res.json({data: userPassword, message: "user password retrieved"});
})
app.post("/renewaccesstoken", authenticateRefreshToken, async (req, res) => {
    const { loggedUserId } = req.body;
    const user = users.find(user => user.id === loggedUserId);
    // there is no need to be searching for user here... i have user data in the actual refresh token, and i can assign name and id to req body via middleware...
    // actually, there is. because i need to assign new refresh token to the user
    sendRefreshToken(res, createRefreshToken({id: user.id, name: user.name}, user));
    sendAccessToken(req, res, createAccessToken({id: user.id, name: user.name}));
})
app.delete("/logout", (_req, res) => {
    try {
        // should prolly be deleting refresh token from the database user too
        res.clearCookie("refreshToken");
        res.json({data: {}, message: "user logged out successfully"});
    }
    catch (err) {
        console.log(err);
        res.status(401).json({data: err, message: err.message});
    }
})

app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
});