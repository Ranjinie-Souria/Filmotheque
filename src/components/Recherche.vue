<template>
    <div class="hello">
        <h1>Ma filmothèque</h1>
        <br/>
        <b-container class="bv-example-row">

            <b-card class="text-center">
                <div style="width: 60%;margin-left: auto;margin-right: auto;">
                    <div style="padding: 6px;font-weight: bold;color: darkturquoise;font-size: 18px;"> Bienvenue sur la filmothèque
                        <img style="margin-right: 10px;margin-bottom: 20px" src="../assets/coeur.png" alt="coeur"/><br/></div>
                    Vous pouvez rechercher un film et l'ajouter à vos favoris.
                    Une fois votre film ajouté à vos favoris, vous pourrez écrire un commentaire et le noter.</div>
                <br/>
            </b-card>
            <br/>


            <b-row>

                <b-col sm="12">
                    <b-card class="text-center">
                        <b-card-title style="max-width: 20rem;" class="mb-2">
                            <h2>Recherche d'un film</h2>
                        </b-card-title>
                        <b-card-text>
                            <b-form @submit.prevent="submit">
                                <b-form-input
                                        v-model="title"
                                        placeholder="Entrez le nom du film"
                                        v-on:keyup="submit"
                                        required
                                />
                                <br/>
                            </b-form>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <br/>
        <div v-if="recherche">
            <b-table class="tablefilm" :items="resultat" :fields="fields">
                <template slot="description" slot-scope="row">
                    {{ row.item.overview.substr(0, 70) }}...
                    <b-button size="sm" @click="row.toggleDetails" class="mr-2 float_left_button"
                              style="background-color: turquoise;border-color: darkturquoise;">
                        {{ row.detailsShowing ? '-' : '+'}}
                    </b-button>
                </template>
                <template slot="row-details" slot-scope="row">
                    <b-card>
                        <b-row class="mb-2">
                            <b-col>{{ row.item.overview }}</b-col>
                        </b-row>
                    </b-card>
                </template>
                <template slot="add" slot-scope="row">
                    <button v-b-popover.hover.lefttop="'Ajout aux favoris'" type="button"
                            v-b-modal.modal-1="" class="btn" style="background-color: white;border-color: whitesmoke;">
                        <img src="../assets/fav.png" @click="fav(row.item)" alt="fav"/>
                    </button>
                </template>
            </b-table>

            <b-modal id="modal-1" size="lg" title="Voulez-vous ajouter ce film dans vos favoris ?"
                     :header-bg-variant="headerBgVariant"
                     :header-text-variant="headerTextVariant"
                     :footer-bg-variant="footerBgVariant"
                     :scrollable="true"
                     :cancel-variant="cancelVariant"
                     :cancel-title="cancelTitle"
                     :ok-variant="okVariant"
                     :ok-title="okTitle">
                <div>
                    <b-img class="image" v-bind:src="codeAffiche" fluid alt="Responsive image"></b-img>
                </div>
                <div>
                    <b-table class="tableFilm" :items="ligneModal" :fields="fieldsFilm">
                        <template slot="titre">
                            {{titleFilmFav}}
                        </template>
                        <template slot="date_de_sortie">
                            {{this.infoFilm.release_date}}
                        </template>
                    </b-table>
                    <div v-if="!crewFilm.isEmpty">
                    <b-table class="tableFilmReal" :items="ligneModal" :fields="fieldsReal">
                        <template slot="realisateur">
                            {{realisateur}}
                        </template>
                    </b-table>
                    <b-table class="tableFilmActeurs" :items="castFilm" :fields="fieldsAct" :per-page="perPage">
                        <template slot="acteurs" slot-scope="row">
                            {{row.item.name}}
                        </template>
                    </b-table></div>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                //Ajout de une ligne dans le modal pour faire la boucle
                ligneModal: [""],
                titleFilmFav: [],
                //Titres des colonnes de la liste
                fields: ['title', 'description', 'add'],
                //Paramètres de la recherche de films
                current_title_search: "",
                resultat: "",
                recherche: false,
                //Limite du nombre d'acteur principaux
                perPage: 5,
                //Information sur le film cliqué
                infoFilm: [],
                castFilm: [],
                crewFilm: [],
                realisateur: "",
                //Composition de l'URL de l'affiche du film
                baseAffiche: "https://image.tmdb.org/t/p/w500",
                codeAffiche: "",
                //Titres des colonnes du tableau modal
                fieldsFilm: ['titre', 'date_de_sortie',],
                fieldsReal: ['realisateur'],
                fieldsAct: ['acteurs'],
                //Variant du modal
                headerBgVariant: 'info',
                headerTextVariant: 'light',
                footerBgVariant: 'dark',
                cancelVariant: 'danger',
                cancelTitle: 'Annuler',
                okVariant: 'success',
                okTitle: 'Valider',
            };
        },
        methods: {
            submit() {
                //console.log(`https://api.themoviedb.org/3/search/movie?api_key=c4183e64dc74d13d605f6815173449f3&query=${this.title}`);
                if (this.title.length >= 1) {
                    this.recherche = true;
                    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c4183e64dc74d13d605f6815173449f3&query=${this.title.replace(" ", "+")}&language=fr-FR`)
                        .then((response) => {
                            if (response.status) {
                                // Check if the current value of the field linked to this.title is different from the current title search
                                if (this.current_title_search !== this.title) {
                                    // If it's different, we set the current search to the title value
                                    this.current_title_search = this.title;
                                } else {
                                    return;
                                }
                                this.resultat = response.data.results;
                            } else {
                                this.recherche = false;
                            }
                        })
                } else {
                    this.resultat = "";
                }

            },
            fav(id) {
                this.$store.commit('SET_FILM', id);
                this.$store.commit('SET_LE_FILM', id);
                this.infoFilm = this.$store.getters.unFilm;
                this.titleFilmFav = this.infoFilm.title;
                //console.log(this.infoFilm.title);
                //console.log(this.titleFilmFav);
                axios.get(`https://api.themoviedb.org/3/movie/${id.id}/credits?api_key=c4183e64dc74d13d605f6815173449f3&language=fr-FR`)
                    .then((response) => {
                        if (response) {
                            this.$store.commit('SET_CASTFILM', response.data.cast);
                            this.$store.commit('SET_CREWFILM', response.data.crew);
                            this.castFilm = response.data.cast;
                            this.crewFilm = response.data.crew;
                            this.realisateur = this.crewFilm[0].name;

                        }
                    });
                axios.get(`https://api.themoviedb.org/3/movie/${id.id}?api_key=c4183e64dc74d13d605f6815173449f3&language=fr-FR`)
                    .then((response) => {
                        if (response) {
                            this.$store.commit('SET_AFFICHEFILM', response.data.poster_path);
                            //this.infoFilm = this.$store.getters.unFilm;
                            this.codeAffiche = this.baseAffiche + response.data.poster_path;
                            //console.log("test : " + this.infoFilm.original_title);
                        }
                    });

            },
            //tradDate(str) {
            //    var annee = str.substr(0, 4);
            //    var mois = str.substr(5, 2);
            //    var jour = str.substr(8, 2);
            //    return jour + " - " + mois + " - " + annee;
            //}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .tablefilm {
        width: 70%;
        font-size: 14px;
        margin-right: auto;
        margin-left: auto;
        background-color: white;
    }

    .float_left_button {
        float: right;
    }

    .image {
        width: 35%;
    }
</style>
