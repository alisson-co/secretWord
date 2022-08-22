import "./gameOver.css";

export function GameOver({ retry }) {
  return (
    <div>
      <h1>Game Over!</h1>
      <button onClick={retry}>Recomeçar o Game!</button>
    </div>
  );
}
