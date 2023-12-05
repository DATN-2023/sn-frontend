<script>
import {defineComponent} from 'vue'
import config from "@/config/config";

const {joinStatusGroupConfig} = config

export default defineComponent({
  name: "GroupTitle",
  props: {
    group: {
      type: Object
    }
  },
  data() {
    return {
      joinStatusGroupConfig
    }
  },
  methods: {
    async onJoin() {
      const body = {
        group: this.$props.group._id
      }
      const userGroup = await this.$store.dispatch('group/createUserGroup', body)
      this.$props.group.userStatus = userGroup.status
    },
    async onPending() {
      await this.$store.dispatch('group/deleteUserGroup', this.$props.group._id)
      this.$props.group.userStatus = 0
    }
  },
  mounted() {

  }
})
</script>

<template>
  <div class="flex py-2 px-4 w-full space-x-4 ">
    <img class="w-32 h-32 rounded grow-0" :src="group?.thumbnail || 'https://images-cdn.carpla.dev/256x/xeco.webp'"
         alt="image">
    <div class="flex justify-between flex-1">
      <div class="self-center space-y-4">
        <div class="text-2xl">{{ group?.name || 0 }}</div>
        <div>{{ `${group.memberTotal || 0} thành viên` }}</div>
      </div>
      <div class="self-center text-white">
        <button v-show="!group?.userStatus" @click="onJoin"
                class="p-2 rounded bg-ll-primary dark:ng-ld-primary hover:bg-sky-600">+ Tham Gia
        </button>
        <button v-show="group.userStatus === joinStatusGroupConfig.MEMBER"
                class="p-2 rounded bg-ll-primary dark:ng-ld-primary hover:bg-sky-600">Thành viên
        </button>
        <button v-show="group.userStatus === joinStatusGroupConfig.PENDING" @click="onPending"
                class="p-2 rounded bg-ll-primary dark:ng-ld-primary hover:bg-sky-600">Chờ phê duyệt
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
