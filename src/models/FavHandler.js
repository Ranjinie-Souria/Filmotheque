// Importations
import FicheFilm from './FicheFilm.js'

// Classe pour gérer les fvoris (CRUD)
export default class FavHandler{

    /**
     * Cette methode permet d'ajouter un favoris au LocalStorage
     */
    static add_favoris(fiche_film) {

        // creation de la FicheFilm du film a ajouter en favoris
        // let fiche = new FicheFilm(json_film["title"],
        //                           img_path,
        //                           json_film["release_date"],
        //                           real,
        //                           cast
        //                           )

        // On recuperer les favoris
        let favoris = this.get_favoris();

        // On ajoute le nouveau favoris
            if(favoris.indexOf(fiche_film) == -1) favoris.push(fiche_film);

        // On sauvegarde les favoris
        this.save_fav_array(favoris);
    }

    /**
     * 
     * @param {array[FicheFilm]} favs Tableau contenant les favoris a sauvegarder
     */
    static save_fav_array(favs) {

        // Sauvegarde des favoris dans le localStorage
        window.localStorage.setItem('favoris', JSON.stringify(favs));
    }

    /**
     * Cette methode permet de récupérer les favoris
     * return : array[FicheFilm] si il y a des favoris array[] vide sinon
     */
    static get_favoris() {

        // On recupere les favoris existants
        let favoris = window.localStorage.getItem('favoris');

        // On verifie qu'il y en est qui existent
        if (favoris == null) {
            return favoris = []
        }else { 
            return JSON.parse(favoris);
        }
    }

    /**
     * Cette methode prend en argument un tableau de FicheFilm et un objet
     * FicheFilm. Elle supprime l'objet FicheFilm si il est présent dans le 
     * tableau, sinon elle lance une exception (@todo)
     * @param {Array[FicheFilm]} favs_array 
     * @param {FicheFilm} item 
     */
    static del_fav(favs_array, item) {
        
        // On recupere l'index de l'objet
        let item_i = favs_array.indexOf(item);        
        // On le supprime si il est trouve
        if (item_i != -1) favs_array.splice(item_i, 1);
        // On sauvegarde dans le LocalStorage le nouveau tableau de favoris
        this.save_fav_array(favs_array);
        // On retourne le tableau
        return favs_array;
        
    }

    /**
     * Cette methode permet de modifier la note d'un film
     * return : Retourne la fiche modifier (ou pas si ! 0 >= rating >= 5)
     * @param {FicheFilm} fiche_film 
     * @param {int} rating 
     */
    static update_rating(fiche_film, rating) {
        // On verifie que la note est entre 0 et 5
        if(rating >=0 && rating <= 5) fiche_film.rating = rating;

        // On retourne la fiche
        return fiche_film;
    }

    /**
     * Cette methode permet de modifier le memo d'un film
     * return : Retourne la fiche modifier (ou pas si ! 0 >= memo.lenght >= 30)
     * @param {FicheFilm} fiche_film fiche a modifier
     * @param {String} memo nouveau memo
     */
    static update_memo(fiche_film, memo) {
        if(memo.length >= 0 && memo.length <= 30) fiche_film.memo = memo;

        return fiche_film;
    }
}