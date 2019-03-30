<template>
    <div>
        <b-button v-b-modal.modal-1 @click="submit">
            Show Modal
        </b-button>
        <!-- Modal Component -->
        <b-modal id="modal-1" title="BootstrapVue">
            <div>
                <b-table class="tableFilm" :items="infoFilm" :fields="fieldsFilm">
                    <template slot="titre">
                        {{this.infoFilm[0].title}}
                    </template>
                    <template slot="date_de_sortie">
                        {{this.infoFilm[0].release_date}}
                    </template>
                </b-table>
                <b-table class="tableFilmReal" :items="crewFilm" :fields="fieldsReal">
                    <template slot="realisateur">
                        {{crewFilm[0][0].name}}
                    </template>
                </b-table>
                <b-table class="tableFilmActeurs" :items="castFilm[0]" :fields="fieldsAct" :per-page="perPage">
                    <template slot="acteurs" slot-scope="row">
                        {{row.item.name}}
                    </template>
                </b-table>
            </div>
        </b-modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                perPage: 5,
                infoFilm: [],
                castFilm: [],
                crewFilm: [],
                fieldsFilm: ['titre', 'date_de_sortie', ],
                fieldsReal: ['realisateur'],
                fieldsAct: ['acteurs'],
            };
        },
        created() {
            this.infoFilm = this.$store.getters.leFilm
            this.castFilm = this.$store.getters.leCastFilm
            this.crewFilm = this.$store.getters.leCrewFilm
        },
        methods: {
            submit(){
                //console.log(this.castFilm[0])
            }
        }
    }
</script>

<style scoped>

</style>