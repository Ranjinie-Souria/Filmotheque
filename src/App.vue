<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Recherche</router-link> |
      <router-link to="/favoris">Films favoris</router-link>  |
      <router-link to="/test">Test</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: aliceblue;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: darkturquoise;
}


h1 {
  font-size: 72px;
  text-shadow: 2px 2px 2px darkcyan;
  color: turquoise;
  font-family: "Bahnschrift", Helvetica, Arial, sans-serif;
}

h2 {
  font-size: 72px;
  text-shadow: 1px 1px 2px royalblue;
  color: darkturquoise;
  font-family: "Bahnschrift", Helvetica, Arial, sans-serif;
}
</style>
