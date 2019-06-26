// bottom of the game -- status bar
function StatusBar(container, { setRunningState, getRunningState }) {
  console.debug(container);

  const startPauseButton = container.querySelector('#start-pause-button');

  startPauseButton.onclick = (event) => {
    const isRunning = getRunningState();
    const buttonText = !isRunning ? 'Pause' : 'Start';
    startPauseButton.innerText = buttonText;
    setRunningState(!isRunning);
  };

  // Set initial button text
  startPauseButton.innerText = 'Start';

  return {
    setMaze: setMaze,
    setPosition: setPosition
  }

  function setMaze(maze) {
    document.getElementById('current-maze').innerText = maze.name;
    setPosition(maze.startingPosition);
  }

  function setPosition(position) {
    document.getElementById('current-position').innerText = position[0] + ', ' + position[1];
  }
}
