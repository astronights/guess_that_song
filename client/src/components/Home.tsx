import { useEffect, useState } from 'react';
import { login } from '../api/details'
import { data } from "../types/music";
import "../assets/css/page.sass";
import "../assets/css/home.sass";
import { Box, List, ListItemButton, ListItemText, Divider, Avatar, ListItemAvatar, 
  Card, CardContent, Typography, ListItem, ListItemIcon } from '@mui/material';

const music_info: data = {
  user: {
    id: '',
    playlists: [],
    topArtists: [],
    topTracks: [],
    recentlyPlayed: [],
  },
  charts: {}
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

  console.log(info);

  return (
    <div className="page">
      <Box sx={{
        display: 'inline-grid',
        rowGap: 1,
        gridTemplateAreas: `"name popular"
        "my-plylist popular"
        "my-plylist popular"`
      }}>

        <Card variant="outlined" className="display-name" sx={{gridColumn: '1/2', gridRow: '1/1'}}>
          <CardContent>
            <Typography variant="h5" component="div">
              Hello {info.user.id} !
            </Typography>
          </CardContent>
        </Card>

        <Card className='my-playlists' variant="outlined" sx={{ gridColumn: '1/2', gridRow: '2/5'}}>
          <CardContent>
            <List component="nav">
              <ListItem>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="My Playlists"/>
              </ListItem>
            </List>
            <Divider />
            <List component="nav" >
              {info.user.playlists.map((cur) => {
                return (
                  <ListItemButton selected={cur.id === playlist}
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

        <Card className='popular' variant="outlined" sx={{ gridColumn: '1/2', gridRow: '2/5'}}>
          <CardContent>
            <List component="nav">
              <ListItem>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Popular Playlists"/>
              </ListItem>
            </List>
            <Divider />
            <List component="nav" >
              {/* {info.charts.playlists.map((cur) => {
                return (
                  <ListItemButton selected={cur.id === playlist}
                    onClick={(event) => handleListItemClick(event, cur.id)}>
                    <ListItemAvatar>
                      <Avatar alt={cur.name} src={cur.images[0].url} />
                    </ListItemAvatar>
                    <ListItemText primary={cur.name} />
                  </ListItemButton>
                )
              })} */}
            </List>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Home;