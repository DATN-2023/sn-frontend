<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ApproveUser"
})
</script>

<template>
  <div class="w-full rounded-md flex space-x-4 p-2">
    <img class="h-20 w-20 rounded-full" src="https://images-cdn.carpla.dev/256x/xeco.webp" alt="">
    <div class="flex justify-between flex-1 space-x-2">
      <div class="self-center">Tôi là quỷ</div>
      <div class="self-center">
        <button class="border text-white p-2 rounded-lg bg-ll-primary dark:bg-ld-primary">
          <svg class="inline fill-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
          </svg>
          Phê duyệt
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>