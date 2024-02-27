import { rest } from "msw";

const baseURL = 'https://apifinalproject-bcabd5b820ec.herokuapp.com/';

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.json({
                pk: 13,
                username: "PETAR123",
                email: "",
                first_name: "",
                last_name: "",
                profile_id: 13,
                profile_image: "https://res.cloudinary.com/dzchfcdfl/image/upload/v1/media/images/whiskey_aknfd6"
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),

    // Move this inside the array of handlers
    rest.post(`${baseURL}posts/`, (req, res, ctx) => {
        // Assuming the request body contains necessary post data
        const { title, content } = req.body;

        // You can add logic here to handle the post creation, e.g., save it to a database
        // For now, let's assume a successful creation with a dummy post ID (1)
        const createdPost = {
            id: 13,
            title,
            content,
            // Add any other relevant fields based on your API response
        };

        return res(
            ctx.status(201), // HTTP status code for successful resource creation
            ctx.json(createdPost)
        );
    }),
];
