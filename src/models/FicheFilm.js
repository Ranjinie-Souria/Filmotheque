export default class FicheFilm {
    
    constructor(nom, affiche, anneeSortie, realisateur, acteurPrincipaux){
        this.nom = nom;
        this.affiche = affiche;
        this.anneSortie = anneeSortie;
        this.realisateur = realisateur;
        this.acteurPrincipaux = acteurPrincipaux;
    }
}

//import FicheFilm from "@/models/FicheFilms.js"