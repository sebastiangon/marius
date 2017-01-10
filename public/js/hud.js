class hud {
  constructor(game, hudInfo) {
    const style = {
      font: 'bold 16pt Arial',
      fill: '#ffffff',
    }
    const score = this.buildScore(hudInfo.score);
    this.scoreEl = game.add.text(20, 20, score, style);

    this.getScoreElement = this.getScoreElement.bind(this);
    this.setScore = this.setScore.bind(this);

  }

  buildScore(score) {
    return `Score: ${score}`;
  }

  setScore(score) {
    console.log(this.scoreEl);
      this.scoreEl.text = this.buildScore(score);
  }

  getScoreElement() {
    return this.scoreEl;
  }
}

export default hud;
