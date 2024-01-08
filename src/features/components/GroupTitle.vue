<script>
import {defineComponent} from 'vue'
import config from "@/config/config";
import {genImageUrl} from "@/config";

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
    genImageUrl,
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
    },
    onUploadFiles() {
      this.$refs.uploadThumbnail.click()
    },
    async changeFileUpload(event) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0]
        const {name} = await this.uploadFile(file)
        const body = {
          ...this.$props.group,
          thumbnail: `/${name}`
        }
        this.$emit('uploadThumbnail', body)
      }
    },
    async uploadFile(file) {
      const data = await this.$store.dispatch('upload/getPresignedUrl', {name: file.name})
      await this.$store.dispatch('upload/uploadFile', {url: data.url, file, type: file.type})
      return {name: data.name}
    },
  },
  mounted() {

  }
})
</script>

<template>
  <div class="flex py-2 px-4 w-full space-x-4 ">
    <div class="relative">
      <img class="w-32 h-32 rounded grow-0 object-cover" :src="group?.thumbnail ? genImageUrl(group?.thumbnail, '200x') : 'https://minio.egosnet.click/social-network/3566801.jpg'"
           alt="image">
      <div>
        <input type="file" ref="uploadThumbnail" hidden="" @change="changeFileUpload">
      </div>
      <button @click="onUploadFiles"
              class="absolute -right-2 bottom-0 w-10 h-10 mr-2 border rounded flex justify-center items-center border-ll-border dark:border-ld-border hover:bg-ll-border hover:dark:bg-ld-border dark:text-gray-500 active:scale-95 transition-transform transform">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
        </svg>
      </button>
    </div>
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
