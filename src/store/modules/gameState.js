const gameConstants = {
  boardSizeX: 10,
  boardSizeY: 10,
  defaultBoardCell: 0,
  fruitCell: -1,
  scoreIncrement: 1,
  loopInterval: 500
}

const getNewBoard = () => {
  let board = []
  for (var i = 0; i < gameConstants.boardSizeX; i++) {
    board.push([])
    for (var j = 0; j < gameConstants.boardSizeY; j++) {
      board[i].push(gameConstants.defaultBoardCell)
    }
  }
  return board
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getFruitCell = (board) => {
  let fruitCell = {
    x: getRandomInt(0, gameConstants.boardSizeX - 1),
    y: getRandomInt(0, gameConstants.boardSizeY - 1)
  }
  while (board[fruitCell.x][fruitCell.y] !== gameConstants.defaultBoardCell) {
    fruitCell = {
      x: getRandomInt(0, gameConstants.boardSizeX - 1),
      y: getRandomInt(0, gameConstants.boardSizeY - 1)
    }
  }
  return fruitCell
}

// todo: refactor
const findHead = (board) => {
  const head = {
    x: 0,
    y: 0,
    val: gameConstants.defaultBoardCell
  }
  board.forEach((arr, indexX) => {
    arr.forEach((val, indexY) => {
      if (head.val < val) {
        head.x = indexX
        head.y = indexY
        head.val = val
      }
    })
  })
  return head
}

const copyObject = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

const checkCollision = (board, newHead) => {
  return [0, -1].indexOf(board[newHead.x][newHead.y]) === -1
}

const checkFruitEaten = (board, newHead) => {
  return board[newHead.x][newHead.y] === -1
}

const reduceBoard = (board) => {
  return board.map(row => {
    return row.map(val => {
      return val > 0 ? val - 1 : val
    })
  })
}

export default {
  state: {
    board: getNewBoard(),
    snakeDir: 1,
    score: 0,
    gameActive: false,
    loop: false,
    timeElapsed: 0
  },
  mutations: {
    REDUCE_BOARD: () => {},
    SET_CELL: (state, data) => {
      state.board[data.x][data.y] = data.val
    },
    SET_SNAKE_DIR: (state, data) => {
      if (Math.abs(state.snakeDir - data) === 2) {
        return
      }
      state.snakeDir = data
    },
    INITIALIZE_SNAKE: (state) => {
      state.board = getNewBoard()
      state.board[5][2] = 1
      state.board[5][3] = 2
      state.board[5][4] = 3
      state.snakeDir = 1
      state.board = copyObject(state.board) // todo: fix. hack: makes new object. hack.
      state.gameActive = true
      const fruitCell = getFruitCell(state.board)
      state.board[fruitCell.x][fruitCell.y] = gameConstants.fruitCell
    },
    MOVE_SNAKE: (state) => {
      console.log('moving', state.snakeDir)
      const head = findHead(state.board)
      const newHead = copyObject(head)
      newHead.val = head.val + 1
      switch (state.snakeDir) {
        case 0:
          newHead.x = newHead.x - 1
          break
        case 1:
          newHead.y = newHead.y + 1
          break
        case 2:
          newHead.x = newHead.x + 1
          break
        case 3:
          newHead.y = newHead.y - 1
          break
      }
      if (checkCollision(state.board, newHead)) {
        console.log('collided', head, newHead)
        state.gameActive = false
        clearInterval(state.loop)
      } else {
        state.timeElapsed = state.timeElapsed + 250
        if (checkFruitEaten(state.board, newHead)) {
          state.score += gameConstants.scoreIncrement
          state.board[newHead.x][newHead.y] = newHead.val
          const fruitCell = getFruitCell(state.board)
          state.board[fruitCell.x][fruitCell.y] = gameConstants.fruitCell
          state.board = copyObject(state.board)
        } else {
          state.board[newHead.x][newHead.y] = newHead.val
          state.board = reduceBoard(state.board) // todo: fix. hack: makes new object. hack.
        }
      }
    },
    SET_GAME: (state, data) => {
      state.loop = data
    }
  },
  actions: {
    keyPress ({ commit, dispatch }, key) {
      switch (key) {
        case ' ':
          dispatch('startGame')
          break
        case 'w':
          dispatch('changeDirection', 0)
          break
        case 'a':
          dispatch('changeDirection', 3)
          break
        case 's':
          dispatch('changeDirection', 2)
          break
        case 'd':
          dispatch('changeDirection', 1)
          break
      }
    },
    changeDirection ({ commit }, dir) {
      commit('SET_SNAKE_DIR', dir)
    },
    initializeSnake ({ commit }) {
      commit('INITIALIZE_SNAKE')
    },
    moveSnake ({ commit }) {
      commit('MOVE_SNAKE')
    },
    startGame ({ commit }) {
      commit('INITIALIZE_SNAKE')
      commit('SET_GAME', window.setInterval(() => {
        commit('MOVE_SNAKE')
      }, 300))
    }
  }
}
