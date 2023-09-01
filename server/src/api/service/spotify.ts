import SpotifyWebApi from "spotify-web-api-node";
import axios, { AxiosResponse } from "axios";
import randomstring from 'randomstring';
import * as CONFIG from "../../config";

export default class SpotifyLogin {

    spotifyApi: SpotifyWebApi;
    login_uri: string;
    scopes: Array<string>;
    state: string;
    redirect_uri: string;

    constructor() {
        this.spotifyApi = new SpotifyWebApi({
            redirectUri: 'http://' + CONFIG.HOST + ':' + CONFIG.PORT + '/login/spotify/callback',
            clientId: process.env.SPOTIFY_CLIENT_ID
        });
        this.scopes = ['user-read-playback-state', 'user-library-read', 'user-top-read'];
    }

    public login_details() {
        this.state = randomstring.generate(16);
        const authorizeURL = this.spotifyApi.createAuthorizeURL(this.scopes, this.state, true);
        return { 'login_uri': authorizeURL };
    }

    public async get_access_token(code: string): Promise<string> {
        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirect_uri,
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET
        })
        const url = this.login_uri + 'api/token'
        const response: AxiosResponse = await axios.post(url, body.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            });
        if (response.status != 200) {
            return Promise.resolve("");
        }
        return response.data.access_token;
    }
}