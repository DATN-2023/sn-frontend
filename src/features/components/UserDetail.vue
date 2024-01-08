<script>
import {defineComponent} from 'vue'
import {genImageUrl} from "@/config";
import config from "@/config/config";
import PostCreation from "@/features/components/PostCreation.vue";

const {friendRequestConfig} = config
export default defineComponent({
  name: "UserDetail",
  components: {PostCreation},
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
    checkFollow() {
      return this.$props.user?.following
    },
    checkUnfollow() {
      return !this.$props.user?.following
    },
    async followUser() {
      const body = {
        receiver: this.$props.user.customerId
      }
      const friend = await this.$store.dispatch('user/createFriend', body)
      this.$props.user.following = true
      this.$props.user.friendId = friend._id
      this.$props.user.followerTotal++
    },
    async unfollowUser() {
      await this.$store.dispatch('user/deleteFriend', this.$props.user.friendId)
      this.$props.user.following = false
      this.$props.user.friendId = ''
      this.$props.user.followerTotal--
    },
    displayEditPersonal() {
      return this.user?.isMe
    },
    setUp(visible) {
      if (!visible) {
        this.visible = false;
      }
    },
    onEditUserPopup() {
      this.visible = true
      this.description = this.$props.user.description
      this.date = new Date(this.$props.user.dob * 1000)
      this.name = this.$props.user.name
      this.place = this.$props.user.place
    },
    async onUpdateUser() {
      const body = this.$props.user
      const id = body._id
      delete body._id
      body.description = this.description
      body.name = this.name
      body.dob = Math.floor(this.date / 1000)
      body.place = this.place
      const user = await this.$store.dispatch('user/updateUser', {id, body})
      this.visible = false
    },
    async onChat() {
      const body = {
        members: [this.user.customerId]
      }
      const data = await this.$store.dispatch('chat/createChannel', body)
      if (!data) alert('create error')
      else this.$router.push({path: '/chat'})
    },
    genDate(time) {
      const date = new Date(time)
      console.log('date', date)
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
  },
  data() {
    return {
      visible: false,
      description: '',
      date: null,
      place: '',
      name: ''
    }
  }
})
</script>

<template>
  <div class="relative bg-ll-neutral dark:bg-ld-neutral w-full p-2 rounded">
    <div>
      <img
          class="absolute border-4 rounded-full w-[150px] h-[150px] object-cover left-0 right-0 ml-auto mr-auto -top-20 border-ll-border dark:border-ld-border"
          :src="genImageUrl(user.avatar || 'https://minio.egosnet.click/social-network/user-128.png')" alt="image">
      <div>
        <input type="file" ref="upload" hidden="" @change="changeFileUpload">
      </div>
      <button @click="onUploadFiles"
              class="absolute rounded-full left-30 right-0 ml-auto mr-auto top-5 w-10 h-10 mr-2 border flex justify-center items-center border-ll-border dark:border-ld-border bg-ll-border dark:bg-ld-border hover:bg-ll-neutral hover:dark:bg-ld-neutral dark:text-gray-500 active:scale-95 transition-transform transform">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
        </svg>
      </button>
    </div>
    <div class="pt-20 font-bold text-center p-2">{{ user.name }}</div>
<!--    <div class="text-center p-2">{{ user.description }}</div>-->
    <div class="mt-6 flex justify-between">
      <div class="text-center">
        <div class="bold text-ll-primary">Người theo dõi</div>
        <div>{{ user.followerTotal || 0 }}</div>
      </div>
      <div class="text-center">
        <div class="bold text-ll-primary">Đang theo dõi</div>
        <div>{{ user.followeeTotal || 0 }}</div>
      </div>
      <div class="text-center">
        <div class="bold text-ll-primary">Bài viết</div>
        <div>{{ user.feedTotal || 0 }}</div>
      </div>
    </div>
    <button v-show="displayEditPersonal()" @click="onEditUserPopup"
            class="mt-8 border-1 w-full rounded-lg p-2 mb-2 border-ll-border dark:border-ld-border text-ll-primary bold hover:bg-ll-primary hover:text-white hover:dark:text-ld-neutral">
      Chỉnh sửa trang cá nhân
    </button>
    <div v-show="!displayEditPersonal()">
      <button v-show="checkFollow()" @click="unfollowUser"
              class="mt-6 mb-3 border-1 w-full rounded-lg p-2 border-ll-border dark:border-ld-border text-ll-primary bold hover:bg-ll-primary hover:text-white hover:dark:text-ld-neutral">
        Đang theo dõi
      </button>
      <button v-show="checkUnfollow()" @click="followUser"
              class="mt-6 mb-3 border-1 w-full rounded-lg p-2 border-ll-border dark:border-ld-border text-ll-primary bold hover:bg-ll-primary hover:text-white hover:dark:text-ld-neutral">
        Theo dõi
      </button>
    </div>
    <button v-show="!displayEditPersonal()" @click="onChat"
            class="mb-3 border-1 w-full rounded-lg p-2 border-ll-border dark:border-ld-border text-ll-primary bold hover:bg-ll-primary hover:text-white hover:dark:text-ld-neutral">
      Nhắn tin
    </button>
  </div>
  <div class="bg-ll-neutral dark:bg-ld-neutral w-full mt-2 p-2 rounded">
    <div class="text-2xl bold">
      Thông tin cá nhân
    </div>
    <div class="text-center py-3">
      {{ user?.description || 'asdcs' }}
    </div>
    <table >
      <tbody>
        <tr>
          <td><font-awesome-icon :icon="['fas', 'house']" /></td>
          <td>{{ user.place || 'casdc' }}</td>
        </tr>
        <tr>
          <td><font-awesome-icon :icon="['fas', 'cake-candles']" /></td>
          <td>{{ genDate(user.dob) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Dialog :visible="visible" modal header="Chỉnh sửa thông tin cá nhân" @update:visible="setUp"
          :style="{ width: '30vw' }">
    <div class="bold py-2">Tên:</div>
    <input type="text" class="w-full rounded" v-model="name">
    <div class="bold py-2">Mô tả về bản thân:</div>
    <textarea v-model="description" class="w-full p-2 h-70px text-sm rounded"></textarea>
    <div class="bold py-2">Địa chỉ:</div>
    <input v-model="place" type="text" class="w-full rounded">
    <div class="bold py-2">Ngày sinh:</div>
    <div>
      <Calendar v-model="date"/>
    </div>
    <button @click="onUpdateUser"
            class="border-1 p-2 mt-6 rounded bg-ll-primary dark:bg-ld-primary text-white bold hover:bg-blue-700">Cập
      nhật
    </button>
  </Dialog>
</template>

<style scoped>
td {
  padding: 5px;
}
</style>
