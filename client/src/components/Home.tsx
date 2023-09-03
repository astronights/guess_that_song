import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { login } from '../api/details'
import { data } from "../types/music";
import "../assets/css/page.sass";
import "../assets/css/home.sass";
import {
  List, ListItemButton, ListItemText, Divider, Avatar, ListItemAvatar,
  Card, ListItem, ListItemIcon, Button, Stack, Chip, Snackbar, Alert, TextField
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import FaceIcon from '@mui/icons-material/Face';
import EqualizerIcon from '@mui/icons-material/Equalizer';

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
  const [message, setMessage] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [redirect, setRedirect] = useState(false);

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

  const getChoice = (id: string) => {
    if (id === 'recent') {
      return 'Recently Played Songs'
    } else if (id === 'top') {
      return 'Top Tracks'
    } else if (id === '') {
      return 'No Playlist Selected'
    } else {
      const popular = info.charts.map((cur) => cur.id)
      const personal = info.user.playlists.map((cur) => cur.id)
      if (popular.includes(id)) {
        return info.charts.find((cur) => cur.id === id).name
      } else if (personal.includes(id)) {
        return info.user.playlists.find((cur) => cur.id === id).name
      } else {
        return 'Error'
      }
    }
  }

  const loadGame = () => {
    if (playlist === '') {
      if (gameCode === '') {
        setMessage('Please select a playlist or enter a room code')
      }
      else {
        setRedirect(true);
      }
      setMessage('Please select a playlist')
    } else {
      setRedirect(true);
    }
  }

  const handleGameCode = (event) => {
    if (event.target.value.length === 6) {
      setGameCode(event.target.value);
    }
    else {
      setGameCode('');
    }
  }

  if (redirect) {
    const props = { user: info.user.id }

    if (playlist === 'recent') {
      props['tracks'] = info.user.recentlyPlayed
    } else if (playlist === 'top') {
      props['tracks'] = info.user.topTracks
    } else if (playlist === '') {
      props['gameCode'] = gameCode
    } else {
      props['playlist'] = playlist
    }
    console.log(props)
    return <Navigate to='/game' state={props} />
  };

  return (
    <div className="page">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={message !== ''}
        autoHideDuration={6000}
        onClose={() => setMessage('')}
      >
        <Alert onClose={() => setMessage('')} severity="warning" sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
      <Grid container spacing={1.3}>
        <Grid container xs={12} md={6} direction={'column'} spacing={1.3}>
          <Grid>
            <Card variant="outlined" className="display-name">
              <ListItem>
                <ListItemIcon><FaceIcon /></ListItemIcon>
                <ListItemText primary={`Hello ${info.user.id} !`} />
              </ListItem>
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
              <List component="nav" sx={{ maxHeight: '50vh', overflow: 'auto' }}>
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

          <Grid container spacing={1.5} >
            <Grid sx={{ width: '50%' }}>
              <Card className='recently-played' variant="outlined">
                <ListItemButton key='recent' selected={'recent' === playlist}
                  onClick={(event) => handleListItemClick(event, 'recent')}>
                  <ListItemIcon><HeadphonesIcon /></ListItemIcon>
                  <ListItemText primary={`Recently Played (${info.user.recentlyPlayed.length})`} />
                </ListItemButton>
              </Card>
            </Grid>

            <Grid sx={{ width: '50%' }}>
              <Card className='top-tracks' variant="outlined">
                <ListItemButton key='recent' selected={'top' === playlist}
                  onClick={(event) => handleListItemClick(event, 'top')}>
                  <ListItemIcon><EqualizerIcon /></ListItemIcon>
                  <ListItemText primary={`Top Tracks (${info.user.topTracks.length})`} />
                </ListItemButton>
              </Card>
            </Grid>

          </Grid>
        </Grid>

        <Grid container xs={12} md={6} direction={'column'} spacing={1.5}>
          <Grid>
            <Card className='choice' variant="outlined">
              <ListItem alignItems='flex-start' sx={{ display: 'flex' }}>
                <ListItemText primary='Game Playlist: ' sx={{ minWidth: '25%' }} />
                {
                  playlist !== '' ?
                    <Chip label={getChoice(playlist)}
                      variant="outlined" onDelete={() => { setPlayList('') }} />
                    : null
                }
              </ListItem>
              <ListItem>
                <ListItemText primary='Room Code: ' sx={{ minWidth: '25%' }} />
                <TextField id="outlined-basic" size='small' onChange={handleGameCode}
                  label="6 digit code" variant="outlined" />
              </ListItem>
              <ListItem>
                <Stack spacing={2} direction="row">
                  <Button variant="outlined" onClick={loadGame}>Create Room</Button>
                  <Button variant="outlined" onClick={loadGame} disabled={gameCode === ''}>Join Room</Button>
                  <Button variant="outlined" onClick={loadGame} disabled={
                    playlist === '' || info.charts.find((cur) => cur.id === playlist) === undefined
                  }>Play Global</Button>
                </Stack>
              </ListItem>

            </Card>
          </Grid>
          <Grid>
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
      </Grid>
    </div>
  );
};

export default Home;