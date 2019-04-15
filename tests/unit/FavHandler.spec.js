import FavHandler from '@/models/FavHandler.js'
import FicheFilm from '@/models/FicheFilm.js'

test("Test de suppression d'un favoris" , () => {
    let fiche = new FicheFilm("Nom du film", "/blabla.jpg", "20919", "real", ["act1", "act2"], 0, "");
    let favs = [fiche];

    // On supprime le favoris
    favs = FavHandler.del_fav(favs, fiche);

    // On vérifie qu'il a bien été supprimé
    expect(favs).toEqual([]);
});

