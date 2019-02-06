import Vue from 'vue'
import Vuex from 'vuex'

import gameState from './modules/gameState'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    gameState
  }
})

export default store
