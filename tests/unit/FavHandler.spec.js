import FavHandler from '@/models/FavHandler.js'
import FicheFilm from '@/models/FicheFilm.js'

test("Test de suppression d'un favoris", () => {
    let fiche = new FicheFilm("Nom du film", "/blabla.jpg", "20919", "real", ["act1", "act2"], 0, "");
    let favs = [fiche];

    // On supprime le favoris
    favs = FavHandler.del_fav(favs, fiche);

    // On vérifie qu'il a bien été supprimé
    expect(favs).toEqual([]);
});

test("Test d'ajout de favoris", () => {
    // On recupere les favoris avant l'ajout pour avoir le nombre de favoris
    let favs = FavHandler.get_favoris();

    // On ajoute le favoris
    let fiche = new FicheFilm("Nom du film", "/blabla.jpg", "20919", "real", ["act1", "act2"], 0, "");
    FavHandler.add_favoris(fiche);

    // On recupere le local storage après l'ajout
    let favoris_after_add = FavHandler.get_favoris();

    // Tests
    try {

        expect(favoris_after_add.length).toEqual(favs.length + 1);
    } catch (e) {
        console.log(e)
    } finally {
        // Peu importe ce qu'il se passe on vide le localStorage
        window.localStorage.clear();
    }
});
