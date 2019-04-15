import FicheFilm from '@/models/FicheFilm.js'

test('Exemple test cas général de FicheFilm', () => {
    const film = new FicheFilm("avatar", "/1sd5g3g486gs1.png", "2019-01-01", "Steven Spielberg", "Bruce");
    expect(film.nom).toMatch('avatar');
    expect(film.affiche).toMatch('/1sd5g3g486gs1.png');
    expect(film.anneSortie).toMatch('2019-01-01');
    expect(film.realisateur).toMatch('Steven Spielberg');
    expect(film.acteurPrincipaux).toMatch('Bruce');
});
test('Exemple où la FicheFilm est vide', () => {
    const film = new FicheFilm("", "", "", "", "");
    expect(film.nom).toMatch('');
    expect(film.affiche).toMatch('');
    expect(film.anneSortie).toMatch('');
    expect(film.realisateur).toMatch('');
    expect(film.acteurPrincipaux).toMatch('');
});
test('Exemple avec plusieurs FicheFilm', () => {
    const film1 = new FicheFilm("avatar", "/1sd5g3g486gs1.png", "2019-01-01", "Steven Spielberg", "Bruce");
    const film2 = new FicheFilm("Koh-Lanta", "/1515s6gfs56h.png", "2014-01-01", "Denis Brogniart", "Patrick");
    expect(film1.nom).toMatch('avatar');
    expect(film1.affiche).toMatch('/1sd5g3g486gs1.png');
    expect(film1.anneSortie).toMatch('2019-01-01');
    expect(film1.realisateur).toMatch('Steven Spielberg');
    expect(film1.acteurPrincipaux).toMatch('Bruce');
    expect(film2.nom).toMatch('Koh-Lanta');
    expect(film2.affiche).toMatch('/1515s6gfs56h.png');
    expect(film2.anneSortie).toMatch('2014-01-01');
    expect(film2.realisateur).toMatch('Denis Brogniart');
    expect(film2.acteurPrincipaux).toMatch('Patrick');
});