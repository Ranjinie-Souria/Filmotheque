export default class Filmotheque {

    constructor(){
        this.isPublic = false;
        this.listFilm = [];
    }

    addFilm(film){
        this.film = film;
        return this.listFilm.push('film')
    }

    deleteFilm(id){
        return this.listFilm.splice(id, 1);
    }

}