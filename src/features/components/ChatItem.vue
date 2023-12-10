<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ChatItem",
  props: {
    active: {
      type: Boolean,
      default: false
    },
    channel: {
      type: Object,
      default: {}
    }
  }
})
</script>

<template>
  <div class="w-full rounded-md flex space-x-4 p-2 rounded-xl hover:bg-ll-border hover:dark:bg-ld-border cursor-pointer" :class="`${active ? 'bg-ll-border dark:bg-ld-border' : ''}`">
    <img class="h-16 w-16 rounded-full" :src="channel?.user?.avatar || 'https://images-cdn.carpla.dev/256x/xeco.webp'" alt="">
    <div class="flex justify-between flex-1 space-x-2">
      <div class="self-center text-lg">
        <div>{{channel?.user?.name || 'Anonymous'}}</div>
        <div class="text-sm">Bạn: Hello bạn</div>
      </div>
      <div class="self-center">
        <button class="rounded-full h-5 w-5 text-xs hover:bg-gray-300 hover:dark:bg-gray-700">
          <font-awesome-icon :icon="['fas', 'ellipsis']" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
