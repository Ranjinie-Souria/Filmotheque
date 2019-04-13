<template>
    <div class="root">
        
      <b-modal ref="{my-modal}" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>

    </b-modal>
      
    </div>


</template>



<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
   import bModalDirective from 'bootstrap-vue/es/directives/modal/modal' 
export default {
    name: "AddFav",
    props: {
        film: Object
    }, 
    created: function()  {
         this.$refs['my-modal'].show()
        //$(element).modal('show')
    },
    directive: {
        'b-modal': bModalDirective 
    }
     
    
    
}
</script>


<style>
</style>