<template>
  <div class="container">
    <div class="meta">
      <div>
        Time elapsed: {{ $store.state.gameState.timeElapsed }}
      </div>
      <div>
        Score: {{ $store.state.gameState.score }}
      </div>
    </div>
    <div class="game-container">
      <div class="row" v-for="(row, index) in $store.state.gameState.board" :key="index">
        <div class="cell" :class="cellClass($store.state.gameState.board[index][indexCell])" v-for="(cell, indexCell) in row" :key="indexCell">
        </div>
      </div>
    </div>
    <div class="help">
      <h2>Controls:</h2>
      <p>SPACE: New Game</p>
      <p>W,A,S,D: Change direction</p>
    </div>
  </div>
</template>
<script>
export default {
  created: function () {
    window.addEventListener('keydown', this.onkey)
  },
  beforeDestroy: function () {
    window.removeEventListener('keydown', this.onkey)
  },
  mounted () {
  },
  methods: {
    onkey (event) {
      if ([' ', 'w', 'a', 's', 'd'].indexOf(event.key) !== -1) {
        this.$store.dispatch('keyPress', event.key)
      }
    },
    cellClass (val) {
      if (val > 0) {
        return 'snake-cell'
      } else if (val < 0) {
        return 'fruit-cell'
      }
    }
  }
}
</script>
<style lang="scss">
div {
  box-sizing: border-box;
}
.container {
  margin: 0 auto;
  max-width: 402px;
}

.game-container {
  border: 1px solid #ddd;
}

.row {
  width: 400px;
  height: 40px;
  background: white;
  display: flex;
}

.cell {
  width: 40px;
  height: 40px;
  border-right: 1px solid #f8f8f8;
  border-bottom: 1px solid #f8f8f8;
}

.snake-cell {
  background: #009688;
}

.fruit-cell {
  background: #ef5350;
}

.meta {
  display: flex;
  background: #009688;
  color: #fff;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
  div {
    text-align: left;
    padding: 15px;
    flex-grow: 1;
  }
}

h2 {
  margin-bottom: 10px;
  font-weight: normal;
}

p {
  margin: 0;
}
</style>
