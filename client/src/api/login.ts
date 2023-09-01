import { SpotifyApi } from '@spotify/web-api-ts-sdk';

export const login = async (source: string) => {
    if (source === 'spotify') {
        spotify_login();
    } else {
        console.log("Source " + source + " not supported.");
    }
}

const spotify_login = async () => {
    const sdk = SpotifyApi.performUserAuthorization("203577c05742400d956e64c25fbf18c8", 
    "http://localhost:3000", 
    ["user-read-recently-played", "user-library-read", "user-top-read"], 
    "http://localhost:8080/login/spotify/callback");
}