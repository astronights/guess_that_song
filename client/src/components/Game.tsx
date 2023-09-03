import { useLocation } from "react-router-dom";

interface GameState {
  tracks?: Array<string>
  playlist?: string
  gameCode?: string
  user?: string
}

const Game = () => {

    const { state } = useLocation();
    const gameRef: GameState = state;
    return (
      <div>
        <div>Game</div>
        <div>Work in Progress</div>
        <div>{JSON.stringify(gameRef)}</div>
      </div>
    );
};

export default Game;