import Grid from '@mui/material/Unstable_Grid2';
import { useLocation } from "react-router-dom";

interface GameState {
  tracks?: any
  playlist?: any
  gameCode?: string
  user?: string
  type: string
}

const Game = () => {

  const { state } = useLocation();
  const gameRef: GameState = state;
  return (
    <div className="page">
      <Grid container spacing={1.3}>

      </Grid>
    </div>
  );
};

export default Game;