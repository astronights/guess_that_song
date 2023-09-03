import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export type user = {
    id: string;
    playlists: SpotifyApi.Playlist[];
    topArtists?: SpotifyApi.Artist[];
    topTracks?: SpotifyApi.Track[];
    recentlyPlayed: SpotifyApi.PlayHistoryItem[];
  };

export type chart = SpotifyApi.Playlist[];

export type data = {
    sdk?: SpotifyApi;
    user: user;
    charts: SpotifyApi.Playlist[];
};