<script>
import {defineComponent} from 'vue'
import config from '@/config/config'
import {genImageUrl, genTime} from '@/config'
import VueEasyLightbox from 'vue-easy-lightbox'

const {urlConfig: {imageUrl}, reactionTargetType, reactionType} = config

export default defineComponent({
  name: "Comment",
  components: {
    VueEasyLightbox
  },
  props: {
    comment: {
      type: Object
    },
    isOwnPost: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      liked: false,
      visible: false,
      editing: false,
      isUploaded: false,
      content: '',
      files: [],
      preview: [],
      images: [],
      visibleRef: false,
      indexRef: 0,
      imgsRef: []
    }
  },
  methods: {
    genTime,
    genImageUrl,
    onShow() {
      this.visibleRef = true
    },
    showMultiple(index) {
      this.imgsRef = this.comment?.images.map(image => this.genImageUrl(image, '500x'))
      this.indexRef = index
      this.onShow()
    },
    onHide() {
      this.visibleRef = false
    },
    generateDescription() {
      let description = this.comment.content ? this.comment.content.trim().split('\n').join('<br>')
          : 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
      description = description.replace(/#(\S*)/g, '<a class="text-ll-primary" href="/search/$1">#$1</a>');
      return description;
    },
    onRoutingUser() {
      this.$router.push({path: `/user/${this.$props.comment?.user?.customerId}`})
    },
    async onLike() {
      this.$props.comment.liked = !this.$props.comment.liked
      if (!this.$props.comment.liked) {
        this.$props.comment.reactionTotal = this.$props.comment.reactionTotal - 1
        await this.$store.dispatch('feed/deleteReaction', this.$props.comment._id)
      } else {
        this.$props.comment.reactionTotal = this.$props.comment.reactionTotal + 1
        const data = {
          targetId: this.$props.comment._id,
          type: reactionType.LIKE,
          targetType: reactionTargetType.COMMENT
        }
        await this.$store.dispatch('feed/createReaction', data)
      }
    },
    async onEdit() {
      this.editing = true
      this.content = this.$props.comment.content
      this.images = this.comment.images
      this.preview = this.comment.images.map(image => ({src: genImageUrl(image, '500x'), name: image.split('/').pop()}))
    },
    async onDelete() {
      this.visible = true
    },
    setUp(visible) {
      if (!visible) {
        this.visible = false;
      }
    },
    async onDeleteComment() {
      await this.$store.dispatch('feed/deleteComment', this.$props.comment._id)
      this.visible = false
      this.$emit('onDeleteComment')
    },
    onCancelDeleteComment() {
      this.visible = false
    },
    async updateComment() {
      this.isUploaded = true
      if (this.files.length > 0) {
        for (const file of this.files) {
          const {name} = await this.uploadFile(file)
          this.images.push(`/${name}`)
        }
      }
      const body = {
        ...this.$props.comment,
        content: this.content,
        images: this.images
      }
      console.log(body)
      await this.$store.dispatch('feed/updateComment', {id: this.$props.comment._id, body})
      this.isUploaded = false
      this.files = []
      this.preview = []
      this.images = []
      this.content = ''
      this.editing = false
    },
    async changeFileUpload(event) {
      if (event.target.files && event.target.files[0]) {
        const files = event.target.files
        this.files.push(...files)
        for (const file of files) {
          const src = URL.createObjectURL(file)
          this.preview.push({
            src,
            name: file.name
          })
        }
        console.log('preview', this.preview)
      }
    },
    async uploadFile(file) {
      const data = await this.$store.dispatch('upload/getPresignedUrl', {name: file.name})
      await this.$store.dispatch('upload/uploadFile', {url: data.url, file, type: file.type})
      return {name: data.name}
    },
    onUploadFiles() {
      this.$refs.upload.click()
    },
    onDeleteImage(index) {
      this.preview.splice(index, 1)
      this.images.splice(index, 1)
      this.files.splice(index, 1)
    },
    isOwnComment() {
      return this.comment?.isOwn || 0
    }
  }
})
</script>

<template>
  <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
  ></vue-easy-lightbox>
  <div v-if="editing" class="w-full px-5 py-2 bg-ll-neutral dark:bg-ld-neutral rounded-md flex flex-col">
    <div>
      <input type="file" ref="upload" hidden="" @change="changeFileUpload">
    </div>
    <div
        class="mt-2 flex space-x-4">
      <button v-if="!this.preview.length" @click="onUploadFiles"
              class="w-10 self-end h-45px mb-1.5 border rounded-md flex justify-center items-center border-ll-border dark:border-ld-border
                bg-ll-base dark:bg-ld-base dark:text-gray-500 active:scale-95 transition-transform transform">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
        </svg>
      </button>
      <div class="w-full self-end">
        <div class="flex-wrap flex items-center justify-start">
          <div class="p-2" v-for="(file, index) in preview">
            <div class="relative inline-block pt-2">
              <img :src="file.src" class="w-100px" :alt="file.name">
              <button @click="onDeleteImage(index)"
                      class="w-8 h-8 absolute -top-0 -right-2 bg-ll-neutral dark:bg-ld-neutral text-sm  border-ll-border dark:border-ld-border border rounded-full flex items-center active:scale-95 transform transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-full h-full">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <textarea v-model="content"
                  class="bg-ll-border dark:bg-ld-border w-full border-1 border-ll-border dark:border-ld-border
                  h-45px p-2 rounded focus:outline-none focus:border-ll-border dark:focus:border-ld-border focus:shadow-none"
                  placeholder="Viết bình luận..."></textarea>
      </div>
      <div class="self-end">
        <button @click="updateComment"
                class="text-sm mb-1.5 px-3 py-2 h-45px w-[120px] bg-ll-primary text-white justify-center dark:bg-ld-primary
                rounded-md flex items-center active:scale-95 transform transition-transform">
          <font-awesome-icon class="mr-2 text-base" v-if="isUploaded" :icon="['fas', 'spinner']" spin/>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
          </svg>
          Bình luận
        </button>
      </div>
    </div>
  </div>
  <div v-else class="w-full px-5 py-2 bg-ll-neutral dark:bg-ld-neutral rounded-md flex flex-col">
    <div class="">
      <div class="flex items-start gap-2">
        <div @click="onRoutingUser"
             class="cursor-pointer flex-shrink-0 avatar rounded-full bg-ll-base dark:bg-ld-base w-10 h-10 border-2 border-ll-border dark:border-ld-border relative ">
          <img :src="genImageUrl(comment?.user?.avatar || 'https://minio.egosnet.click/social-network/user-128.png', '200x')"
               class="w-full h-full rounded-full object-cover" alt="">
        </div>
        <div class="relative">
          <div class="bg-ll-border p-2 rounded-lg dark:bg-ld-border inline-block">
            <p @click="onRoutingUser" class="cursor-pointer text-sm font-bold text-gray-800 dark:text-gray-100">
              {{ comment?.user?.name || 'Anonymous' }}</p>
            <p class="text-sm break-words" v-html="generateDescription()"></p>
          </div>
          <div v-if="comment?.images && comment?.images?.length > 0"
               :class="`w-full bg-ll-neutral dark:bg-ld-neutral rounded-xl mb-2 overflow-hidden grid `">
            <div class="">
              <img @click="showMultiple(0)" :src="genImageUrl(comment.images[0], '500x')" class="w-300px cursor-pointer object-cover" alt="">
            </div>
          </div>
          <div v-if="comment.reactionTotal"
               class="absolute bg-ll-border rounded-lg dark:bg-ld-border -bottom-2 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                 class="bi bi-heart-fill text-red-600 inline" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
            <p class="pl-1 inline" style="font-size: 13px;">{{ comment.reactionTotal }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="ml-12 flex space-x-2 justify-start pt-4dark:border-ld-border mt-2">
      <p class="flex bold text-sm">{{ genTime(comment?.createdAt || 0) }}</p>
      <button class="flex items-center active:scale-95 transform transition-transform" @click="onLike">
        <p :class="[comment.liked ? 'text-ll-primary' : '', 'bold text-sm ml-2 hover:underline']">Thích</p>
      </button>
      <button v-if="isOwnComment()" class="flex items-center active:scale-95 transform transition-transform" @click="onEdit">
        <p class="bold text-sm ml-2 hover:underline">Sửa</p>
      </button>
      <button v-if="isOwnPost || isOwnComment()" class="flex items-center active:scale-95 transform transition-transform" @click="onDelete">
        <p class="bold text-sm ml-2 hover:underline">Xóa</p>
      </button>
    </div>
  </div>
  <Dialog :visible="visible" :modal="true" header="Header" @update:visible="setUp" :style="{ width: '50vw' }">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">Bạn chắc chắn muốn xoá bài viết này?</span>
      </div>
    </template>
    <div class="card flex flex-wrap gap-2 justify-content-center">
      <Button @click="onDeleteComment"
              class="bg-ll-primary dark:bg-ld-primary text-white p-2 w-30 mr-4 hover:bg-sky-600"
              style="border: none;" label="Chấp nhận"></Button>
      <Button @click="onCancelDeleteComment" class="hover:bg-gray-400 bg-gray-300 p-2 w-30 border-none" label="Huỷ bỏ"
              style="border: none;" severity="danger"></Button>
    </div>
  </Dialog>
</template>

<style scoped>

</style>
