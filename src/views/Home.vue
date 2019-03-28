<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" style="width: 100px;"><br/>
    <a style="font-size: 8px" href="https://www.flaticon.com/free-icon/movie_125345">source du logo</a>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
