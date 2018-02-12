<template lang="pug">
  div
    table.u-full-width
      thead
        tr
          th Status
          th Name
          th Image
          th Score
          th Options
      tbody
        tr(v-for='(cake, index) in cakes')
          td
            a(@click='editCake(cake)' v-if='!cake.editMode && cake.id !== null') Edit
            span(v-if='!cake.editMode && cake.id === null') Created
          td
            a(v-if='!cake.editMode  && cake.id !== null' @click='viewCake(cake)') {{cake.name}}
            span(v-if='!cake.editMode && cake.id === null') {{cake.name}}
            input.u-full-width(type='text' v-bind:placeholder='placeholderDefaults.name' v-model='editCakeObj.name' v-if='cake.editMode')
          td
            span(v-if='!cake.editMode') {{cake.imageUrl}}
            input.u-full-width(type='text' v-bind:placeholder='placeholderDefaults.imageUrl' v-model='editCakeObj.imageUrl' v-if='cake.editMode')
          td
            span(v-if='!cake.editMode') {{cake.yumFactor}}
            input.u-full-width(type='number' min=0 max=5 v-bind:placeholder='placeholderDefaults.yumFactor' v-model='editCakeObj.yumFactor' v-if='cake.editMode')
          td
            button.button.button-secondary(@click='removeCake(cake, index)' v-if='!cake.editMode') Remove
            button.button.button-edit(@click='updateCake(index)' v-if='cake.editMode') Update
        tr
          td
          td
            input.u-full-width(type='text' v-bind:placeholder='placeholderDefaults.name' v-model='newCake.name')
          td
            input.u-full-width(type='text' v-bind:placeholder='placeholderDefaults.imageUrl' v-model='newCake.imageUrl')
          td
            input.u-full-width(type='number' min=0 max=5 v-bind:placeholder='placeholderDefaults.yumFactor' v-model='newCake.yumFactor')
          td
            center
              button.button.button-primary(@click='addCake()') Add +
</template>

<script>
export default {
  data () {
    return {
      url: `http://ec2-52-209-201-89.eu-west-1.compute.amazonaws.com:5000/api/cakes`,
      cakes:[],
      placeholderDefaults:{
        name: "Chocolicious",
        imageUrl: "https://www.something.com",
        comment: "The cake is a lie!",
        yumFactor: ''
      },
      newCake: {
        id: null,
        editMode: false,
        name: 'New cake',
        imageUrl: 'http://via.placeholder.com/300x300',
        comment: 'The cake is a lie',
        yumFactor: 0
      },
      editCakeObj: {
        name: null
      }
    }
  },
  mounted: function () {
    this.getCakes();

  },
  methods: {
    viewCake(cake){
      this.$router.push(`/cake/${cake.id}`)
    },
    editCake(cake){
      for(let c of this.cakes){
        c.editMode = false;
      }
      this.editCakeObj = cake;
      cake.editMode = true;
    },
    async updateCake(index){
      try{
        let res = await this.$http.put(`${this.url}/${this.editCakeObj.id}`, this.editCakeObj.id, {emulateJSON:true})
        alert(`Your cake has been updated.  Status: ${res.statusText}`)
      } catch(err) {
        this.cakes[index] = this.editCakeObj;
        this.cakes[index].editMode = false;
        this.apiError('PUT has failed.')
      }

    },
    async addCake(){
      try{
        let res = await this.$http.post(`${this.url}`, this.newCake, {emulateJSON:true})
        alert(`Your cake has been submitted.  Status: ${res.statusText}`)
        this.cakes = [...this.cakes, this.newCake]
      } catch(err) {
        this.apiError(err)
      }
    },
    async removeCake(cake, index){
      if(cake.id !== null){
        try{
          let res = await this.$http.delete(`${this.url}/${cake.id}`)
          this.cakes.splice(index, 1)
        } catch(err) {
          this.apiError(err)
        }
      }
      else{
        this.cakes.splice(index, 1)
      }
    },
    async getCakes(){
      try{
        let res = await this.$http.get(`${this.url}`)
        for(let cake of res.body){
          cake.editMode = false
        }
        this.cakes = res.body;
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
