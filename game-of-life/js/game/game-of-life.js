//
// The top-level game manager
//
function GameOfLifeManager(
  gridElement,
  _,
  _,
  statusBarContainer
) {
  const state = new GameOfLifeState();

  // Renders the maze
  var renderer = Renderer(
    null,
    gridElement
  );

  // The status bar at the bottom of the screen
  var statusBar = StatusBar(statusBarContainer, {
    setRunningState: (value) => {
      state.setRunningState(value, renderFrame);
    },
    getRunningState: () => state.isRunning
  });

  return {
    // start a new maze
    startMaze: startMaze,
  };

  function startMaze(maze) {
    setMaze(maze);
  }

  // the render loop.
  function renderFrame() {
    /* Run one Game of Life step. */
    state.currentMaze = runLifeStep(state.currentMaze);
    setMaze(state.currentMaze);

    // do it again
    state.renderTimeoutHander = setTimeout(renderFrame, state.updateInterval);
  }

  function runLifeStep(grid) {
    const nextGrid = grid.map.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
        const liveNeighborCount =
          countLiveNeighbors(rowIndex, columnIndex, grid.map);
        if (isAlive(cell)) {
          if (liveNeighborCount < 2) {
            return ' ';
          }
          if (liveNeighborCount <= 3) {
            return 'X';
          }
          return ' ';
        }
        if (liveNeighborCount === 3) {
          return 'X';
        }
        return ' ';
      })
    });

    return {...grid, map: nextGrid};
  }

  function countLiveNeighbors(row, col, gridArray) {
    // neighbors from top-left
    // Note this function effectively treats cells beyond the size of the
    // original maze as dead

    const neighbors = [];
    if (row - 1 >= 0) {
      (col - 1 >= 0) ? neighbors.push(gridArray[row - 1][col - 1]) : null;
      neighbors.push(gridArray[row - 1][col]);
      (col + 1 < gridArray.length) ?
        neighbors.push(gridArray[row - 1][col + 1]) : null;
    }
    (col - 1 >= 0) ? neighbors.push(gridArray[row][col - 1]) : null;
    (col + 1 < gridArray.length) ?
      neighbors.push(gridArray[row][col + 1]) : null;
    if (row + 1 < gridArray.length) {
      (col - 1 >= 0) ? neighbors.push(gridArray[row + 1][col - 1]) : null;
      gridArray[row + 1][col];
      (col + 1 < gridArray.length) ?
        neighbors.push(gridArray[row + 1][col + 1]) : null;
    }
    return neighbors.reduce((count, neighbor) => {
      return count + (isAlive(neighbor) ? 1 : 0);
    }, 0);
  }

  function isAlive(cell) {
    return cell.trim().length > 0;
  }

  // Configure the gmae with a new maze
  function setMaze(maze) {
    state.currentMaze = maze;

    // set the map in the renderer, which will kick off map rendering etc.
    renderer.setGrid(maze.map);
    statusBar.setMaze(maze);
  }
}
