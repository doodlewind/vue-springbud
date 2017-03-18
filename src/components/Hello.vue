<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <input v-model="msg">
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      msg: 'Hello Vue'
    }
  }
}
</script>

<style lang="styl" scoped>
@import "~styl/mixins";
@import "~styl/variables";

.hello {
  color: color-main;
}
</style>
