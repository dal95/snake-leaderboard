import state from './state'
import { gameBoard, getGridSize } from './init'

export function randomGridPosition () {
  state.GRID_SIZE = getGridSize(gameBoard)
  console.log('random', state.GRID_SIZE)
  return {
    x: Math.floor(Math.random() * state.GRID_SIZE.x) || 1,
    y: Math.floor(Math.random() * state.GRID_SIZE.y) || 1
  }
}

export function outsideGrid (position) {
  return (
    position.x < 1 ||
    position.x >= state.GRID_SIZE.x ||
    position.y < 1 ||
    position.y > state.GRID_SIZE.y
  )
}
