import { Request, Response, Router } from 'express';

import SpotifyLoginService from '../service/spotify';

export class LoginController {

    router = Router();
    spotify_login: SpotifyLoginService;

    constructor() {
        this.spotify_login = new SpotifyLoginService();
        this.router.post('/spotify/callback', this.login_callback);
    }

    public login_callback = async (req: Request, res: Response) => {
        const user = await this.spotify_login.login(req.body.access_token);
        res.status(200).json(user)
    }
}