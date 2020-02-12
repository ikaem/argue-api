const users = [
    {id: 1, name: "karlo", email: "karlo@gmail.com", password: "$2a$10$g.Kn9HPACWNPd/BGLT1By.v8mSLioJAykR3AXFYg2KboBI2RMmDm2"},
    {id: 2, name: "ivan", email: "ivan@gmail.com", password: "$2a$10$l6zjsUasx7McYTsHSjR0QedRFJSsEmCZ38w42ID8YzTN9ChFuY0Ju"},
    {id: 3, name: "martina", email: "martina@gmail.com", password: "$2a$10$fQ2o.uK5xF201gsRRuGhEeXPj7adFBUjHuYyLdRzGpZxxKPAxFAby"}
]
const posts = [
    {id: 1, text: "#Bacon ipsum dolor spare ribs strip steak hamburger leberkas tenderloin landjaeger. Ball tip salami pork belly, venison chicken buffalo short loin. Cow porchetta ground round, salami ham drumstick short ribs buffalo leberkas. Ham hock drumstick swine turducken doner fatback. ", dateCreated: new Date(Date.now()), dateEdited: "", author: "karlo"},
    {id: 2, text: "#Bacon ipsum dolor #amet spare ribs strip steak hamburger leberkas tenderloin landjaeger. Ball tip salami pork belly, venison chicken buffalo short loin. Cow porchetta ground round, salami ham drumstick short ribs buffalo leberkas. Ham hock drumstick swine turducken doner fatback. ", dateCreated: new Date(Date.now()), dateEdited: "", author: "martina"},
    {id: 3, text: "#Bacon ipsum dolor #amet spare ribs strip steak hamburger leberkas tenderloin landjaeger. Ball tip salami pork belly, venison chicken buffalo short loin. Cow porchetta ground round, salami ham drumstick short ribs buffalo leberkas. Ham hock drumstick swine turducken doner fatback. ", dateCreated: new Date(Date.now()), dateEdited: "", author: "ivan"},
    {id: 4, text: "#Bacon ipsum dolor #amet spare ribs strip steak hamburger leberkas tenderloin landjaeger. Ball tip salami pork belly, venison chicken buffalo short loin. Cow porchetta ground round, salami ham drumstick short ribs buffalo leberkas. Ham hock drumstick swine turducken doner fatback. ", dateCreated: new Date(Date.now()), dateEdited: "", author: "karlo"},
    {id: 5, text: "#Bacon ipsum dolor #amet spare ribs strip steak hamburger leberkas tenderloin landjaeger. Ball tip salami pork belly, venison chicken buffalo short loin. Cow porchetta ground round, salami ham drumstick short ribs buffalo leberkas. Ham hock drumstick swine turducken doner fatback. ", dateCreated: new Date(Date.now()), dateEdited: "", author: "martina"},
    {id: 6, text: "#Bacon ipsum dolor #amet spare ribs strip steak hamburger leberkas tenderloin landjaeger. Ball tip salami pork belly, venison chicken buffalo short loin. Cow porchetta ground round, salami ham drumstick short ribs buffalo leberkas. Ham hock drumstick swine turducken doner fatback. ", dateCreated: new Date(Date.now()), dateEdited: "", author: "ivan"},
    {id: 7, text: "#Bacon ipsum dolor #amet spare ribs strip steak hamburger leberkas tenderloin landjaeger. Ball tip salami pork belly, venison chicken buffalo short loin. Cow porchetta ground round, salami ham drumstick short ribs buffalo leberkas. Ham hock drumstick swine turducken doner fatback. ", dateCreated: new Date(Date.now()), dateEdited: "", author: "martina"},
    {id: 8, text: "#Bacon ipsum dolor #amet spare ribs strip steak hamburger leberkas tenderloin landjaeger. Ball tip salami pork belly, venison chicken buffalo short loin. Cow porchetta ground round, salami ham drumstick short ribs buffalo leberkas. Ham hock drumstick swine turducken doner fatback. ", dateCreated: new Date(Date.now()), dateEdited: "", author: "ivan"}
];

const replies = [
    {id: 1, postId: 1, text: "Spare ribs drumstick beef tri-tip buffalo flank tenderloin cupim ball tip kielbasa prosciutto bresaola. Filet mignon pork chop spare ribs sausage buffalo bacon tongue meatball hamburger ham pig meatloaf doner.", author: "ivan", dateCreated: new Date(Date.now()), dateEdited: ""},
    {id: 2, postId: 1, text: "Spare ribs drumstick beef tri-tip buffalo flank tenderloin cupim ball tip kielbasa prosciutto bresaola. Filet mignon pork chop spare ribs sausage buffalo bacon tongue meatball hamburger ham pig meatloaf doner.", author: "martina", dateCreated: new Date(Date.now()), dateEdited: ""},
    {id: 3, postId: 1, text: "Spare ribs drumstick beef tri-tip buffalo flank tenderloin cupim ball tip kielbasa prosciutto bresaola. Filet mignon pork chop spare ribs sausage buffalo bacon tongue meatball hamburger ham pig meatloaf doner.", author: "karlo", dateCreated: new Date(Date.now()), dateEdited: ""},
    {id: 4, postId: 1, text: "Spare ribs drumstick beef tri-tip buffalo flank tenderloin cupim ball tip kielbasa prosciutto bresaola. Filet mignon pork chop spare ribs sausage buffalo bacon tongue meatball hamburger ham pig meatloaf doner.", author: "ivan", dateCreated: new Date(Date.now()), dateEdited: ""},
    {id: 5, postId: 1, text: "Spare ribs drumstick beef tri-tip buffalo flank tenderloin cupim ball tip kielbasa prosciutto bresaola. Filet mignon pork chop spare ribs sausage buffalo bacon tongue meatball hamburger ham pig meatloaf doner.", author: "martina", dateCreated: new Date(Date.now()), dateEdited: ""},
    {id: 6, postId: 2, text: "Spare ribs drumstick beef tri-tip buffalo flank tenderloin cupim ball tip kielbasa prosciutto bresaola. Filet mignon pork chop spare ribs sausage buffalo bacon tongue meatball hamburger ham pig meatloaf doner.", author: "karlo", dateCreated: new Date(Date.now()), dateEdited: ""}
];

const topics = [
    {id: 1, title: "#bacon", posts: [1,2,3,4,5,6,7,8]},
    {id: 2, title: "#amet", posts: [2,3,4,5,6,7,8]},
    
]

module.exports = {users, posts, replies, topics};