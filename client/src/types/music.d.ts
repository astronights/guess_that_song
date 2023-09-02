import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export type user = {
    id: string;
    playlists: SpotifyApi.SimplifiedPlaylist[];
    topArtists?: SpotifyApi.Artist[];
    topTracks?: SpotifyApi.Track[];
    recentlyPlayed: SpotifyApi.PlayHistoryItem[];
  };

export type chart = {
    playlists: SpotifyApi.Playlist[];
};

export type data = {
    sdk?: SpotifyApi;
    user: user;
    charts: charts;
};