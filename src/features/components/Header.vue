<template >
    <div class="flex w-full h-full justify-between items-center">
        <div class="flex items-center">
            <button @click="$emit('onMenuClick')"
                class="w-10 h-10 mr-2 border rounded-md flex justify-center items-center ml-2 border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95 transition-transform transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
            </button>

            <p @click="() => this.$router.push({path: '/'})" class="text-xl cursor-pointer font-normal font-bold">EGOSNET</p>
        </div>

        <div
            class="bg-ll-base dark:bg-ld-base rounded-md border  border-ll-border dark:border-ld-border w-2/4 h-3/4 flex items-center">
            <input type="text" placeholder="Search on egosnet..."
                class="px-2 bg-transparent text-md outline-none w-full h-full">

            <button class="p-2 active:scale-95 transform transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>

            </button>
        </div>
        <div v-if="showAlert" class="relative">
            <button @click="onClickAlert" :class="`${active ? 'text-ll-primary dark:text-ld-primary' : ''}`"
                class="w-10 h-10 mr-2 border rounded-md flex justify-center items-center ml-2 border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95 transition-transform transform">
              <font-awesome-icon :icon="['fas', 'bell']" />
            </button>
          <div v-show="totalUnread" class="absolute right-0 top-0 text-white bg-red-500 w-5 h-5 rounded-full text-[12px] inline-block flex items-center justify-center">
            {{+totalUnread > 10 ? '9+' : totalUnread}}
          </div>
          <div v-show="active" class="z-1 absolute -right-10 w-[380px]">
            <NotificationList @setTotalUnread="data => totalUnread = data" @onClickHasRead="totalUnread--" :active-see-all="true"></NotificationList>
          </div>
        </div>
      <div v-else></div>
<!--        <div>-->
<!--            <button @click="$emit('onRightMenuClick')"-->
<!--                class="w-10 h-10 mr-2 border rounded-md flex justify-center items-center ml-2 border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95 transition-transform transform">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
<!--                    stroke="currentColor" class="w-6 h-6">-->
<!--                    <path stroke-linecap="round" stroke-linejoin="round"-->
<!--                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />-->
<!--                </svg>-->

<!--          </button>-->
<!--        </div>-->
    </div>
</template>
<script>
import NotificationList from "@/features/components/NotificationList.vue";

export default {
  components: {NotificationList},
  data() {
    return {
      active: false,
      totalUnread: 0
    }
  },
  props: {
    showAlert: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClickAlert() {
      this.active = !this.active
    }
  }
}
</script>
