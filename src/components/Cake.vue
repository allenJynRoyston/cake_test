<template lang="pug">
  div(v-if='cake !== null')
    h1 {{cake.name}}
    br
    table.u-full-width
      thead
        tr
          th ID
          th Comments
          th Yum Factor
      tbody
        tr
          td {{cake.id}}
          td {{cake.comment}}
          td {{cake.yumFactor}}
    a(@click='goBack()') Back
</template>

<script>
export default {
  name: 'cake',
  data () {
    return {
      url: `http://ec2-52-209-201-89.eu-west-1.compute.amazonaws.com:5000/api/cakes`,
      cake: null
    }
  },
  mounted: function () {
    this.getCake(this.$route.params.id)
  },
  methods: {
    goBack(){
      this.$router.push(`/`)
    },
    async getCake(id){
      try{
        let res = await this.$http.get(`${this.url}/${id}`)
        this.cake = res.body;
      } catch(err) {
        this.apiError(err)
      }
    },
    async apiError(err){
      console.log(`Error with payload: ${err}`)
    }
  }
}
</script>


<style lang="sass" scoped>

</style>
