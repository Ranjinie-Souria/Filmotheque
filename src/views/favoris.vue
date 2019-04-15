<template>
    <div class="root">
        <h1>
            {{ title }}
        </h1>
        <b-container class="bv-example-row">
            <br/>
            <!-- Si il n'y a pas de favoris -->
            <div v-if="favoris.length <= 0">
                <br/>
                <h2 class="no_fav_title"> Aucun favori !</h2>
                <b-card>
                    <div style="width: 60%;margin-left: auto;margin-right: auto;">
                        <div style="padding: 6px;font-weight: bold;color: darkturquoise;font-size: 18px;"> Recherchez un film à partir de la liste puis ajoutez le
                            <img style="margin-right: 10px;margin-bottom: 20px" src="../assets/coeur.png" alt="coeur"/><br/></div></div>
                        Vous n'avez aucun film favori... Pensez à en ajouter un à votre liste... Ou regardez plus de films.
                    <br/>
                </b-card>
            </div>

            <!-- Si il y en a -->
            <div v-else>
                <b-card class="text-center">
                <b-table class="table_fav" :items="favoris" :fields="table_favoris_fields">

                    <!-- Affichage du memo -->
                    <template slot="memo" slot-scope="row">

                        <p v-if="row.item.memo.length <= 0">
                            Pas de memo
                        </p>
                        <p v-else>{{row.item.memo}}</p>
                        <b-button size="sm" @click="row.toggleDetails" class="mr-2 float_left_button"
                                  style="background-color: turquoise;border-color: darkturquoise;">
                            {{ row.detailsShowing ? 'Terminé' : 'Modfier'}}
                        </b-button>
                    </template>
                    <!-- Fin de la gestion du memo -->

                    <!-- Affichage de la note -->
                    <template slot="rating" slot-scope="row">

                        <p>{{row.item.rating}}/5</p>

                        <!-- Boutton pour la modification de la note -->
                        <b-button size="sm" @click="row.toggleDetails" class="mr-2 float_left_button"
                                  style="background-color: turquoise;border-color: darkturquoise;">
                            {{ row.detailsShowing ? 'Terminé' : 'Modfier'}}
                        </b-button>
                    </template>
                    <!-- Fin de l'affichage de la note -->

                    <!-- Affichage des acteurs principaux -->
                    <template slot="acteurPrincipaux" slot-scope="row">
                        <p class="actor-name" v-for="(actor, i) in row.item.acteurPrincipaux" :key="i" v-if="i <= 5">
                            {{actor.name}}
                        </p>
                    </template>
                    <!-- Fin de l'affichage des acteurs principaux -->

                    <!-- Affichage de l'affiche -->
                    <template slot="affiche" slot-scope="row">
                        <b-img class="affiche_fav" v-bind:src="'https://image.tmdb.org/t/p/w500/'+row.item.affiche" fluid
                               alt="Responsive image"></b-img>
                    </template>
                    <!-- Fin de l'affichage de l'affiche -->

                    <!-- Suppression -->
                    <template slot="supprimer" slot-scope="row">
                        <button v-b-popover.hover.lefttop="'Supprimer'" type="button" class="btn" style="background-color: white;border-color: whitesmoke;">
                        <img class="img-fuild img-del" src="../assets/delete.png"  @click="del_fav(row.item)" alt="Cliquez pour supprimer un favori"/></button>
                    </template>
                    <!-- Fin supression -->

                    <!-- Affichage de la modification de la note et du memo -->
                    <template slot="row-details" slot-scope="row">

                        <!-- Modification de la note -->
                        <b-card class="update-rating">
                            <b-row class="">
                                <h4>Modifier votre note : </h4>
                            </b-row>
                            <b-row class="" style="padding-left:10px;">
                                <!-- <div class="buttons-rating" v-for="i in available_ratings" :key="i"> -->
                            </b-row>
                            <b-row>
                                <div class="buttons-rating" v-for="i in available_ratings" :key="i">
                                    <b-button class="button-list" v-if="i == row.item.rating" size="sm"
                                              @click="update_rating(row.item, i); row.toggleDetails;"
                                              style="background-color: green;border-color: darkturquoise;">{{i}}
                                    </b-button>
                                    <b-button v-else class="button-list" size="sm" @click="update_rating(row.item, i)"
                                              style="background-color: turquoise;border-color: darkturquoise;">{{i}}
                                    </b-button>
                                </div>
                            </b-row>
                        </b-card>

                        <!-- Modification du memo -->
                        <b-card class="update-memo">
                            <b-row class="row-update-memo">
                                <h4 class="title_update_memo">Modification du mémo :</h4><br/>
                            </b-row>
                            <b-row class="row-update-memo">
                                <p class="desc-update-memo">Maximum 30 caractères</p>
                            </b-row>
                            <b-row class="row-update-memo">

                                <b-form-textarea
                                        maxlength="30"
                                        v-model="row.item.memo"
                                        :state="row.item.memo.length <= 30"
                                ></b-form-textarea>
                                <b-button class="button-memo" size="md"
                                          @click="update_memo(row.item, row.item.memo), row.toggleDetails;"
                                          style="background-color: darkturquoise;border-color: darkturquoise;">Modifier
                                </b-button>
                            </b-row>
                        </b-card>
                    </template>
                    <!-- Fin affichage de la modification de la note et du memo -->
                </b-table></b-card>
            </div>

        </b-container>
    </div>


</template>


<script>
    // Imports
    import FavHandler from '@/models/FavHandler.js'


    export default {
        name: "Favoris",
        data() {
            return {
                // Titre de la page
                title: "Vos favoris",

                // Tableau contenant des objets FicheFilm
                favoris: [],

                // Nom des champs du tableau affichant les favoris
                table_favoris_fields: ["nom",
                    "realisateur",
                    "anneSortie",
                    "acteurPrincipaux",
                    "rating",
                    "memo",
                    "affiche",
                    "supprimer"
                ],

                // Utilisee pour la modification des memos
                text_area_value: "",

                // Les notes possibles
                available_ratings: [0, 1, 2, 3, 4, 5]
            }
        },
        created: function () {
            // A la creation du composant -> Chargement des favoris
            this.favoris = FavHandler.get_favoris();
        },

        methods: {
            /**
             * Methode qui permet de supprimer un favoris
             * @param {FicheFilm} item Objet FicheFilm a supprimer du tableau
             */
            del_fav(item) {
                // Suppression du favoris, la methode FavHandler.del_fav retourne
                // Le tableau modifié

                this.favoris = FavHandler.del_fav(this.favoris, item);
            },

            /**
             * Methode qui permet de modifier la note (rating) attribuee a un film
             * @param {FicheFilm} fiche_film Objet FicheFilm a modifier
             * @param {int} rating entier representant la note
             */
            update_rating(fiche_film, rating) {
                // On recupere l'index de la fiche que l'on va modifier dans le tableau des favoris
                let fiche_film_index = this.favoris.indexOf(fiche_film);
                // On modifie l'index
                fiche_film = FavHandler.update_rating(fiche_film, rating);
                // On met a jour la FicheFilm avec la nouvelle
                this.favoris[fiche_film_index] = fiche_film;
                // On sauvegarde les modifications
                FavHandler.save_fav_array(this.favoris);
            },

            update_memo(fiche_film, memo) {
                let fiche_film_index = this.favoris.indexOf(fiche_film);

                fiche_film = FavHandler.update_memo(fiche_film, memo);

                this.favoris[fiche_film_index] = fiche_film;

                FavHandler.save_fav_array(this.favoris);
            }
        }
    }

</script>


<style scoped>
    * {
        background-color: #ffffff;
    }

    .root {
        padding-top: 50px;
    }

    .table_fav {
        margin-top: 50px;
        width: 100%;
        height: 90%;
        font-size: 14px;
        margin-right: auto;
        margin-left: auto;
        background-color: white;
    }

    .list_act {
        list-style-type: none;
    }

    .affiche_fav {
        width: 50%;
    }

    .img-del {
        display: inline-block;
        vertical-align: middle;
    }

    .actor-name {
        font-size: 11px;
        height: 5%;
    }

    .update-rating {
        display: inline-block;
        text-align: center;
        padding: 10px;
        margin-right: 5px
    }

    .buttons-rating {
        padding-left: 10px;
    }

    .update-memo {
        display: inline-block;
        text-align: center;
        padding: 10px;
        margin-left: 5px;
        text-align: center;
    }

    .update-memo > * {
        display: block;
    }

    .title_update_memo {
        font-size: 20px;
    }


</style>