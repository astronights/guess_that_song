import { useEffect, useState } from 'react';
import { login } from '../api/details'
import { data } from "../types/music";
import "../assets/css/page.sass";
import "../assets/css/home.sass";
import {
  List, ListItemButton, ListItemText, Divider, Avatar, ListItemAvatar,
  Card, ListItem, ListItemIcon
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import FaceIcon from '@mui/icons-material/Face';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

const music_info: data = {
  user: {
    id: '',
    playlists: [],
    topArtists: [],
    topTracks: [],
    recentlyPlayed: [{
      track: {
        name: '',
      }
    }],
  },
  charts: [{
    id: '',
    name: '',
    images: [{
      url: '',
    }],
    tracks: {
      items: [{}]
    }
  }]
}

const Home = () => {

  const [info, setInfo] = useState(music_info);
  const [playlist, setPlayList] = useState("");

  useEffect(() => {
    login('spotify').then((details: data) => {
      setInfo(details);
      console.log(details);
      window.sessionStorage.setItem("user", details.user.id);
    });
  }, []);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
  ) => {
    setPlayList(id);
  };

  return (
    <div className="page">
      <Grid container spacing={1.5}>

        <Grid container xs={12} md={6} direction={'column'} spacing={1.5}>
          <Grid>
            <Card variant="outlined" className="display-name">
              <List component="nav">
                <ListItem>
                  <ListItemIcon><FaceIcon /></ListItemIcon>
                  <ListItemText primary={`Hello ${info.user.id} !`} />
                </ListItem>
              </List>
            </Card>
          </Grid>

          <Grid>
            <Card className='my-playlists' variant="outlined">
              <List component="nav">
                <ListItem>
                  <ListItemIcon><QueueMusicIcon /></ListItemIcon>
                  <ListItemText primary="My Playlists" />
                </ListItem>
              </List>
              <Divider />
              <List component="nav" sx={{ maxHeight: '40vh', overflow: 'auto' }}>
                {info.user.playlists.map((cur) => {
                  return (
                    <ListItemButton key={cur.id} selected={cur.id === playlist}
                      onClick={(event) => handleListItemClick(event, cur.id)}>
                      <ListItemAvatar>
                        <Avatar alt={cur.name} src={cur.images[0].url} />
                      </ListItemAvatar>
                      <ListItemText primary={cur.name} />
                    </ListItemButton>
                  )
                })}
              </List>
            </Card>
          </Grid>

          <Grid>
            <Card className='recently-played' variant="outlined">
              <List component="nav">
                <ListItemButton key='recent' selected={'recent' === playlist}
                  onClick={(event) => handleListItemClick(event, 'recent')}>
                  <ListItemIcon><HeadphonesIcon /></ListItemIcon>
                  <ListItemText primary="Recently Played" />
                </ListItemButton>
              </List>
              <Divider />
              <List component="nav" >
                {info.user.recentlyPlayed.map((cur) => {
                  return (
                    <ListItemButton key={cur.track.name} selected={'recent' === playlist}
                      onClick={(event) => handleListItemClick(event, 'recent')}>
                      <ListItemIcon><AudiotrackIcon/></ListItemIcon>
                      <ListItemText primary={cur.track.name} />
                    </ListItemButton>
                  )
                })}
              </List>
            </Card>
          </Grid>
        </Grid>

        <Grid xs={12} md={6}>
          <Card className='popular' variant="outlined">
            <List component="nav">
              <ListItem>
                <ListItemIcon><LibraryMusicIcon /></ListItemIcon>
                <ListItemText primary="Popular Playlists" />
              </ListItem>
            </List>
            <Divider />
            <List component="nav" sx={{ maxHeight: '80vh', overflow: 'auto' }}>
              {info.charts.map((cur) => {
                return (
                  <ListItemButton key={cur.id} selected={cur.id === playlist}
                    onClick={(event) => handleListItemClick(event, cur.id)}>
                    <ListItemAvatar>
                      <Avatar alt={cur.name} src={cur.images[0].url} />
                    </ListItemAvatar>
                    <ListItemText primary={cur.name} />
                  </ListItemButton>
                )
              })}
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;