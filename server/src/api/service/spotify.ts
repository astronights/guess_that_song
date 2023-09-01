import { Request, Response } from 'express';
import axios, { AxiosResponse } from "axios";
import randomstring from 'randomstring';
import * as CONFIG from "../../config";

export default class SpotifyLogin {

    login_uri: string;
    scope: string;
    state: string;
    redirect_uri: string;

    constructor() {
        this.login_uri = process.env.SPOTIFY_LOGIN_URI || '';
        this.scope = `user-read-playback-state user-read-currently-playing user-library-read user-top-read`;
        this.redirect_uri = 'http://' + CONFIG.HOST + ':' + CONFIG.PORT + '/login/spotify/callback';
    }

    public login(req: Request, res: Response) {
        this.state = randomstring.generate(16);
        const searchParams = new URLSearchParams({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: this.scope,
            redirect_uri: this.redirect_uri,
            state: this.state,
        })
        res.redirect(this.login_uri + 'authorize?' + searchParams.toString());
    }

    public async login_callback(req: Request, res: Response) {
        console.log(req.query.code)
        const code = (String)(req.query.code);
        const token = await this.get_access_token(code);
        if (token != "") {
            res.status(200).json({'token': token});
        } else {
            res.status(500).json({'error': 'Could not get access token.'});
        }
    }

    private async get_access_token(code: string): Promise<string> {
        const body = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirect_uri,
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET
        }
        const url = this.login_uri + 'api/token'
        const response: AxiosResponse = await axios.post(url, body);
        console.log(response.data);
        return response.data.access_token;
    }
}