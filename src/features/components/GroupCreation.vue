<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GroupCreation",
  data() {
    return {
      group: {
        name: '',
        description: '',
        rules: ''
      }
    }
  }
})
</script>

<template>
  <div class="bold py-2">Tên:</div>
  <input type="text" class="w-full rounded" v-model="group.name">
  <div class="bold py-2">Mô tả về nhóm:</div>
  <textarea v-model="group.description" class="w-full p-2 h-70px text-sm rounded"></textarea>
  <div class="bold py-2">Nội quy:</div>
  <textarea v-model="group.description" class="w-full p-2 h-70px text-sm rounded"></textarea>
  <button @click="onCreateGroup"
          class="border-1 p-2 mt-6 rounded bg-ll-primary dark:bg-ld-primary text-white bold hover:bg-blue-700">Cập
    nhật</button>
</template>

<style scoped>

</style>