const { sign } = require("jsonwebtoken");
const { users } = require("../assets/fakeDB");
const { verify } = require("jsonwebtoken");

const createAccessToken = (tokenUser) => {
    return sign(tokenUser, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10min"});
};
const createRefreshToken = (tokenUser, user) => {
    const refreshToken = sign(tokenUser, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "15min"});
    // adding refresh token to user
    // this will trickier with pg. i will have write a query here
    // to find user with this id, and add refresh token to their row
    user.refreshToken = refreshToken;
    return refreshToken;
};

const sendAccessToken = (req, res, accessToken) => {
    
    console.log("old refresh cookie", req.cookies.refreshToken)
    // will be sending actual name that i get from user in database instead of email
    res.json({data: accessToken, message: "user successfully logged in"})
};
const sendRefreshToken = (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        // path: "/refreshtoken"
    });
};

const authenticateAccessToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if(!authHeader) return res.status(403).json({data: {}, message: "login required to access this content"});
    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).json({data: {}, message: "please login to access this content"});
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({data: err, message: err.message});
        req.body.loggedUserId = user.id;
        req.body.loggedUserName = user.name;
        next();
    });
}
const authenticateRefreshToken = async (req, res, next) => {
    const cookiedRefreshToken = req.cookies.refreshToken;
    if(!cookiedRefreshToken) return res.status(401).json({data: {accessToken: ""}, message: "please login to access this content"});
    verify(cookiedRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, tokenUser) => {
        if(err) return res.status(405).json({data: {accessToken: ""}, message: err.message});
        const {id, name, refreshToken} = users.find(user => user.id === tokenUser.id);
        if(!id) return res.status(403).json({data: {accessToken: ""}, message: "no such user"});
        if(!(refreshToken === cookiedRefreshToken)) return res.status(403).json({data: {accessToken: ""}, message: "invalid refresh token"});
        req.body.loggedUserId = id;
        next();
    });
}

module.exports = {
    createAccessToken, 
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
    authenticateAccessToken,
    authenticateRefreshToken };