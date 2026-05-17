* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button {
  font-family: inherit;
}

body {
  font-family: Inter, Arial, Helvetica, sans-serif;
  background: #020617;
  color: #f8fafc;
}

.app {
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 10%, color-mix(in srgb, var(--team-primary) 45%, transparent), transparent 30%),
    radial-gradient(circle at 80% 0%, color-mix(in srgb, var(--opp-primary) 45%, transparent), transparent 30%),
    linear-gradient(135deg, #020617, #08111f 40%, #020617);
  position: relative;
  overflow-x: hidden;
  padding: 24px;
}

.bg-orb {
  position: fixed;
  width: 360px;
  height: 360px;
  border-radius: 999px;
  filter: blur(70px);
  opacity: 0.22;
  pointer-events: none;
}

.orb-one {
  background: var(--team-accent);
  left: -120px;
  top: 30%;
}

.orb-two {
  background: var(--opp-accent);
  right: -130px;
  bottom: 10%;
}

.home-screen,
.setup-screen,
.match-screen {
  width: min(1180px, 100%);
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.home-screen {
  min-height: calc(100vh - 48px);
  display: grid;
  place-items: center;
  gap: 24px;
}

.hero-card {
  width: min(850px, 100%);
  background: rgba(15, 23, 42, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 35px 100px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(18px);
  border-radius: 34px;
  padding: 58px 38px;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.hero-card::before {
  content: "";
  position: absolute;
  inset: -2px;
  background:
    linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.16), transparent),
    linear-gradient(135deg, var(--team-primary), transparent, var(--team-accent));
  opacity: 0.28;
  z-index: -1;
}

.eyebrow {
  display: inline-flex;
  padding: 8px 14px;
  background: rgba(34, 197, 94, 0.12);
  color: #86efac;
  border: 1px solid rgba(134, 239, 172, 0.22);
  border-radius: 999px;
  margin-bottom: 22px;
  font-weight: 800;
  letter-spacing: 0.03em;
}

.hero-card h1 {
  font-size: clamp(42px, 8vw, 84px);
  line-height: 0.94;
  margin-bottom: 20px;
  letter-spacing: -0.07em;
}

.hero-card p {
  width: min(630px, 100%);
  margin: 0 auto 28px;
  color: #cbd5e1;
  font-size: 18px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.primary-btn,
.ghost-btn,
.start-match-btn,
.shoot-btn,
.tiny-btn,
.back-btn,
.sound-btn {
  border: none;
  cursor: pointer;
  transition: 0.22s ease;
}

.primary-btn,
.start-match-btn,
.shoot-btn {
  color: white;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 18px 42px rgba(34, 197, 94, 0.26);
  border-radius: 999px;
  padding: 15px 26px;
  font-size: 16px;
  font-weight: 900;
}

.primary-btn:hover,
.start-match-btn:hover,
.shoot-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 52px rgba(34, 197, 94, 0.34);
}

.ghost-btn,
.tiny-btn,
.back-btn,
.sound-btn {
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  padding: 14px 22px;
  font-weight: 800;
}

.tiny-btn {
  padding: 10px 16px;
  color: #94a3b8;
}

.stats-grid {
  width: min(850px, 100%);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.stats-grid div {
  background: rgba(15, 23, 42, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  padding: 20px;
  text-align: center;
}

.stats-grid span {
  display: block;
  color: #94a3b8;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
}

.stats-grid strong {
  font-size: 32px;
  color: #f8fafc;
}

.setup-screen {
  padding: 18px 0 70px;
}

.setup-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
}

.setup-header h2 {
  font-size: clamp(28px, 5vw, 48px);
  letter-spacing: -0.04em;
}

.setup-header p,
.choice-box p {
  color: #94a3b8;
  margin-top: 6px;
}

.setup-section,
.choice-box {
  background: rgba(15, 23, 42, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 28px;
  padding: 24px;
  margin-bottom: 18px;
  backdrop-filter: blur(15px);
}

.setup-section h3,
.choice-box h3 {
  margin-bottom: 16px;
  font-size: 21px;
}

.team-grid,
.player-grid {
  display: grid;
  gap: 14px;
}

.team-grid {
  grid-template-columns: repeat(5, 1fr);
}

.player-grid {
  grid-template-columns: repeat(4, 1fr);
}

.team-card,
.player-card {
  min-height: 130px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--card-primary, #334155) 55%, transparent), rgba(255, 255, 255, 0.05)),
    rgba(255, 255, 255, 0.06);
  color: white;
  border-radius: 22px;
  padding: 18px;
  text-align: left;
  cursor: pointer;
  transition: 0.22s ease;
  position: relative;
  overflow: hidden;
}

.player-card {
  background: rgba(255, 255, 255, 0.06);
}

.team-card::after {
  content: "";
  position: absolute;
  width: 95px;
  height: 95px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--card-accent, #22c55e) 55%, transparent);
  right: -28px;
  bottom: -28px;
  opacity: 0.3;
}

.team-card:hover,
.player-card:hover,
.team-card.selected,
.player-card.selected {
  transform: translateY(-5px);
  border-color: rgba(134, 239, 172, 0.55);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
}

.flag,
.player-icon {
  font-size: 36px;
  display: block;
  margin-bottom: 14px;
}

.team-card strong,
.player-card strong {
  display: block;
  font-size: 17px;
  margin-bottom: 4px;
}

.team-card small,
.player-card p {
  color: #cbd5e1;
}

.player-card p {
  font-size: 13px;
  line-height: 1.45;
  margin: 8px 0 14px;
}

.mini-stats {
  display: grid;
  gap: 6px;
  color: #86efac;
  font-size: 12px;
  font-weight: 800;
}

.setup-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.option-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.option {
  flex: 1;
  min-width: 110px;
  padding: 13px 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.07);
  color: #e2e8f0;
  font-weight: 900;
  cursor: pointer;
}

.option.active {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
}

.start-match-btn {
  width: 100%;
  margin-top: 8px;
  padding: 18px 28px;
  font-size: 18px;
}

.match-screen {
  min-height: calc(100vh - 48px);
  padding-bottom: 30px;
}

.match-header {
  display: grid;
  grid-template-columns: 160px 1fr 70px;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.round-badge,
.scoreboard,
.match-meta,
.control-panel,
.result-card {
  background: rgba(15, 23, 42, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(15px);
}

.round-badge {
  border-radius: 999px;
  padding: 14px 16px;
  text-align: center;
  font-weight: 1000;
  color: #86efac;
}

.scoreboard {
  border-radius: 28px;
  padding: 14px 18px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 18px;
}

.score-team {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 1000;
  font-size: 20px;
}

.score-team span {
  font-size: 28px;
}

.score-team.right {
  justify-content: flex-end;
}

.score-number {
  font-size: clamp(32px, 6vw, 54px);
  font-weight: 1000;
  letter-spacing: -0.05em;
}

.score-number span {
  color: #94a3b8;
}

.sound-btn {
  height: 54px;
  width: 54px;
  padding: 0;
  font-size: 22px;
}

.match-meta {
  border-radius: 24px;
  padding: 14px 18px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 18px;
  margin-bottom: 16px;
}

.match-meta span {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}

.big-status {
  min-width: 230px;
  text-align: center;
  font-size: clamp(20px, 3vw, 34px);
  font-weight: 1000;
  color: #f8fafc;
  letter-spacing: -0.04em;
  animation: popText 0.35s ease;
}

@keyframes popText {
  from {
    transform: scale(0.88);
    opacity: 0.5;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.dots {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.dots i {
  width: 15px;
  height: 15px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.dots i.done {
  background: #22c55e;
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.6);
}

.dots i.enemy {
  background: #ef4444;
  box-shadow: 0 0 18px rgba(239, 68, 68, 0.6);
}

.stadium {
  min-height: 470px;
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.15), rgba(2, 6, 23, 0.85)),
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.18), transparent 22%),
    linear-gradient(180deg, #101827 0%, #0f172a 36%, #14532d 37%, #166534 100%);
  border-radius: 34px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.55), 0 30px 80px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  margin-bottom: 16px;
}

.crowd {
  height: 95px;
  background:
    radial-gradient(circle, rgba(255, 255, 255, 0.28) 1px, transparent 2px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05));
  background-size: 18px 18px, 100% 100%;
  opacity: 0.5;
}

.floodlight {
  position: absolute;
  top: 35px;
  width: 240px;
  height: 240px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.38), transparent 68%);
  filter: blur(4px);
}

.left-light {
  left: 7%;
}

.right-light {
  right: 7%;
}

.goal-area {
  position: absolute;
  inset: 72px 30px 0;
  display: grid;
  place-items: center;
}

.goal-frame {
  width: min(680px, 90%);
  height: 260px;
  border: 9px solid #f8fafc;
  border-bottom: none;
  border-radius: 18px 18px 0 0;
  position: relative;
  background: rgba(255, 255, 255, 0.06);
  box-shadow:
    0 0 34px rgba(255, 255, 255, 0.14),
    inset 0 0 40px rgba(255, 255, 255, 0.08);
  overflow: hidden;
  transform: perspective(800px) rotateX(1deg);
}

.net {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
  background-size: 38px 38px;
  opacity: 0.75;
}

.keeper {
  position: absolute;
  z-index: 4;
  font-size: 74px;
  left: 50%;
  bottom: 35px;
  transform: translateX(-50%);
  transition: 0.42s cubic-bezier(0.2, 0.8, 0.2, 1);
  filter: drop-shadow(0 18px 18px rgba(0, 0, 0, 0.55));
}

.keeper-tl {
  left: 20%;
  bottom: 135px;
  transform: translateX(-50%) rotate(-28deg) scale(1.08);
}

.keeper-tc {
  left: 50%;
  bottom: 145px;
  transform: translateX(-50%) scale(1.08);
}

.keeper-tr {
  left: 80%;
  bottom: 135px;
  transform: translateX(-50%) rotate(28deg) scale(1.08);
}

.keeper-bl {
  left: 20%;
  bottom: 40px;
  transform: translateX(-50%) rotate(-38deg) scale(1.05);
}

.keeper-c {
  left: 50%;
  bottom: 45px;
  transform: translateX(-50%);
}

.keeper-br {
  left: 80%;
  bottom: 40px;
  transform: translateX(-50%) rotate(38deg) scale(1.05);
}

.ball {
  position: absolute;
  z-index: 5;
  left: 50%;
  bottom: -18px;
  font-size: 42px;
  filter: drop-shadow(0 18px 18px rgba(0, 0, 0, 0.4));
  animation: ballShot 0.75s cubic-bezier(0.18, 0.9, 0.28, 1) forwards;
}

.ball-tl {
  --ball-x: -270px;
  --ball-y: -218px;
}

.ball-tc {
  --ball-x: 0px;
  --ball-y: -230px;
}

.ball-tr {
  --ball-x: 270px;
  --ball-y: -218px;
}

.ball-bl {
  --ball-x: -270px;
  --ball-y: -105px;
}

.ball-c {
  --ball-x: 0px;
  --ball-y: -118px;
}

.ball-br {
  --ball-x: 270px;
  --ball-y: -105px;
}

@keyframes ballShot {
  0% {
    transform: translateX(-50%) translate(0, 0) scale(1.1);
  }
  60% {
    transform: translateX(-50%) translate(calc(var(--ball-x) * 0.72), calc(var(--ball-y) * 0.72)) scale(0.82);
  }
  100% {
    transform: translateX(-50%) translate(var(--ball-x), var(--ball-y)) scale(0.62);
  }
}

.pitch-lines {
  width: min(720px, 92%);
  height: 170px;
  margin-top: -2px;
  border: 3px solid rgba(255, 255, 255, 0.42);
  border-bottom: none;
  border-radius: 0 0 50% 50%;
  position: relative;
}

.penalty-arc {
  width: 260px;
  height: 95px;
  border: 3px solid rgba(255, 255, 255, 0.38);
  border-bottom: none;
  border-radius: 180px 180px 0 0;
  position: absolute;
  left: 50%;
  top: 28px;
  transform: translateX(-50%);
}

.penalty-spot {
  width: 14px;
  height: 14px;
  background: #f8fafc;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 88px;
  transform: translateX(-50%);
  box-shadow: 0 0 22px rgba(255, 255, 255, 0.55);
}

.player-avatar {
  position: absolute;
  left: 50%;
  top: 106px;
  transform: translateX(-50%);
  width: 72px;
  height: 72px;
  border-radius: 24px;
  display: grid;
  place-items: center;
  font-size: 34px;
  background:
    linear-gradient(135deg, var(--team-primary), var(--team-accent));
  border: 2px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.35);
}

.control-panel {
  border-radius: 30px;
  padding: 18px;
  display: grid;
  grid-template-columns: 1.1fr 1fr 1.1fr;
  gap: 16px;
}

.message-card,
.aim-panel,
.power-panel {
  background: rgba(2, 6, 23, 0.54);
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 24px;
  padding: 18px;
}

.message-card strong {
  font-size: 24px;
  display: block;
  margin-bottom: 8px;
}

.message-card p {
  color: #cbd5e1;
  line-height: 1.5;
}

.combo-badge,
.danger-badge {
  display: inline-flex;
  margin-top: 14px;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 1000;
}

.combo-badge {
  background: rgba(249, 115, 22, 0.18);
  color: #fdba74;
}

.danger-badge {
  background: rgba(239, 68, 68, 0.18);
  color: #fca5a5;
  margin-left: 6px;
}

.aim-panel h3,
.power-panel h3 {
  margin-bottom: 13px;
}

.aim-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
}

.aim {
  min-height: 66px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  background: rgba(255, 255, 255, 0.07);
  color: white;
  border-radius: 16px;
  cursor: pointer;
  transition: 0.2s;
}

.aim span {
  display: block;
  font-weight: 1000;
  font-size: 18px;
}

.aim small {
  color: #94a3b8;
  font-weight: 700;
}

.aim.active {
  background: linear-gradient(135deg, var(--team-primary), var(--team-accent));
  transform: translateY(-3px);
  box-shadow: 0 14px 30px color-mix(in srgb, var(--team-accent) 30%, transparent);
}

.power-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.power-title strong {
  font-size: 24px;
  color: #86efac;
}

.power-track {
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  margin: 18px 0 8px;
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.zone {
  position: absolute;
  top: 0;
  bottom: 0;
  opacity: 0.58;
}

.red-zone {
  left: 0%;
  width: 25%;
  background: #ef4444;
}

.yellow-zone {
  left: 25%;
  width: 32%;
  background: #eab308;
}

.green-zone {
  left: 57%;
  width: 16%;
  background: #22c55e;
}

.gold-zone {
  left: 73%;
  width: 13%;
  background: #f59e0b;
  opacity: 0.85;
}

.power-fill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.22);
}

.power-pointer {
  position: absolute;
  top: -5px;
  bottom: -5px;
  width: 5px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.75);
}

.power-labels {
  display: flex;
  justify-content: space-between;
  color: #94a3b8;
  font-size: 11px;
  font-weight: 900;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.shoot-btn {
  width: 100%;
  font-size: 18px;
  padding: 16px 20px;
}

.shoot-btn:disabled,
.aim:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.result-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(12px);
  z-index: 20;
  display: grid;
  place-items: center;
  padding: 22px;
}

.result-card {
  width: min(460px, 100%);
  text-align: center;
  border-radius: 34px;
  padding: 34px;
  box-shadow: 0 30px 120px rgba(0, 0, 0, 0.5);
}

.trophy {
  font-size: 76px;
  margin-bottom: 14px;
  animation: trophyPop 0.7s ease infinite alternate;
}

@keyframes trophyPop {
  from {
    transform: translateY(0) scale(1);
  }
  to {
    transform: translateY(-6px) scale(1.05);
  }
}

.result-card h2 {
  font-size: 34px;
  margin-bottom: 10px;
}

.result-card p {
  color: #cbd5e1;
  margin-bottom: 22px;
}

.goal-flash .stadium {
  animation: stadiumFlash 0.42s ease;
}

@keyframes stadiumFlash {
  0% {
    filter: brightness(1);
  }
  45% {
    filter: brightness(1.45);
  }
  100% {
    filter: brightness(1);
  }
}

@media (max-width: 980px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .player-grid,
  .setup-bottom,
  .control-panel {
    grid-template-columns: 1fr;
  }

  .match-header,
  .match-meta {
    grid-template-columns: 1fr;
  }

  .round-badge,
  .sound-btn {
    width: 100%;
  }

  .sound-btn {
    height: 48px;
  }

  .big-status {
    min-width: auto;
  }

  .scoreboard {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .score-team,
  .score-team.right {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .app {
    padding: 14px;
  }

  .hero-card {
    padding: 38px 20px;
    border-radius: 26px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .setup-section,
  .choice-box {
    padding: 18px;
  }

  .stadium {
    min-height: 390px;
  }

  .goal-area {
    inset: 68px 10px 0;
  }

  .goal-frame {
    width: 94%;
    height: 210px;
    border-width: 7px;
  }

  .keeper {
    font-size: 58px;
  }

  .ball {
    font-size: 34px;
  }

  .ball-tl {
    --ball-x: -130px;
    --ball-y: -175px;
  }

  .ball-tc {
    --ball-x: 0px;
    --ball-y: -182px;
  }

  .ball-tr {
    --ball-x: 130px;
    --ball-y: -175px;
  }

  .ball-bl {
    --ball-x: -130px;
    --ball-y: -90px;
  }

  .ball-c {
    --ball-x: 0px;
    --ball-y: -100px;
  }

  .ball-br {
    --ball-x: 130px;
    --ball-y: -90px;
  }

  .keeper-tl {
    left: 20%;
    bottom: 110px;
  }

  .keeper-tc {
    bottom: 118px;
  }

  .keeper-tr {
    left: 80%;
    bottom: 110px;
  }

  .pitch-lines {
    height: 138px;
  }

  .player-avatar {
    top: 92px;
    width: 60px;
    height: 60px;
  }

  .aim-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
//test comment..