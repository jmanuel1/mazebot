class GridContext {
  constructor(gridElement) {
    this._gridRef = gridElement;
  }

  getCellOffset(rowIndex, columnIndex) {
    const gridOffset = this.getGridOffset();
    const cellSize = this.getCellSize();

    return {
      x: gridOffset.x + columnIndex*cellSize,
      y: gridOffset.y + rowIndex*cellSize
    };
  }

  getGridOffset() {
    const rect = this._gridRef.getBoundingClientRect();
    const doc = document.documentElement;
    return {x: (rect.left + window.pageXOffset) - doc.clientLeft,      y: (rect.top + window.pageYOffset) - doc.clientTop}
  }

  addToGrid(element) {
    this._gridRef.appendChild(element);
  }

  getCellSize() {
    // TODO: get this value from the CSS variable
    return 20;
  }
}

// Top-level renderer
// Sets up the renderers for each layer
var Renderer = function (
  coordinates,
  gridElement,
  avatarPathCanvas,
  overlayCanvas
) {
  gridContext = new GridContext(gridElement);
  gridRenderer = GridRenderer(gridContext);

  return { setGrid: (grid) => gridRenderer.setGrid(grid), updateOverlay: () => null, displaySizeChanged: () => null }
}
