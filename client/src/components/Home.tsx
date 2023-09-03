import { useEffect, useState } from 'react';
import { login } from '../api/details'
import { data } from "../types/music";
import "../assets/css/page.sass";
import "../assets/css/home.sass";
import {
  List, ListItemButton, ListItemText, Divider, Avatar, ListItemAvatar,
  Card, CardContent, ListItem, ListItemIcon, ImageList, ImageListItem, ImageListItemBar
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import FaceIcon from '@mui/icons-material/Face';

const music_info: data = {
  user: {
    id: '',
    playlists: [],
    topArtists: [],
    topTracks: [],
    recentlyPlayed: [],
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
      <Grid container spacing={1}>

        <Grid container xs={12} md={6} direction={'column'} spacing={1}>
          <Grid>
            <Card variant="outlined" className="display-name">
              <CardContent>
                <List component="nav">
                  <ListItem>
                    <ListItemIcon><FaceIcon /></ListItemIcon>
                    <ListItemText primary={`Hello ${info.user.id} !`} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid>
            <Card className='my-playlists' variant="outlined">
              <CardContent>
                <List component="nav">
                  <ListItem>
                    <ListItemIcon><QueueMusicIcon /></ListItemIcon>
                    <ListItemText primary="My Playlists" />
                  </ListItem>
                </List>
                <Divider />
                <List component="nav" >
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
              </CardContent>
            </Card>
          </Grid>

          <Grid>
            <Card className='recently-played' variant="outlined">
              <CardContent>
                <List component="nav">
                  <ListItemButton selected={'recent' === playlist}
                    onClick={(event) => handleListItemClick(event, 'recent')}>
                    <ListItemIcon><HeadphonesIcon /></ListItemIcon>
                    <ListItemText primary="Recently Played" />
                  </ListItemButton>
                </List>
                <Divider />
                <List component="nav" >
                  {info.user.recentlyPlayed.map((cur) => {
                    return (
                      <ListItemButton selected={'recent' === playlist}
                        onClick={(event) => handleListItemClick(event, 'recent')}>
                        <ListItemAvatar>
                          <Avatar alt={cur.name} src={cur.images[0].url} />
                        </ListItemAvatar>
                        <ListItemText primary={cur.name} />
                      </ListItemButton>
                    )
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid xs={12} md={6}>
          <Card className='popular' variant="outlined">
            <CardContent>
              <List component="nav">
                <ListItem>
                  <ListItemIcon><LibraryMusicIcon /></ListItemIcon>
                  <ListItemText primary="Popular Playlists" />
                </ListItem>
              </List>
              <Divider />
              <ImageList>
                {info.charts.map((item) => (
                  <ImageListItem key={item.id} onClick={(event) => handleListItemClick(null, item.id)}>
                    <img
                      src={`${item.images[0].url}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.images[0].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.name}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.name}
                      subtitle={<span># Tracks: {item.tracks.items.length}</span>}
                      position="below"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;