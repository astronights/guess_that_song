interface GameProps {
  game?: {
    custom?: Array<string>
    id?: string
  }
  user?: string
}

const Game = (props: GameProps) => {
    const user = props.user || window.sessionStorage.getItem("user");
    return (
      <div>
        <div>Game</div>
        <div>Work in Progress</div>
        <div>{user}</div>
      </div>
    );
};

export default Game;