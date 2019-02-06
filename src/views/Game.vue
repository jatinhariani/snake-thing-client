<template>
  <div class="container">
    <div class="row" v-for="(row, index) in $store.state.gameState.board" :key="index">
      <div class="cell" :class="cellClass($store.state.gameState.board[index][indexCell])" v-for="(cell, indexCell) in row" :key="indexCell">
        {{ $store.state.gameState.board[index][indexCell]}}
      </div>
    </div>
    <div>
      Time elapsed: {{ $store.state.gameState.timeElapsed }}
    </div>
    <div>
      Score: {{ $store.state.gameState.score }}
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
      if(val > 0) {
        return 'snake-cell'
      } else if (val < 0) {
        return 'fruit-cell'
      }
    }
  }
}
</script>
<style>
.container {
  margin: 0 auto;
  max-width: 400px;
  background: yellow;
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
  border: 1px solid black;
}

.snake-cell {
  background: black;
}

.fruit-cell {
  background: green;
}
</style>
