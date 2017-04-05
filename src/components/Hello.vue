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

<style lang="stylus" scoped>
@import "~styl/mixins"

.hello
  color: color-main
</style>
