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
                    <b-card class="text-center" >
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
        </b-container><br/>
            <div v-if="recherche">
              <b-table class="tablefilm" :items="resultat" :fields="fields">
                <template slot="description" slot-scope="row" >
                  {{ row.item.overview.substr(0, 70) }}... 
                    <b-button size="sm" @click="row.toggleDetails" class="mr-2 float_left_button" style="background-color: turquoise;border-color: darkturquoise;">
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
                <template slot="add">
                    <img src="../assets/fav.png" v-on:click="fav()" alt="fav"/>
                </template>
            </b-table></div>





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
                recherche: false
            };
        },
        methods: {
            submit() {

                //console.log(`https://api.themoviedb.org/3/search/movie?api_key=c4183e64dc74d13d605f6815173449f3&query=${this.title}`);
                if (this.title.length >= 1) {
                    this.recherche = true;
                    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c4183e64dc74d13d605f6815173449f3&query=${this.title.replace(" ", "+")}`)
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
                }else{
                    this.resultat = "";
                }

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
      float:right;
    }
</style>
