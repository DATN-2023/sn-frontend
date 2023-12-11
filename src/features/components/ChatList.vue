<script>
import {defineComponent} from 'vue'
import ChatItem from "@/features/components/ChatItem.vue";

export default defineComponent({
  name: "ChatList",
  components: {ChatItem},
  props: {
    channels: {
      type: Array,
      default: []
    }
  },
  methods: {

  }
})
</script>

<template>
  <div class="flex p-2 w-full">
    <div class="text-2xl font-bold">Chat</div>
  </div>
  <div class="p-2 w-full">
    <input type="text" placeholder="Search Messenger"
           class="w-full rounded-full bg-ll-border dark:bg-ld-border border-ll-border dark:border-ld-border h-40px">
  </div>
  <div class="w-full overflow-y-auto" style="height: calc(100vh - 158px);">
    <ChatItem @click="$emit('onClickChannel', index)" v-for="(item, index) in channels" :channel="item"></ChatItem>
  </div>
</template>

<style scoped>

</style>
