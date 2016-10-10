<template>
  <div>
    {{ childName }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        childName: 'Child Component'
      }
    }
  }
</script>

<style lang="scss" scoped>
  div { background-color: aquamarine; }
</style>
