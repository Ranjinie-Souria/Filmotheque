import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listFilms: []
  },
  getters: {
    laListFilms: state =>{
      return state.listFilms
    }
  },
  mutations: {
    DELETE_FILM: (state, idFilm) => {
      state.listFilms.splice(state.listFilms.indexOf(idFilm),1)
    },
    ADD_FILM: (state, Film) => {
      state.listFilms.push(Film)
    }
  },
  actions: {

  }
})
