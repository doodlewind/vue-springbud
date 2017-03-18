<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import Hello from 'components/Hello'

export default {
  name: 'App',
  components: {
    Hello
  }
}
</script>

<style lang="styl">
@import "~styl/mixins";
@import "~styl/variables";

* {
  font-family: 'Helvetica Neue', 'Helvetica', Arial, 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
}
#app {
  margin-top: 60px;
  flex-align(center, center);
}
</style>
