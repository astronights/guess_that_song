import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { user, chart, data } from '../types/music';
import { playlist_ids } from '../assets/constants';

export const login = async (source: string) => {
    if (source === 'spotify') {
        return spotify_login();
    } else {
        console.log("Source " + source + " not supported.");
    }
}

const spotify_login = async (): Promise<data> => {
    const sdk = SpotifyApi.withImplicitGrant(
        "203577c05742400d956e64c25fbf18c8",
        "http://localhost:3000",
        ["user-read-recently-played", "user-library-read", "user-top-read", "playlist-read-collaborative"],
    );
    return { sdk: sdk, user: await getUserDetails(sdk), charts: await getCharts(sdk) };

}

const getUserDetails = async (sdk: SpotifyApi): Promise<user> => {
    const data = {
        id: (await sdk.currentUser.profile()).id,
        playlists: (await sdk.currentUser.playlists.playlists()).items,
        recentlyPlayed: (await sdk.player.getRecentlyPlayedTracks()).items
    };
    return data;
}

const getCharts = async (sdk: SpotifyApi): Promise<chart> => {
    const charts = {
        playlists: await Promise.all(playlist_ids.map(async (id) => {
            return await sdk.playlists.getPlaylist(id);
        }))
    }
    return charts;
}