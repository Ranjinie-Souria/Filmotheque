<template>
  <div class="hello">
    <h1>Ma filmothèque</h1>
    <p>
      Bienvenue sur la filmothèque. Vous pouvez rechercher un film.
    </p>

    <br />
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="12">
          <div v-if="alert"><b-alert show variant="danger">
            Aucun film trouvé !
          </b-alert></div>
        </b-col>
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
                        required
                />
                <br />
                <b-button type="submit" variant="primary">Chercher</b-button>
              </b-form>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>

    </b-container>



  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        title: "",
        alert: false,
        resultat: ""
      };
    },
  methods:{
    submit() {

      //console.log(`https://api.themoviedb.org/3/search/movie?api_key=c4183e64dc74d13d605f6815173449f3&query=${this.title}`);
      if (this.title.length >= 1) {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c4183e64dc74d13d605f6815173449f3&query=${this.title.replace(" ", "+")}`)
                .then((response) => {
                  if (response.status) {

                    this.resultat = response.data.results;
                    this.title = "";
                    this.alert = false;
                  } else {
                    this.alert = true;
                  }
                })
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
</style>
