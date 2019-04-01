<template>
    <div>
        <b-button v-b-modal.modal-1 @click="submit">
            Modal
        </b-button>
        <!-- Modal Component -->
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
                <b-table class="tableFilm" :items="infoFilm" :fields="fieldsFilm">
                </b-table>
                <b-table class="tableFilmReal" :items="crewFilm" :fields="fieldsReal" slot-scope="row">
                    <template slot="realisateur">
                        {{crewFilm[row.item][0].name}}
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
                baseAffiche: ["https://image.tmdb.org/t/p/w500"],
                codeAffiche: [],
                fieldsFilm: ['original_title', 'release_date'],
                fieldsReal: ['realisateur'],
                fieldsAct: ['acteurs'],
                //variant du modal
                headerBgVariant: 'info',
                headerTextVariant: 'light',
                footerBgVariant: 'dark',
                cancelVariant: 'danger',
                cancelTitle: 'Annuler',
                okVariant: 'success',
                okTitle: 'Valider',
            };
        },
        created() {
            this.infoFilm = this.$store.getters.leFilm;
            this.castFilm = this.$store.getters.leCastFilm;
            this.crewFilm = this.$store.getters.leCrewFilm;
            this.codeAffiche = this.baseAffiche+this.$store.getters.lAfficheFilm;
        },
        methods: {
            submit(){
                console.log(this.codeAffiche)
            }
        }
    }
</script>

<style scoped>
    .image {
        width: 50%;
    }
</style>