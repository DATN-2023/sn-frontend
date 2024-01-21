<script>
import {defineComponent} from 'vue'
import NotificationItem from "@/features/components/NotificationItem.vue";
import vClickOutside from 'click-outside-vue3'
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

export default defineComponent({
  name: "NotificationList",
  components: {NotificationItem, InfiniteLoading},
  data() {
    return {
      navBavConfig: {
        active: 0,
        configs: [
          {
            onClick: this.onShowAll,
            title: 'Tất cả',
            show: true,
            total: 0
          },
          {
            onClick: this.onShowDontRead,
            title: 'Chưa đọc',
            show: true,
            total: 0
          }
        ]
      },
      active: false,
      notifications: [],
      totalUnread: 0,
      page: 0,
      isLoadmore: 1
    }
  },
  props: {
    activeSeeAll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async getNotification(q = {}) {
      const res = await this.$store.dispatch('notification/getNotifications', q)
      this.notifications = this.notifications.concat(res?.data || [])
      this.page = +res?.page || 0
      this.isLoadmore = this.notifications.length < res.total;
      this.$emit('setTotalUnread', res?.totalUnread || 0)
      return res
    },
    async onShowAll(index) {
      this.navBavConfig.active = index
      this.notifications = []
      this.isLoadmore = 1
      await this.getNotification()
    },
    async onShowDontRead(index) {
      this.navBavConfig.active = index
      this.notifications = []
      this.isLoadmore = 1
      await this.getNotification({hasRead: 0})
    },
    hide(event) {
      this.active = false
    },
    onClickSeeAll() {
      this.$router.push({path: '/notification'})
    },
    incTotalUnread() {
      this.totalUnread++
      this.$emit('setTotalUnread', this.totalUnread || 0)
      this.onShowAll(0)
    },
    async loadItem($state) {
      try {
        console.log('loading...', this.page)
        let res
        if (this.navBavConfig.active === 0) {
          res = await this.getNotification({page: this.page + 1})
        } else if (this.navBavConfig.active === 1) {
          res = await this.getNotification({page: this.page + 1, hasRead: 0})
        }
        if (this.isLoadmore) $state.loaded()
        // $state.loaded();
      } catch (e) {
        $state.error()
      }
    }
  },
  mounted() {
    this.onShowAll(0)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", async (e) => {
        try {
          this.incTotalUnread()
        } catch (e) {
          console.log(e);
        }
      });
    }
  },
  // do not forget this section
  directives: {
    clickOutside: vClickOutside.directive
  }
})
</script>

<template>
  <div
      class="w-full h-full bg-ll-neutral dark:bg-ld-neutral border-1 border-ll-border dark:border-ld-border p-4 text-gray-800 dark:text-gray-300 rounded-lg">
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
              @click="value.onClick(index)">{{ value.title }}
      </button>
    </div>
    <div class="mt-8 overflow-y-auto h-400px">
      <NotificationItem  @onClickHasRead="$emit('onClickHasRead')" v-for="item in notifications"
                        class="border-b-1 dark:border-gray-700 py-4" :notification="item"></NotificationItem>
      <InfiniteLoading @infinite="loadItem">
        <template #spinner>
          <span></span>
        </template>
      </InfiniteLoading>
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
