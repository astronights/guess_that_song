import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { data } from '../types/music';
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
        process.env.REACT_APP_CLIENT_ID,
        process.env.REACT_APP_REDIRECT_URI,
        ["user-read-recently-played", "user-library-read", "user-top-read", "playlist-read-collaborative"],
    );
    return { sdk: sdk, ...(await getDetails(sdk)) };

}

const getDetails = async (sdk: SpotifyApi): Promise<data> => {
    const data = {
        user: {
            id: (await sdk.currentUser.profile()).id,
            playlists: [],
            playlistRefs: (await sdk.currentUser.playlists.playlists()).items,
            recentlyPlayed: (await sdk.player.getRecentlyPlayedTracks(50, { timestamp: 100000, type: 'after' })).items,
            topTracks: (await sdk.currentUser.topItems('tracks')).items,
            // topArtists: (await sdk.currentUser.topItems('artists')).items,
        },
        charts: []
    }
    for (const playlist_id of playlist_ids) {
        const playlist = (await sdk.playlists.getPlaylist(playlist_id));
        data.charts.push(playlist)
    };
    for (const playlist of data.user.playlistRefs) {
        if (playlist_ids.includes(playlist.id)) continue;
        const items = (await sdk.playlists.getPlaylist(playlist.id)).tracks;
        data.user.playlists.push({
            id: playlist.id,
            images: playlist.images,
            owner: playlist.owner,
            type: playlist.type,
            uri: playlist.uri,
            name: playlist.name,
            description: playlist.description,
            tracks: items
        });
    };
    delete data.user.playlistRefs;
    return data;
}