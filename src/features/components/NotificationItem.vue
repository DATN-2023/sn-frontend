<script>
import {defineComponent} from 'vue'
import vClickOutside from "click-outside-vue3";

export default defineComponent({
  name: "NotificationItem",
  data() {
    return {
      active: false
    }
  },
  methods: {
    hide (event) {
      this.active = false
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  }
})
</script>

<template>
  <div class="w-full flex space-x-4 py-2">
    <img class="h-20 w-20 rounded-full" :src="user?.user?.avatar || 'https://images-cdn.carpla.dev/256x/xeco.webp'" alt="">
    <div class="flex justify-between w-full space-x-2 self-center">
      <div>
        <div class="text-lg">Quý phạm đã bày tỏ cảm xúc về bài viết</div>
        <div class="text-sm">7 ngày trước</div>
      </div>
      <div class="self-center rounded-full hover:bg-ll-border hover:dark:bg-ld-border w-6 h-6 text-center cursor-pointer relative">
        <font-awesome-icon v-click-outside="hide" @click="active = !active" icon="fa-solid fa-ellipsis"/>
        <div v-show="active" class="absolute w-250px shadow-lg rounded-lg p-2 right-0 border-1 border-ll-border dark:border-ld-border bg-ll-neutral dark:bg-ld-neutral">
          <div class="hover:bg-ll-border hover:dark:bg-ld-border p-2 rounded-lg"><font-awesome-icon :icon="['fas', 'check']" /> Đánh dấu là đã đọc</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>