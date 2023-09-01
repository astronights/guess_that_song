import { Request, Response, Router } from 'express';

import SpotifyLoginService from '../service/spotify';

export class LoginController {

    router = Router();
    spotify_login: SpotifyLoginService;

    constructor() {
        this.spotify_login = new SpotifyLoginService();
        this.router.get('/:service', this.login);
        this.router.get('/spotify/callback', this.login_callback);
    }

    public login = async (req: Request, res: Response) => {
        if (req.params.service == 'spotify') {
            const payload = this.spotify_login.login_details();
            res.redirect(payload.login_uri);
        }
        else {
            res.status(404).json({
                error: "Source " + req.params.service + " not supported."
            });
        }
    };

    public login_callback = async (req: Request, res: Response) => {
        const code = (String)(req.query.code);
        const token = await this.spotify_login.get_access_token(code);
        if (token != "") {
            res.status(200).json({'token': token});
        } else {
            res.status(500).json({'error': 'Could not get access token.'});
        }
    }
}