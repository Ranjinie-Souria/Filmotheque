<template>
    <div class="hello">
        <h1>Ma filmothèque</h1>
        <p>
            Bienvenue sur la filmothèque. Vous pouvez rechercher un film.

        </p>

        <br/>
        <b-container class="bv-example-row">
            <b-row>

                <b-col sm="12">
                    <b-card class="text-center">
                        <b-card-title style="max-width: 20rem;" class="mb-2">
                            Recherche d'un film
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

            <!--<table border="1px solid black;">
            <thead>
              <tr>
              <th>Nom </th>
              <th>Description</th>
              <th></th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="film in resultat" :key="film.id">
                <td>{{ film.original_title }}</td>
                <td class="overview_film">{{ film.overview }}</td>
                <td>add fav</td>
              </tr>
            </tbody>
            </table>-->
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
                    <button type="button" v-b-modal.modal-1="" class="btn" style="background-color: white;border-color: whitesmoke;">
                        <img src="../assets/fav.png" @click="fav(row.item)" alt="fav"/>
                    </button>
                </template>
            </b-table>


            <b-modal id="modal-1" title="Film Favori"
                     :header-bg-variant="headerBgVariant"
                     :header-text-variant="headerTextVariant"
                     :footer-bg-variant="footerBgVariant">

                <div>
                    <b-img class="image" v-bind:src="codeAffiche" fluid alt="Responsive image"></b-img>
                </div>
                <div>
                        <b-table class="tableFilm" :fields="fieldsFilm">
                        <template slot="titre">
                            {{infoFilm.original_title}}
                        </template>
                        <template slot="date_de_sortie">
                            {{infoFilm.release_date}}
                        </template>
                    </b-table>
                    <div v-if="!crewFilm.isEmpty">
                    <b-table class="tableFilmReal" :fields="fieldsReal">
                        <template slot="realisateur">
                            {{ realisateur }}
                        </template>
                    </b-table>
                    <b-table class="tableFilmActeurs" :items="castFilm[0]" :fields="fieldsAct" :per-page="perPage">
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
                title: "",
                fields: ['original_title', 'description', 'add'],
                current_title_search: "",
                resultat: "",
                recherche: false,
                perPage: 5,
                infoFilm: [],
                castFilm: [],
                crewFilm: [],
                realisateur: "",
                titre : "",
                baseAffiche: "https://image.tmdb.org/t/p/w500",
                codeAffiche: "",
                fieldsFilm: ['titre', 'date_de_sortie',],
                fieldsReal: ['realisateur'],
                fieldsAct: ['acteurs'],
                //variant du modal
                headerBgVariant: 'info',
                headerTextVariant: 'light',
                footerBgVariant: 'dark',
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
                axios.get(`https://api.themoviedb.org/3/movie/${id.id}/credits?api_key=c4183e64dc74d13d605f6815173449f3&language=fr-FR`)
                    .then((response) => {
                        if (response) {
                            this.$store.commit('SET_CASTFILM', response.data.cast);
                            this.$store.commit('SET_CREWFILM', response.data.crew);
                            this.castFilm = response.data.cast;
                            this.crewFilm = response.data.crew;
                            this.realisateur = this.crewFilm[0][0].name;
                        }
                    });
                axios.get(`https://api.themoviedb.org/3/movie/${id.id}?api_key=c4183e64dc74d13d605f6815173449f3&language=fr-FR`)
                    .then((response) => {
                        if (response) {
                            this.$store.commit('SET_AFFICHEFILM', response.data.poster_path);
                            this.infoFilm = this.$store.getters.unFilm;
                            this.codeAffiche = this.baseAffiche + response.data.poster_path;
                            console.log("test : " + this.infoFilm.original_title);
                        }
                    });

            }
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
</style>
