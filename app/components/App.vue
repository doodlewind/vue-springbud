<template>
  <div>
    <div>Demo Vue App</div>
    <child></child>
  </div>
</template>

<script>
  // enable vue devtools
  import Vue from 'vue'
  import * as Child from './Child.vue'

  export default {
    created() {
      console.log('vue loaded')
    },
    name: 'App',
    components: {
      Child
    }
  }
</script>

<style lang="scss">
  body { background-color: lightblue; }
</style>
