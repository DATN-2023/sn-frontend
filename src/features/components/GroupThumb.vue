<script>
import {defineComponent} from 'vue'
import {genImageUrl, genGroupName} from "@/config";
import config from "@/config/config";

const {joinStatusGroupConfig} = config

export default defineComponent({
  name: "GroupThumb",
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      joinStatusGroupConfig
    }
  },
  methods: {
    genImageUrl,
    genGroupName,
    async onJoin() {
      const body = {
        group: this.item?.data._id
      }
      const userGroup = await this.$store.dispatch('group/createUserGroup', body)
      if (userGroup) this.$props.item.data.userStatus = userGroup.status
    },
    onClickTitle() {
      this.$router.push({path: `/group/${this.$props.item.data._id}`})
    },
    async onPending() {
      await this.$store.dispatch('group/deleteUserGroup', this.item?.data?._id)
      this.$props.item.data.userStatus = 0
    },
  }
})
</script>

<template>
  <div class="<sm:w-300px h-320px w-330px rounded rounded-xl bg-ll-neutral dark:bg-ld-neutral">
    <img class="<sm:w-300px w-330px h-180px rounded-t-lg object-fill"
         :src="[item?.data?.banner ? genImageUrl(item?.data?.banner) : 'https://minio.egosnet.click/social-network/2975662.jpg']" alt="image">
    <div class="mx-4 my-2">
      <div @click="onClickTitle" class="cursor-pointer">
        <div class="bold text-xl">{{ genGroupName(item?.data?.name || '') }}</div>
        <div>{{ `${item?.data?.memberTotal || 0} thành viên` }}</div>
      </div>
      <button v-show="!item?.data?.userStatus" @click="onJoin"
              class="border border-2 p-2 w-full rouded border-ll-border dark:border-ld-border hover:bg-ll-border hover:dark:bg-ld-border rounded-2xl my-2">Tham Gia
      </button>
      <button v-show="item?.data?.userStatus === joinStatusGroupConfig.MEMBER"
              class="border border-2 p-2 w-full rouded border-ll-border dark:border-ld-border hover:bg-ll-border hover:dark:bg-ld-border rounded-2xl my-2">Thành viên
      </button>
      <button v-show="item?.data?.userStatus === joinStatusGroupConfig.PENDING" @click="onPending"
              class="border border-2 p-2 w-full rouded border-ll-border dark:border-ld-border hover:bg-ll-border hover:dark:bg-ld-border rounded-2xl my-2">Chờ phê duyệt
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
