import { Request, Response, Router } from 'express';

import SpotifyLoginService from '../service/spotify';

export class LoginController {

    router = Router();
    spotify_login: SpotifyLoginService;

    constructor() {
        this.spotify_login = new SpotifyLoginService();
        this.router.post('/:service', this.login);
        this.router.get('/spotify/callback', this.spotify_login.login_callback);
    }

    public login = async (req: Request, res: Response) => {
        if (req.params.service == 'spotify') {
            this.spotify_login.login(req, res);
        }
        else {
            res.status(404).json({
                error: "Source " + req.params.service + " not supported."
            });
        }

    };
}