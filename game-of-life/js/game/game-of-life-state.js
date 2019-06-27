// Game of life state object
class GameOfLifeState {
  constructor() {
    this.currentMaze = null;
    this.onSolution = null;
    this.currentPosition = null;
    this.moves = [];
    this.updateInterval = 100;
    this._isRunning = false;
    this.renderTimeoutHander = null;
  }

  get isRunning() {
    return this._isRunning;
  }

  setRunningState(value, renderFrame) {
    this._isRunning = value;
    if (value) {
      renderFrame();
      return;
    }
    clearTimeout(this.renderTimeoutHander);
    this.renderTimeoutHander = null;
  }
}
