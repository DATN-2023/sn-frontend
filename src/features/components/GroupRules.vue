<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GroupRules",
  props: {
    rules: {
      type: String
    }
  }
})
</script>

<template>
  <div class="text-lg bold">Nội quy group</div>
  <div class="w-full">
    {{ rules }}
  </div>
</template>

<style scoped>

</style>
