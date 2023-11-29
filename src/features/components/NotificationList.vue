<script>
import {defineComponent} from 'vue'
import NotificationItem from "@/features/components/NotificationItem.vue";
import vClickOutside from 'click-outside-vue3'

export default defineComponent({
  name: "NotificationList",
  components: {NotificationItem},
  data() {
    return {
      navBavConfig: {
        active: 0,
        configs: [
          {
            onClick: this.onShowAll(),
            title: 'Tất cả',
            show: true,
            total: 0
          },
          {
            onClick: this.onShowDontRead(),
            title: 'Chưa đọc',
            show: true,
            total: 0
          }
        ]
      },
      active: false
    }
  },
  props: {
    activeSeeAll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onShowAll() {

    },
    onShowDontRead() {

    },
    hide(event) {
      this.active = false
    },
    onClickSeeAll() {
      this.$router.push({path: '/notification'})
    }
  },
  mounted() {
    // prevent click outside event with popupItem.
    // this.popupItem = this.$el
  },
  // do not forget this section
  directives: {
    clickOutside: vClickOutside.directive
  }
})
</script>

<template>
  <div class="w-full bg-ll-neutral dark:bg-ld-neutral p-4 text-gray-800 dark:text-gray-300 rounded-lg">
    <div class="flex flex-row justify-between">
      <div class="font-bold text-2xl">Thông báo</div>
      <div class="self-center text-center cursor-pointer relative">
        <font-awesome-icon v-click-outside="hide" @click="active = !active"
                           class="rounded-full w-6 h-6 hover:bg-ll-border hover:dark:bg-ld-border"
                           icon="fa-solid fa-ellipsis"/>
        <div v-show="active"
             class="transition-all absolute w-300px shadow-lg rounded-lg p-2 right-0 border-1 border-ll-border dark:border-ld-border bg-ll-neutral dark:bg-ld-neutral">
          <div class="hover:bg-ll-border hover:dark:bg-ld-border p-2 rounded-lg">
            <font-awesome-icon :icon="['fas', 'check']"/>
            Đánh dấu tất cả là đã đọc
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row mt-2">
      <button v-for="(value, index) in navBavConfig.configs" v-show="value.show"
              :class="`${navBavConfig.active === index ? 'p-2 rounded-xl w-100px bg-ll-primary font-medium text-white mr-1' : 'rounded-xl w-100px p-2 font-medium hover:bg-ll-primary hover:text-white mr-1' }`"
              @click="navBavConfig.active = index, value.onClick">{{ value.title }}
      </button>
    </div>
    <div class="mt-8">
      <NotificationItem class="border-b-1 py-4"></NotificationItem>
      <NotificationItem class="border-b-1 py-4"></NotificationItem>
      <NotificationItem class="border-b-1 py-4"></NotificationItem>
    </div>
    <div class="text-center pt-2" v-show="activeSeeAll">
      <button
          class="text-ll-primary font-bold dark:text-ld-primary border-ll-primary dark:border-ld-primary hover:border-b-1"
          @click="onClickSeeAll">Xem tất cả
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>