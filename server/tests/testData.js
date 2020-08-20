import dotenv from "dotenv";

dotenv.config();

export const data = {
    invalidAdminPassword: {
        email: process.env.ADMINUSERNAME,
        password: "anotherPassword"
    },

    invalidAdminEmail: {
        email: "anotherUser@gmail.com",
        password: "anotherPassword"
    },

    validAdmin: {
        email: process.env.ADMINUSERNAME,
        password: process.env.ADMINPASSWORD
    },

    validPost: {
        "title": "Post for testing purpose",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. hello mn this is awesomedisse in est ante in. Lorem dolor sed viverra ipsum nunc. Risus nec feugiat in fermentum posuere. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus. Nibh mauris cursus mattis molestie a iaculis at erat",
        "imgLink": "https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg"
    },

    editedPost: {
        "title": "edited Post",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. hello mn this is awesomedisse in est ante in. Lorem dolor sed viverra ipsum nunc. Risus nec feugiat in fermentum posuere. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus. Nibh mauris cursus mattis molestie a iaculis at erat asta lavista there my friend from the internet",
        "imgLink": "https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg"
    },

    invalidPost: {
        "title": "Post for testing purpose",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. hello mn this is awesomedisse in est ante in. Lorem dolor sed viverra ipsum nunc. Risus nec feugiat in fermentum posuere. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus. Nibh mauris cursus mattis molestie a iaculis at erat",
        "imgLink": ""
    },

    validQuery: {
        "name": "tester",
        "email": "test@test.com",
        "query": "o eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. hello mn this is awesomedisse in est ante in."
    },

    invalidQuery: {
        "name": "",
        "email": "",
        "query": "o eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. hello mn this is awesomedisse in est ante in."
    },

    validComment: {
        "name": "tester",
        "comment": "this is a test"
    },

    invalidComment: {
        "name": "",
        "comment": ""
    },

    invalidPostID: "5f3a5c63f1daeb2c4840c0ce",

    invalidToken: "this is an invalid token"
}
