import { useState } from "react";

const directions = ["Left", "Center", "Right"];

function App() {
  const [score, setScore] = useState(0);
  const [shots, setShots] = useState(0);
  const [message, setMessage] = useState("Choose a direction to shoot!");
  const [keeperMove, setKeeperMove] = useState("Center");
  const [ballMove, setBallMove] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [lastShot, setLastShot] = useState("");

  const totalShots = 5;

  const shoot = (playerDirection) => {
    if (gameOver) return;

    const goalkeeperDirection =
      directions[Math.floor(Math.random() * directions.length)];

    setKeeperMove(goalkeeperDirection);
    setBallMove(playerDirection);
    setLastShot(playerDirection);

    const newShots = shots + 1;
    let newScore = score;

    if (playerDirection === goalkeeperDirection) {
      setMessage(`Saved! Goalkeeper went ${goalkeeperDirection}.`);
    } else {
      newScore = score + 1;
      setScore(newScore);
      setMessage(`GOAL! You shot ${playerDirection}, keeper went ${goalkeeperDirection}.`);
    }

    setShots(newShots);

    if (newShots === totalShots) {
      setGameOver(true);

      setTimeout(() => {
        if (newScore >= 3) {
          setMessage(`You Win! Final Score: ${newScore}/${totalShots}`);
        } else {
          setMessage(`You Lose! Final Score: ${newScore}/${totalShots}`);
        }
      }, 700);
    }
  };

  const restartGame = () => {
    setScore(0);
    setShots(0);
    setMessage("Choose a direction to shoot!");
    setKeeperMove("Center");
    setBallMove("");
    setGameOver(false);
    setLastShot("");
  };

  return (
    <div className="game-page">
      <div className="stadium-lights"></div>

      <div className="game-card">
        <h1>Football Penalty Shootout</h1>
        <p className="subtitle">Score 3 or more goals in 5 shots to win</p>

        <div className="scoreboard">
          <div>
            <span>Score</span>
            <strong>{score}</strong>
          </div>

          <div>
            <span>Shots</span>
            <strong>
              {shots}/{totalShots}
            </strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{gameOver ? "Finished" : "Playing"}</strong>
          </div>
        </div>

        <div className="field">
          <div className="goalpost">
            <div className="net-lines"></div>

            <div className={`goalkeeper keeper-${keeperMove.toLowerCase()}`}>
              🧤
            </div>

            {ballMove && (
              <div className={`ball ball-${ballMove.toLowerCase()}`}>
                ⚽
              </div>
            )}
          </div>

          <div className="player-area">
            <div className="player">🧍‍♂️</div>
            <div className="penalty-spot"></div>
          </div>
        </div>

        <div className="message-box">
          <p>{message}</p>
          {lastShot && !gameOver && (
            <small>Your last shot: {lastShot}</small>
          )}
        </div>

        <div className="buttons">
          <button onClick={() => shoot("Left")} disabled={gameOver}>
            Shoot Left
          </button>

          <button onClick={() => shoot("Center")} disabled={gameOver}>
            Shoot Center
          </button>

          <button onClick={() => shoot("Right")} disabled={gameOver}>
            Shoot Right
          </button>
        </div>

        {gameOver && (
          <button className="restart-btn" onClick={restartGame}>
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
}

export default App;