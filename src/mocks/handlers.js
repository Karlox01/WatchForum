import { rest } from "msw"

const baseURL = 'https://apifinalproject-bcabd5b820ec.herokuapp.com/'

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.json({
                pk: 1,
                username: "karlo",
                email: "karlo@karlo.com",
                first_name: "",
                last_name: "",
                profile_id: 1,
                profile_image: "https://res.cloudinary.com/dzchfcdfl/image/upload/v1/media/../default_profile_wfihdl"
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];