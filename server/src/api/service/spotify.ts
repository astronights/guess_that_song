import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk';

export default class SpotifyLogin {

    spotifyApi;

    public async login(access_token: AccessToken): Promise<any> {
        this.spotifyApi = SpotifyApi.withAccessToken(process.env.SPOTIFY_CLIENT_ID, access_token);
        console.log(await this.spotifyApi.currentUser.topItems())
        return this.spotifyApi.currentUser.topItems();
    }
}