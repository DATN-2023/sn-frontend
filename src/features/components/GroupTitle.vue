<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GroupTitle"
})
</script>

<template>
  <div class="flex py-2 px-4 w-full space-x-4 ">
    <img class="w-32 h-32 rounded grow-0" src="https://images-cdn.carpla.dev/256x/xeco.webp" alt="image">
    <div class="flex justify-between flex-1">
      <div class="self-center space-y-4">
        <div class="text-2xl">Nhóm của tui</div>
        <div>55.4k thành viên</div>
      </div>
      <div class="self-center text-white">
        <button class="p-2 rounded bg-ll-primary dark:ng-ld-primary hover:bg-sky-600">+ Tham Gia</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>