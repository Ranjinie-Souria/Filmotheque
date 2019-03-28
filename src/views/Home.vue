<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" style="width: 100px;"><br/>
    <a style="font-size: 8px" href="https://www.flaticon.com/free-icon/movie_125345">source du logo</a>
    <Recherche/>
  </div>
</template>

<script>
// @ is an alias to /src
import Recherche from '@/components/Recherche.vue'

export default {
  name: 'home',
  components: {
    Recherche
  }
}
</script>
