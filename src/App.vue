<template lang='pug'>
  #app
    .container
      app-header
      #content
        router-view
    app-footer
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass" scoped>
  @import './assets/css/global.css'
  #content
    min-height: 1200px
</style>
