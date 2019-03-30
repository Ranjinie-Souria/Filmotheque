import Vue from 'vue'
import Vuex from 'vuex'
import Filmotheque from "./models/Filmotheque";
//import Filmotheque from "./models/Filmotheque";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    film: [],
    filmotheque: new Filmotheque(),
    afficheFilm: [],
    castFilm: [],
    crewFilm: []
  },
  getters: {
    laFilmotheque: state =>{
      return state.filmotheque
    },
    leFilm: state => {
      return state.film
    },
    lAfficheFilm: state => {
      return state.afficheFilm
    },
    leCastFilm: state => {
      return state.castFilm
    },
    leCrewFilm: state => {
      return state.crewFilm
    }
  },
  mutations: {
    DELETE_FILM: (state, idFilm) => {
      state.filmotheque.deleteFilm(idFilm)
    },
    ADD_FILM: (state, Film) => {
      state.filmotheque.addFilm(Film)
    },
    SET_FILM: (state, index) => {
      state.film.push(index)
    },
    SET_CASTFILM: (state, cast) => {
      state.castFilm.push(cast)
    },
    SET_CREWFILM: (state, crew) => {
      state.crewFilm.push(crew)
    },
    SET_AFFICHEFILM: (state, affiche) => {
      state.afficheFilm.push(affiche)
    }
  },
  actions: {

  }
})
