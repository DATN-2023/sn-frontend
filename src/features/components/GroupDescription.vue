<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GroupDescription",
  props: {
    description: {
      type: String
    }
  }
})
</script>

<template>
  <div class="text-lg bold">Giới thiệu</div>
  <div class="w-full">
    {{ description }}
  </div>
</template>

<style scoped>

</style>
