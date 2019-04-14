import FicheFilm from '@/models/FicheFilm.js'

test('Exemple test cas général de FicheFilm', () => {
    const film = new FicheFilm("avatar", "/1sd5g3g486gs1.png", "2019-01-01", "Steven Spielberg", "Pedro le rigolo");
    expect(film.nom).toMatch('avatar');
    expect(film.affiche).toMatch('/1sd5g3g486gs1.png');
    expect(film.anneSortie).toMatch('2019-01-01');
    expect(film.realisateur).toMatch('Steven Spielberg');
    expect(film.acteurPrincipaux).toMatch('Pedro le rigolo');
});
test('Exemple où la FicheFilm est vide', () => {
    const film = new FicheFilm("", "", "", "", "");
    expect(film.nom).toMatch('');
    expect(film.affiche).toMatch('');
    expect(film.anneSortie).toMatch('');
    expect(film.realisateur).toMatch('');
    expect(film.acteurPrincipaux).toMatch('');
});
test('Exemple avec 1 element demandé dans la FicheFilm', () => {
    const film = new FicheFilm("avatar", "", "2019-01-01", "Steven Spielberg", "Pedro le rigolo");
    expect(film.nom).toMatch('avatar');
    expect(film.affiche).toMatch('');
    expect(film.anneSortie).toMatch('2019-01-01');
    expect(film.realisateur).toMatch('Steven Spielberg');
    expect(film.acteurPrincipaux).toMatch('Pedro le rigolo');
});