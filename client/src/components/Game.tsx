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
    <div className="page">
    </div>
  );
};

export default Game;