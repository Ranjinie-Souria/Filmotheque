export default class FicheFilm {
    
    constructor(nom, affiche, anneeSortie, realisateur, acteurPrincipaux){
        this.nom = nom;
        this.affiche = affiche;
        this.anneSortie = anneeSortie;
        this.realisateur = realisateur;
        this.acteurPrincipaux = acteurPrincipaux;
        this.rating = 0;
        this.memo = "";
    }


    set_rating(new_rating) {
        if (new_rating < 0) {
            return false;
        }else if(new_rating > 5) {
            return false;
        }else{
            return true;
        }
    }
}

//import FicheFilm from "@/models/FicheFilms.js"