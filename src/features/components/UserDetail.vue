<script>
import {defineComponent} from 'vue'
import {genImageUrl} from "@/config";
import config from "@/config/config";

const {friendRequestConfig} = config
export default defineComponent({
  name: "UserDetail",
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    genImageUrl,
    onUploadFiles() {
      this.$refs.upload.click()
    },
    async changeFileUpload(event) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0]
        const {name} = await this.uploadFile(file)
        const body = {
          ...this.user,
          avatar: `/${name}`
        }
        const user = await this.updateUser(this.user._id, body)
        this.$props.user.avatar = user.avatar
      }
    },
    async uploadFile(file) {
      const data = await this.$store.dispatch('upload/getPresignedUrl', {name: file.name})
      await this.$store.dispatch('upload/uploadFile', {url: data.url, file, type: file.type})
      return {name: data.name}
    },
    async updateUser(id, body) {
      return this.$store.dispatch('user/updateUser', {id, body})
    },
    checkFriend() {
      return this.$props.user?.friendStatus === friendRequestConfig.ACCEPT
    },
    checkNotFriend() {
      return this.$props.user?.friendStatus === friendRequestConfig.UNFRIEND
    },
    checkPending() {
      return this.$props.user?.friendStatus === friendRequestConfig.PENDING
    },
    async createFriend() {
      const body = {
        receiver: this.$props.user._id,
        type: friendRequestConfig.PENDING
      }
      const friend = await this.$store.dispatch('user/createFriend', body)
      this.$props.user.friendStatus === friend.type
    }
  }
})
</script>

<template>
  <div class="relative bg-ll-neutral dark:bg-ld-neutral w-full p-2 rounded">
    <img
        class="absolute border-4 rounded-full w-[150px] h-[150px] object-cover left-33 -top-20 border-ll-border dark:border-ld-border"
        :src="genImageUrl(user.avatar || '')" alt="image">
    <div>
      <input type="file" ref="upload" hidden="" @change="changeFileUpload">
    </div>
    <button @click="onUploadFiles"
            class="absolute rounded-full left-60 top-5 w-10 h-10 mr-2 border flex justify-center items-center border-ll-border dark:border-ld-border bg-ll-border dark:bg-ld-border hover:bg-ll-neutral hover:dark:bg-ld-neutral dark:text-gray-500 active:scale-95 transition-transform transform">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
      </svg>
    </button>
    <div class="pt-20 font-bold text-center p-2">{{ user.name }}</div>
    <div class="text-center p-2">{{ user.description }}</div>
    <div class="mt-6 flex justify-between">
      <div class="text-center">
        <div class="bold text-ll-primary">Bạn bè</div>
        <div>{{ user.friendTotal }}</div>
      </div>
      <div class="text-center">
        <div class="bold text-ll-primary">Bài đăng</div>
        <div>{{ user.feedTotal }}</div>
      </div>
      <div class="text-center">
        <div class="bold text-ll-primary">Lượt thích</div>
        <div>3</div>
      </div>
    </div>
    <button
        class="mt-8 border-1 w-full rounded-lg p-2 mt-2 border-ll-border dark:border-ld-border text-ll-primary bold hover:bg-ll-primary hover:text-white hover:dark:text-ld-neutral">
      Chỉnh sửa trang cá nhân
    </button>
    <button v-show="checkFriend()" @click="createFriend"
            class="mt-6 mb-3 border-1 w-full rounded-lg p-2 border-ll-border dark:border-ld-border text-ll-primary bold hover:bg-ll-primary hover:text-white hover:dark:text-ld-neutral">
      Bạn bè
    </button>
    <button v-show="checkPending()" @click="createFriend"
            class="mt-6 mb-3 border-1 w-full rounded-lg p-2 border-ll-border dark:border-ld-border text-ll-primary bold hover:bg-ll-primary hover:text-white hover:dark:text-ld-neutral">
      x Hủy yêu cầu
    </button>
    <button v-show="checkNotFriend()" @click="createFriend"
            class="mt-6 mb-3 border-1 w-full rounded-lg p-2 border-ll-border dark:border-ld-border text-ll-primary bold hover:bg-ll-primary hover:text-white hover:dark:text-ld-neutral">
      + Kết bạn
    </button>
  </div>
</template>

<style scoped>

</style>