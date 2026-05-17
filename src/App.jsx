import { useEffect, useMemo, useState } from "react";
import "./App.css";

const TEAMS = [
  { id: "bd", name: "Bangladesh", code: "BAN", flag: "🇧🇩", primary: "#006A4E", accent: "#F42A41" },
  { id: "arg", name: "Argentina", code: "ARG", flag: "🇦🇷", primary: "#75AADB", accent: "#FFFFFF" },
  { id: "bra", name: "Brazil", code: "BRA", flag: "🇧🇷", primary: "#FDD000", accent: "#009B3A" },
  { id: "fra", name: "France", code: "FRA", flag: "🇫🇷", primary: "#002654", accent: "#ED2939" },
  { id: "ger", name: "Germany", code: "GER", flag: "🇩🇪", primary: "#111827", accent: "#FACC15" },
  { id: "por", name: "Portugal", code: "POR", flag: "🇵🇹", primary: "#006600", accent: "#FF0000" },
  { id: "esp", name: "Spain", code: "ESP", flag: "🇪🇸", primary: "#AA151B", accent: "#F1BF00" },
  { id: "eng", name: "England", code: "ENG", flag: "🏴", primary: "#FFFFFF", accent: "#C8102E" },
  { id: "jpn", name: "Japan", code: "JPN", flag: "🇯🇵", primary: "#FFFFFF", accent: "#BC002D" },
  { id: "mar", name: "Morocco", code: "MAR", flag: "🇲🇦", primary: "#C1272D", accent: "#006233" }
];

const PLAYERS = [
  {
    id: "power",
    name: "Power Shooter",
    icon: "💥",
    power: 94,
    accuracy: 72,
    curve: 58,
    clutch: 70,
    desc: "Fast, powerful shots. Best for aggressive play."
  },
  {
    id: "skill",
    name: "Skill Master",
    icon: "🎯",
    power: 74,
    accuracy: 94,
    curve: 88,
    clutch: 78,
    desc: "Accurate and curved shots. Best for smart players."
  },
  {
    id: "balanced",
    name: "Balanced Star",
    icon: "⭐",
    power: 82,
    accuracy: 84,
    curve: 78,
    clutch: 80,
    desc: "Balanced power, aim, and control."
  },
  {
    id: "captain",
    name: "Clutch Captain",
    icon: "👑",
    power: 80,
    accuracy: 82,
    curve: 76,
    clutch: 96,
    desc: "Strong under pressure, especially in final shots."
  }
];

const DIFFICULTIES = {
  easy: {
    label: "Easy",
    keeperSkill: 0.24,
    predictChance: 0.05,
    opponentSkill: 0.58,
    desc: "Good for practice."
  },
  medium: {
    label: "Medium",
    keeperSkill: 0.36,
    predictChance: 0.18,
    opponentSkill: 0.68,
    desc: "Balanced challenge."
  },
  hard: {
    label: "Hard",
    keeperSkill: 0.48,
    predictChance: 0.34,
    opponentSkill: 0.77,
    desc: "Keeper learns your pattern."
  }
};

const AIMS = [
  { id: "tl", label: "Top Left", short: "TL" },
  { id: "tc", label: "Top Center", short: "TC" },
  { id: "tr", label: "Top Right", short: "TR" },
  { id: "bl", label: "Bottom Left", short: "BL" },
  { id: "c", label: "Center", short: "C" },
  { id: "br", label: "Bottom Right", short: "BR" }
];

const TOURNAMENT_ROUNDS = ["Round of 16", "Quarter Final", "Semi Final", "Final"];
const QUICK_ROUNDS = ["Quick Match"];

const DEFAULT_STATS = {
  matches: 0,
  wins: 0,
  losses: 0,
  trophies: 0,
  perfectShots: 0,
  bestStreak: 0,
  currentStreak: 0
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function loadStats() {
  try {
    const saved = localStorage.getItem("worldPenaltyCupStats");
    return saved ? { ...DEFAULT_STATS, ...JSON.parse(saved) } : DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

function getMostUsedAim(history) {
  if (!history.length) return randomItem(AIMS).id;

  const count = {};
  history.forEach((item) => {
    count[item] = (count[item] || 0) + 1;
  });

  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
}

function createOpponentList(userTeamId, total) {
  const pool = TEAMS.filter((team) => team.id !== userTeamId);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, total);
}

function createTone(type) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    const config = {
      goal: { frequency: 660, duration: 0.16 },
      save: { frequency: 180, duration: 0.18 },
      win: { frequency: 880, duration: 0.28 },
      loss: { frequency: 120, duration: 0.22 },
      click: { frequency: 440, duration: 0.08 }
    };

    const selected = config[type] || config.click;

    oscillator.frequency.value = selected.frequency;
    oscillator.type = "sine";
    gain.gain.value = 0.06;

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + selected.duration);
  } catch {
    // Audio may be blocked by browser. Game still works.
  }
}

function App() {
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("tournament");
  const [selectedTeam, setSelectedTeam] = useState(TEAMS[0]);
  const [selectedPlayer, setSelectedPlayer] = useState(PLAYERS[2]);
  const [difficulty, setDifficulty] = useState("medium");
  const [soundOn, setSoundOn] = useState(true);

  const [stats, setStats] = useState(loadStats);

  const [opponents, setOpponents] = useState([]);
  const [roundIndex, setRoundIndex] = useState(0);

  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [userShots, setUserShots] = useState(0);
  const [opponentShots, setOpponentShots] = useState(0);
  const [suddenDeath, setSuddenDeath] = useState(false);

  const [selectedAim, setSelectedAim] = useState("tr");
  const [powerValue, setPowerValue] = useState(54);
  const [powerDirection, setPowerDirection] = useState(1);

  const [keeperMove, setKeeperMove] = useState("c");
  const [ballMove, setBallMove] = useState("");
  const [message, setMessage] = useState("Choose your aim and stop the power bar.");
  const [bigText, setBigText] = useState("READY?");
  const [lastResult, setLastResult] = useState("");
  const [shotHistory, setShotHistory] = useState([]);
  const [combo, setCombo] = useState(0);

  const [locked, setLocked] = useState(false);
  const [matchFinished, setMatchFinished] = useState(false);
  const [roundOutcome, setRoundOutcome] = useState("");

  const activeRounds = mode === "tournament" ? TOURNAMENT_ROUNDS : QUICK_ROUNDS;
  const currentOpponent = opponents[roundIndex] || TEAMS[1];
  const roundName = activeRounds[roundIndex] || "Final";

  const isFinal = roundIndex === activeRounds.length - 1;
  const difficultyData = DIFFICULTIES[difficulty];

  const themeStyle = {
    "--team-primary": selectedTeam.primary,
    "--team-accent": selectedTeam.accent,
    "--opp-primary": currentOpponent.primary,
    "--opp-accent": currentOpponent.accent
  };

  useEffect(() => {
    localStorage.setItem("worldPenaltyCupStats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    if (screen !== "match" || locked || matchFinished) return;

    const interval = setInterval(() => {
      setPowerValue((prev) => {
        const next = prev + powerDirection * 2.6;

        if (next >= 100) {
          setPowerDirection(-1);
          return 100;
        }

        if (next <= 0) {
          setPowerDirection(1);
          return 0;
        }

        return next;
      });
    }, 38);

    return () => clearInterval(interval);
  }, [screen, locked, matchFinished, powerDirection]);

  const shotDots = useMemo(() => {
    const total = suddenDeath ? Math.max(userShots, 5) + 1 : 5;
    return Array.from({ length: total }, (_, index) => index);
  }, [suddenDeath, userShots]);

  function playSound(type) {
    if (soundOn) createTone(type);
  }

  function resetMatchState() {
    setUserScore(0);
    setOpponentScore(0);
    setUserShots(0);
    setOpponentShots(0);
    setSuddenDeath(false);
    setSelectedAim("tr");
    setPowerValue(54);
    setPowerDirection(1);
    setKeeperMove("c");
    setBallMove("");
    setMessage("Choose your aim and stop the power bar.");
    setBigText("READY?");
    setLastResult("");
    setShotHistory([]);
    setCombo(0);
    setLocked(false);
    setMatchFinished(false);
    setRoundOutcome("");
  }

  function startGame() {
    playSound("click");
    const list = createOpponentList(selectedTeam.id, activeRounds.length);
    setOpponents(list);
    setRoundIndex(0);
    resetMatchState();
    setScreen("match");
  }

  function chooseKeeperDirection() {
    const shouldPredict = Math.random() < difficultyData.predictChance;

    if (shouldPredict && shotHistory.length >= 2) {
      return getMostUsedAim(shotHistory);
    }

    return randomItem(AIMS).id;
  }

  function resolveUserShot(aim, power) {
    const keeper = chooseKeeperDirection();

    const perfectPower = power >= 73 && power <= 86;
    const goodPower = power >= 56 && power <= 92;
    const pressureBonus = isFinal || suddenDeath ? (selectedPlayer.clutch - 75) / 350 : 0;
    const accuracyBonus = (selectedPlayer.accuracy - 75) / 320;
    const curveBonus = (selectedPlayer.curve - 70) / 450;
    const powerBonus = (selectedPlayer.power - 75) / 420;

    const missChance = clamp(
      0.05 +
        (!goodPower ? 0.14 : 0) +
        (power < 25 ? 0.24 : 0) +
        (power > 94 ? 0.22 : 0) -
        accuracyBonus -
        pressureBonus,
      0.02,
      0.58
    );

    if (Math.random() < missChance) {
      const missType = power > 90 ? "CROSSBAR!" : Math.random() > 0.5 ? "MISS!" : "HIT THE POST!";
      return {
        goal: false,
        perfect: false,
        result: missType,
        keeper,
        text: `${missType} Power was ${Math.round(power)}%.`
      };
    }

    if (perfectPower && Math.random() < 0.68 + pressureBonus) {
      return {
        goal: true,
        perfect: true,
        result: "PERFECT SHOT!",
        keeper,
        text: `PERFECT SHOT! Keeper had no chance.`
      };
    }

    const sameDirection = keeper === aim;
    const saveChance = clamp(
      difficultyData.keeperSkill +
        (sameDirection ? 0.34 : -0.18) +
        (!goodPower ? 0.16 : 0) -
        (perfectPower ? 0.22 : 0) -
        curveBonus -
        powerBonus,
      0.04,
      0.88
    );

    if (sameDirection && Math.random() < saveChance) {
      return {
        goal: false,
        perfect: false,
        result: "SAVED!",
        keeper,
        text: `SAVED! Keeper predicted ${AIMS.find((x) => x.id === aim)?.label}.`
      };
    }

    if (Math.random() < 0.055 && !perfectPower) {
      return {
        goal: false,
        perfect: false,
        result: "HIT THE POST!",
        keeper,
        text: `HIT THE POST! So close.`
      };
    }

    return {
      goal: true,
      perfect: false,
      result: "GOAL!",
      keeper,
      text: `GOAL! ${selectedTeam.code} scores.`
    };
  }

  function resolveOpponentShot() {
    const opponentAim = randomItem(AIMS).id;
    const userKeeperGuess = randomItem(AIMS).id;

    const pressure = suddenDeath || isFinal ? 0.04 : 0;
    const opponentGoalChance = clamp(
      difficultyData.opponentSkill + roundIndex * 0.025 + pressure,
      0.45,
      0.9
    );

    if (userKeeperGuess === opponentAim && Math.random() < 0.36) {
      return {
        goal: false,
        aim: opponentAim,
        keeper: userKeeperGuess,
        result: "YOUR KEEPER SAVED!",
        text: `${selectedTeam.code} keeper saves the opponent shot.`
      };
    }

    if (Math.random() > opponentGoalChance) {
      return {
        goal: false,
        aim: opponentAim,
        keeper: userKeeperGuess,
        result: "OPPONENT MISSED!",
        text: `${currentOpponent.code} missed the target.`
      };
    }

    return {
      goal: true,
      aim: opponentAim,
      keeper: userKeeperGuess,
      result: "OPPONENT GOAL!",
      text: `${currentOpponent.code} scores.`
    };
  }

  function updateStatsAfterRound(outcome) {
    setStats((prev) => {
      const won = outcome === "win";
      const nextCurrentStreak = won ? prev.currentStreak + 1 : 0;

      return {
        ...prev,
        matches: prev.matches + 1,
        wins: prev.wins + (won ? 1 : 0),
        losses: prev.losses + (won ? 0 : 1),
        trophies: prev.trophies + (won && isFinal ? 1 : 0),
        bestStreak: Math.max(prev.bestStreak, nextCurrentStreak),
        currentStreak: nextCurrentStreak
      };
    });
  }

  function concludeRound(finalUserScore, finalOpponentScore) {
    const outcome = finalUserScore > finalOpponentScore ? "win" : "loss";

    setRoundOutcome(outcome);
    setMatchFinished(true);
    setLocked(false);

    updateStatsAfterRound(outcome);
    playSound(outcome === "win" ? "win" : "loss");

    if (outcome === "win") {
      setBigText(isFinal ? "CHAMPIONS!" : "ROUND WON!");
      setMessage(
        isFinal
          ? `${selectedTeam.name} wins the World Penalty Cup!`
          : `${selectedTeam.code} advances to the next round.`
      );
    } else {
      setBigText("ELIMINATED!");
      setMessage(`${currentOpponent.code} wins. Your tournament is over.`);
    }
  }

  function evaluateAfterPair(nextUserScore, nextOpponentScore, nextUserShots, nextOpponentShots) {
    const normalFinished = nextUserShots >= 5 && nextOpponentShots >= 5;
    const suddenFinished = suddenDeath && nextUserShots === nextOpponentShots && nextUserScore !== nextOpponentScore;

    if (normalFinished && nextUserScore !== nextOpponentScore) {
      concludeRound(nextUserScore, nextOpponentScore);
      return;
    }

    if (normalFinished && nextUserScore === nextOpponentScore) {
      setSuddenDeath(true);
      setBigText("SUDDEN DEATH!");
      setMessage("Scores are level. One mistake can end the match.");
      setLocked(false);
      return;
    }

    if (suddenFinished) {
      concludeRound(nextUserScore, nextOpponentScore);
      return;
    }

    setLocked(false);
    setBigText("YOUR TURN");
    setMessage("Choose your next shot.");
  }

  function takeShot() {
    if (locked || matchFinished) return;

    playSound("click");
    setLocked(true);
    setBallMove("");
    setLastResult("");

    setTimeout(() => {
      const userResult = resolveUserShot(selectedAim, powerValue);
      const nextUserScore = userScore + (userResult.goal ? 1 : 0);
      const nextUserShots = userShots + 1;

      setKeeperMove(userResult.keeper);
      setBallMove(selectedAim);
      setLastResult(userResult.result);
      setBigText(userResult.result);
      setMessage(userResult.text);
      setUserScore(nextUserScore);
      setUserShots(nextUserShots);
      setShotHistory((prev) => [...prev, selectedAim]);

      if (userResult.goal) {
        playSound("goal");
        setCombo((prev) => prev + 1);
      } else {
        playSound("save");
        setCombo(0);
      }

      if (userResult.perfect) {
        setStats((prev) => ({
          ...prev,
          perfectShots: prev.perfectShots + 1
        }));
      }

      setTimeout(() => {
        const opponentResult = resolveOpponentShot();
        const nextOpponentScore = opponentScore + (opponentResult.goal ? 1 : 0);
        const nextOpponentShots = opponentShots + 1;

        setKeeperMove(opponentResult.keeper);
        setBallMove(opponentResult.aim);
        setLastResult(opponentResult.result);
        setBigText(opponentResult.result);
        setMessage(opponentResult.text);
        setOpponentScore(nextOpponentScore);
        setOpponentShots(nextOpponentShots);

        playSound(opponentResult.goal ? "goal" : "save");

        setTimeout(() => {
          evaluateAfterPair(
            nextUserScore,
            nextOpponentScore,
            nextUserShots,
            nextOpponentShots
          );
        }, 750);
      }, 1150);
    }, 80);
  }

  function nextRound() {
    playSound("click");

    if (roundOutcome === "win" && !isFinal) {
      setRoundIndex((prev) => prev + 1);
      resetMatchState();
      return;
    }

    setScreen("home");
    resetMatchState();
  }

  function resetAllStats() {
    const confirmReset = window.confirm("Reset all local stats?");
    if (!confirmReset) return;

    setStats(DEFAULT_STATS);
    localStorage.removeItem("worldPenaltyCupStats");
  }

  return (
    <div className="app" style={themeStyle}>
      <div className="bg-orb orb-one"></div>
      <div className="bg-orb orb-two"></div>

      {screen === "home" && (
        <main className="home-screen">
          <section className="hero-card">
            <div className="eyebrow">2.5D Arcade Football Game</div>
            <h1>World Penalty Cup Arena</h1>
            <p>
              Choose your country, survive knockout rounds, win penalties, and lift the trophy.
            </p>

            <div className="hero-actions">
              <button className="primary-btn" onClick={() => setScreen("setup")}>
                Start Game
              </button>

              <button className="ghost-btn" onClick={() => setSoundOn((prev) => !prev)}>
                Sound: {soundOn ? "ON" : "OFF"}
              </button>
            </div>
          </section>

          <section className="stats-grid">
            <div>
              <span>Matches</span>
              <strong>{stats.matches}</strong>
            </div>
            <div>
              <span>Wins</span>
              <strong>{stats.wins}</strong>
            </div>
            <div>
              <span>Trophies</span>
              <strong>{stats.trophies}</strong>
            </div>
            <div>
              <span>Perfect Shots</span>
              <strong>{stats.perfectShots}</strong>
            </div>
          </section>

          <button className="tiny-btn" onClick={resetAllStats}>
            Reset Stats
          </button>
        </main>
      )}

      {screen === "setup" && (
        <main className="setup-screen">
          <div className="setup-header">
            <button className="back-btn" onClick={() => setScreen("home")}>
              ← Back
            </button>

            <div>
              <h2>Build Your Cup Squad</h2>
              <p>Select country, player type, match mode, and difficulty.</p>
            </div>
          </div>

          <section className="setup-section">
            <h3>1. Choose Your Country</h3>
            <div className="team-grid">
              {TEAMS.map((team) => (
                <button
                  key={team.id}
                  className={`team-card ${selectedTeam.id === team.id ? "selected" : ""}`}
                  onClick={() => setSelectedTeam(team)}
                  style={{
                    "--card-primary": team.primary,
                    "--card-accent": team.accent
                  }}
                >
                  <span className="flag">{team.flag}</span>
                  <strong>{team.name}</strong>
                  <small>{team.code}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="setup-section">
            <h3>2. Choose Player Type</h3>
            <div className="player-grid">
              {PLAYERS.map((player) => (
                <button
                  key={player.id}
                  className={`player-card ${selectedPlayer.id === player.id ? "selected" : ""}`}
                  onClick={() => setSelectedPlayer(player)}
                >
                  <span className="player-icon">{player.icon}</span>
                  <strong>{player.name}</strong>
                  <p>{player.desc}</p>

                  <div className="mini-stats">
                    <span>Power {player.power}</span>
                    <span>Accuracy {player.accuracy}</span>
                    <span>Curve {player.curve}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="setup-bottom">
            <div className="choice-box">
              <h3>3. Game Mode</h3>
              <div className="option-row">
                <button
                  className={mode === "quick" ? "option active" : "option"}
                  onClick={() => setMode("quick")}
                >
                  Quick Match
                </button>

                <button
                  className={mode === "tournament" ? "option active" : "option"}
                  onClick={() => setMode("tournament")}
                >
                  Tournament
                </button>
              </div>
            </div>

            <div className="choice-box">
              <h3>4. Difficulty</h3>
              <div className="option-row">
                {Object.entries(DIFFICULTIES).map(([key, item]) => (
                  <button
                    key={key}
                    className={difficulty === key ? "option active" : "option"}
                    onClick={() => setDifficulty(key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p>{difficultyData.desc}</p>
            </div>
          </section>

          <button className="start-match-btn" onClick={startGame}>
            Enter Stadium
          </button>
        </main>
      )}

      {screen === "match" && (
        <main className={`match-screen ${lastResult.includes("GOAL") ? "goal-flash" : ""}`}>
          <header className="match-header">
            <div className="round-badge">
              {mode === "tournament" ? roundName : "Quick Match"}
            </div>

            <div className="scoreboard">
              <div className="score-team left">
                <span>{selectedTeam.flag}</span>
                <strong>{selectedTeam.code}</strong>
              </div>

              <div className="score-number">
                {userScore} <span>-</span> {opponentScore}
              </div>

              <div className="score-team right">
                <strong>{currentOpponent.code}</strong>
                <span>{currentOpponent.flag}</span>
              </div>
            </div>

            <button className="sound-btn" onClick={() => setSoundOn((prev) => !prev)}>
              {soundOn ? "🔊" : "🔇"}
            </button>
          </header>

          <section className="match-meta">
            <div>
              <span>Your Shots</span>
              <div className="dots">
                {shotDots.map((dot) => (
                  <i key={`u-${dot}`} className={dot < userShots ? "done" : ""}></i>
                ))}
              </div>
            </div>

            <div className="big-status">{bigText}</div>

            <div>
              <span>Opponent Shots</span>
              <div className="dots">
                {shotDots.map((dot) => (
                  <i key={`o-${dot}`} className={dot < opponentShots ? "done enemy" : ""}></i>
                ))}
              </div>
            </div>
          </section>

          <section className="stadium">
            <div className="crowd"></div>
            <div className="floodlight left-light"></div>
            <div className="floodlight right-light"></div>

            <div className="goal-area">
              <div className="goal-frame">
                <div className="net"></div>
                <div className={`keeper keeper-${keeperMove}`}>🧤</div>

                {ballMove && (
                  <div className={`ball ball-${ballMove}`}>
                    ⚽
                  </div>
                )}
              </div>

              <div className="pitch-lines">
                <div className="penalty-arc"></div>
                <div className="penalty-spot"></div>
                <div className="player-avatar">
                  <span>{selectedPlayer.icon}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="control-panel">
            <div className="message-card">
              <strong>{lastResult || "Match Message"}</strong>
              <p>{message}</p>

              {combo >= 2 && !matchFinished && (
                <span className="combo-badge">
                  🔥 {combo} Goal Combo
                </span>
              )}

              {suddenDeath && !matchFinished && (
                <span className="danger-badge">
                  Sudden Death Active
                </span>
              )}
            </div>

            <div className="aim-panel">
              <h3>Choose Aim</h3>
              <div className="aim-grid">
                {AIMS.map((aim) => (
                  <button
                    key={aim.id}
                    className={selectedAim === aim.id ? "aim active" : "aim"}
                    onClick={() => setSelectedAim(aim.id)}
                    disabled={locked || matchFinished}
                  >
                    <span>{aim.short}</span>
                    <small>{aim.label}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="power-panel">
              <div className="power-title">
                <h3>Power Bar</h3>
                <strong>{Math.round(powerValue)}%</strong>
              </div>

              <div className="power-track">
                <div className="zone red-zone"></div>
                <div className="zone yellow-zone"></div>
                <div className="zone green-zone"></div>
                <div className="zone gold-zone"></div>
                <div className="power-fill" style={{ width: `${powerValue}%` }}></div>
                <div className="power-pointer" style={{ left: `${powerValue}%` }}></div>
              </div>

              <div className="power-labels">
                <span>Weak</span>
                <span>Good</span>
                <span>Perfect</span>
                <span>Risky</span>
              </div>

              <button
                className="shoot-btn"
                onClick={takeShot}
                disabled={locked || matchFinished}
              >
                {locked ? "Playing..." : "Shoot Now"}
              </button>
            </div>
          </section>

          {matchFinished && (
            <div className="result-overlay">
              <div className="result-card">
                <div className="trophy">
                  {roundOutcome === "win" ? (isFinal ? "🏆" : "✅") : "💔"}
                </div>

                <h2>
                  {roundOutcome === "win"
                    ? isFinal
                      ? "You Are Champion!"
                      : "Round Cleared!"
                    : "You Lost!"}
                </h2>

                <p>
                  Final Score: {selectedTeam.code} {userScore} - {opponentScore}{" "}
                  {currentOpponent.code}
                </p>

                <button className="primary-btn" onClick={nextRound}>
                  {roundOutcome === "win" && !isFinal
                    ? "Next Round"
                    : "Back to Home"}
                </button>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default App;