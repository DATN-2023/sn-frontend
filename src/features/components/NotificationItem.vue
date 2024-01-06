<script>
import {defineComponent} from 'vue'
import vClickOutside from "click-outside-vue3";
import {genTime, genImageUrl} from '@/config'

export default defineComponent({
  name: "NotificationItem",
  data() {
    return {
      active: false,
      content: ''
    }
  },
  props: {
    notification: {
      type: Object
    }
  },
  methods: {
    genImageUrl,
    genTime,
    hide(event) {
      this.active = false
    },
    async onClickHasRead() {
      await this.$store.dispatch('notification/updateNotification', this.$props.notification._id)
      this.$props.notification.hasRead = 1
      this.$emit('onClickHasRead')
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  }
})
</script>

<template>
  <div class="w-full flex space-x-4 p-2 rounded-lg hover:bg-ll-border hover:dark:bg-gray-700 cursor-pointer">
    <div class="w-14px" v-if="notification?.hasRead"></div>
    <font-awesome-icon v-else :icon="['fas', 'circle']" class="text-ll-primary self-center w-12px text-xs"/>
    <img class="h-16 w-16 self-center rounded-full"
         :src="genImageUrl(notification?.user?.avatar || 'https://images.egosnet.click/social-network/user-128.png')" alt="">
    <div class="flex justify-between w-full space-x-2 self-center">
      <div>
        <div class="text-sm"><p class="bold inline">{{ `${notification.user.name}` }}</p> {{ `${notification.content}` }}</div>
        <div class="text-xs">{{ `${genTime(notification.createdAt)}` }}</div>
      </div>
      <div
          class="self-center text-sm rounded-full hover:bg-gray-300 hover:dark:bg-ld-border w-6 h-5 text-center cursor-pointer relative">
        <font-awesome-icon v-click-outside="hide" @click="active = !active" icon="fa-solid fa-ellipsis"/>
        <div v-show="active"
             class="absolute text-sm w-200px shadow-lg rounded-lg p-2 right-0 border-1 border-ll-border dark:border-ld-border bg-ll-neutral dark:bg-ld-neutral">
          <div @click="onClickHasRead" class="hover:bg-ll-border hover:dark:bg-gray-700 p-2 rounded-lg">
            <font-awesome-icon :icon="['fas', 'check']"/>
            Đánh dấu là đã đọc
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
