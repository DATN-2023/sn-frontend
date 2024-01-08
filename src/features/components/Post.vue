<script>

import config from "@/config/config";
import {formatDate, stringToSlug, genImageUrl, genTime} from "@/config";
import Comment from "@/features/components/Comment.vue";
import VueEasyLightbox from 'vue-easy-lightbox'
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const {urlConfig: {imageUrl}, reactionType, reactionTargetType} = config


export default {
  components: {
    Comment, VueEasyLightbox, Toast
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    isDetailPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      items: [],
      isUploaded: false,
      hideCommentBox: false,
      comments: [],
      commentContent: '',
      showComment: true,
      visibleRef: false,
      indexRef: 0,
      imgsRef: [],
      files: [],
      preview: [],
      images: [],
      hideShare: 0,
      toast: null
    }
  },
  methods: {
    genTime,
    onShow() {
      this.visibleRef = true
    },
    showMultiple(index) {
      this.imgsRef = this.post?.images.map(image => this.genImageUrl(image))
      this.indexRef = index
      this.onShow()
    },
    onHide() {
      this.visibleRef = false
    },
    generateDescription() {
      let description = this.post.content.trim().split('\n').join('<br>');
      description = description.replace(/#(\S*)/g, '<a class="text-ll-primary" href="/search/$1">#$1</a>');
      return description;
    },
    genImageUrl,
    formatDate(date) {
      return formatDate(date)
    },
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    async onLike() {
      this.$props.post.liked = !this.$props.post.liked
      if (!this.$props.post.liked) {
        this.$props.post.reactionTotal = this.$props.post.reactionTotal - 1
        await this.$store.dispatch('feed/deleteReaction', this.$props.post._id)
      } else {
        this.$props.post.reactionTotal = this.$props.post.reactionTotal + 1
        const data = {
          targetId: this.$props.post._id,
          type: reactionType.LIKE,
          targetType: reactionTargetType.FEED
        }
        await this.$store.dispatch('feed/createReaction', data)
      }
    },
    async onDeletePost() {
      await this.$store.dispatch('feed/deleteFeed', this.$props.post._id)
      this.visible = false
      this.$emit('onDeletePost')
    },
    onCancelDeletePost() {
      this.visible = false
    },
    setUp(visible) {
      if (!visible) {
        this.visible = false;
      }
    },
    getFeedEndpoint() {
      return `/feed/${stringToSlug(this.$props.post.content.substring(0, 20))}-${this.$props.post._id}`
    },
    async createComment() {
      this.isUploaded = true
      if (this.files.length > 0) {
        for (const file of this.files) {
          const {name} = await this.uploadFile(file)
          this.images.push(`/${name}`)
        }
      }
      const body = {
        content: this.commentContent,
        feed: this.$props.post._id,
        rank: 1,
        images: this.images
      }
      const comment = await this.$store.dispatch('feed/createComment', body)
      if (comment) {
        comment.user = this.$store.getters['auth/userInfo']
        this.comments.unshift(comment)
        this.$props.post.commentTotal++
      }
      this.files = []
      this.preview = []
      this.images = []
      this.commentContent = ''
      this.isUploaded = false
    },
    async getComments() {
      const data = await this.$store.dispatch('feed/getComments', {feed: this.$props.post._id})
      this.comments = data.data
    },
    onDeleteComment(index) {
      this.comments.splice(index, 1)
      this.$props.post.commentTotal--
    },
    onRoutingUser() {
      this.$router.push({path: `/user/${this.$props.post?.user?.customerId}`})
    },
    changeItems(post) {
      if (post.isOwn) {
        this.items = [
          {
            label: 'Xem chi tiết',
            command: () => {
              const path = this.getFeedEndpoint()
              this.$router.push({path})
            }
          },
          {
            label: 'Sửa bài viết',
            command: () => {
              this.$emit("onEditPost")
            }
          },
          {
            label: 'Xóa bài viết',
            command: () => {
              this.visible = true
            }
          }
        ]
      } else {
        this.items = [
          {
            label: 'Xem chi tiết',
            command: () => {
              const path = this.getFeedEndpoint()
              this.$router.push({path})
            },
          }
        ]
      }
      if (this.$props.isDetailPage) {
        this.items.shift()
      }
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
    onClickShare() {
      this.hideShare = !this.hideShare
    },
    async onCopyLink() {
      try {
        await navigator.clipboard.writeText(location.toString());
        this.toast.add({ severity: 'success', summary: 'Thông báo', detail: 'Sao chép thành công', life: 3000 });
      } catch($e) {
        this.toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Sao chép thất bại', life: 3000 });
      }
    }

  },
  mounted() {
    this.changeItems(this.$props.post)
    this.toast = useToast()
  },
  watch: {
    async post(newVal, oldVal) {
      if (!oldVal._id) await this.getComments()
      delete this.$props.post.updated
      this.changeItems(newVal)
    }
  },
}

</script>
<template>
  <Toast />
  <div class="w-full p-5 bg-ll-neutral dark:bg-ld-neutral rounded-md flex flex-col mt-4">
    <div class="flex justify-between">
      <div class="flex items-center">
        <div @click="onRoutingUser"
             class="avatar cursor-pointer rounded-full bg-ll-base dark:bg-ld-base w-15 h-15 border-2 border-ll-border dark:border-ld-border relative ">
          <img :src="genImageUrl(post?.user?.avatar || 'https://images.egosnet.click/social-network/user-128.png')"
               class="w-full h-full  rounded-full object-cover" alt="">
        </div>
        <div class="flex flex-col ml-2">
          <p @click="onRoutingUser" class="text-2xl cursor-pointer font-bold text-gray-800 dark:text-gray-300">
            {{ post?.user?.name || 'Anonymous' }}</p>
          <p class="-mt-1">{{ genTime(post?.createdAt || 0) }}</p>
        </div>

        <!--        <div class="flex text-ll-primary">-->
        <!--          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"-->
        <!--               class="w-6 h-6 -mt-4 ml-2">-->
        <!--            <path fill-rule="evenodd"-->
        <!--                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"-->
        <!--                  clip-rule="evenodd"/>-->
        <!--          </svg>-->

        <!--        </div>-->
      </div>
      <div v-show="items.length"
           class="active:scale-95 transform transition-transform m-2 rounded-full hover:bg-gray-300 hover:cursor-pointer h-6 hover:bg-ll-border hover:dark:bg-ld-border"
           @click="toggle"
           aria-haspopup="true" aria-controls="overlay_menu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd"
                d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                clip-rule="evenodd"/>
        </svg>

      </div>
      <Menu class="text-sm" ref="menu" id="overlay_menu" :model="items" :popup="true"/>
      <Dialog :visible="visible" :modal="true" header="Header" @update:visible="setUp" class="lg:w-[50vw]">
        <template #header>
          <div class="inline-flex align-items-center justify-content-center gap-2">
            <span class="font-bold white-space-nowrap">Bạn chắc chắn muốn xoá bài viết này?</span>
          </div>
        </template>
        <div class="card flex flex-wrap gap-2 justify-content-center">
          <Button @click="onDeletePost"
                  class="bg-ll-primary dark:bg-ld-primary text-white p-2 w-30 mr-4 hover:bg-sky-600"
                  style="border: none;" label="Chấp nhận"></Button>
          <Button @click="onCancelDeletePost" class="hover:bg-gray-400 bg-gray-300 p-2 w-30 border-none" label="Huỷ bỏ"
                  style="border: none;" severity="danger"></Button>
        </div>
      </Dialog>
    </div>

    <div v-show="post?.images && post.images.length > 0"
         :class="`images w-full h-70 md:h-120 xl:h-[550px] 2xl:h-[550px] bg-ll-neutral dark:bg-ld-neutral rounded-xl my-4 overflow-hidden grid ${(post.images.length > 2) ? 'grid-cols-3' : ''} ${(post.images.length === 2) ? 'grid-cols-2' : ''} ${(post.images.length === 1) ? 'grid-cols-1' : ''} gap-2`">
      <div class="h-full" :class="`${(post.images.length > 2) ? 'col-span-2' : ''}`">
        <img @click="showMultiple(0)" :src="genImageUrl(post.images[0])"
             class="w-full h-70 md:h-120 xl:h-[550px] 2xl:h-[550px] cursor-pointer object-cover"
             alt="">
      </div>
      <div v-show="post.images.length > 1" :class="`
            h-70 md:h-120 xl:h-[550px] 2xl:h-[550px] grid ${post.images.length === 2 ? 'grid-cols-1 grid-rows-1' : ''}
             ${post.images.length === 3 ? 'grid-cols-1 grid-rows-2' : ''}
            ${post.images.length > 3 ? 'grid-cols-1 grid-rows-3' : ''}
            gap-2`">
        <img @click="showMultiple(1)" v-show="post.images.length > 1" :src="genImageUrl(post.images[1])"
             :class="` cursor-pointer w-full h-full object-cover ${post.images.length === 3 && 'row-span-1 col-span-1 h-full'}`"
             alt="">
        <img @click="showMultiple(2)" v-show="post.images.length > 2" :src="genImageUrl(post.images[2])"
             :class="`cursor-pointer w-full h-full   object-cover ${post.images.length === 3 && 'row-span-2 col-span-1'}`"
             alt="">
        <div v-show="post.images.length > 3" @click="showMultiple(3)" class="relative"
             :style="`${post.images.length > 4 ? 'background: black;': ''}`">
          <img v-show="post.images.length > 3" :src="genImageUrl(post.images[3])"
               :class="`cursor-pointer w-full h-full object-cover ${post.images.length > 3 && 'col-span-1'}`"
               :style="`${post.images.length > 4 ? 'opacity: 0.8;': ''}`"
               alt="">

          <div v-show="post.images.length > 4" class="absolute text-white text-2xl"
               style="left: 50%; top: 50%; transform: translate(-50%,-50%);">
            +{{ post.images.length - 4 }}
          </div>
        </div>
        <!--        <img @click="showMultiple(4)" v-if="post.images.length > 4" :src="genImageUrl(post.images[4])"-->
        <!--             :class="`cursor-pointer w-full h-2/4   object-cover ${post.images.length === 5 && 'col-span-3 row-span-1'}`"-->
        <!--             alt="">-->

      </div>
    </div>
    <p v-html="generateDescription()" :class="`${post.images.length === 0 ? ' my-4 text-xl' : ''}`"></p>

    <div class="flex justify-between pt-4 border-t border-ll-border dark:border-ld-border mt-4">
      <button class="flex items-center active:scale-95 transform transition-transform" @click="onLike">
        <svg v-if="post.liked" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
             class="bi bi-heart-fill text-red-600" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
        </svg>
        <p class="ml-2">{{ post.reactionTotal }}</p>
      </button>
      <button class="flex items-center active:scale-95 transform transition-transform "
              @click="hideCommentBox = !hideCommentBox">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"/>
        </svg>
        <p class="ml-2">{{ post.commentTotal }}</p>
      </button>
      <div class="relative">
        <button @click="onClickShare" class="flex items-center active:scale-95 transform transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"/>
          </svg>
        </button>
        <div v-show="hideShare" class="absolute z-10 border w-240px bg-gray-600 text-white dark:bg-ld-border rounded border-ll-border dark:border-ld-border right-0">
          <button @click="onCopyLink" class="w-full p-1.5 rounded">Sao chép đường liên kết</button>
        </div>
      </div>
    </div>
    <div>
      <input type="file" ref="upload" hidden="" @change="changeFileUpload">
    </div>
    <Transition name="slide-fade">
      <div v-if="hideCommentBox"
           class="mt-2 pt-2 border-t-1 flex space-x-4 border-ll-border dark:border-ld-border">
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
          <textarea v-model="commentContent"
                    class="bg-ll-border dark:bg-ld-border w-full border-1 border-ll-border dark:border-ld-border
                  h-45px p-2 rounded focus:outline-none focus:border-ll-border dark:focus:border-ld-border focus:shadow-none"
                    placeholder="Viết bình luận..."></textarea>
        </div>
        <div class="self-end">
          <button @click="createComment"
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
    </Transition>
    <div v-show="showComment" v-if="comments.length" class="border-t-1 mt-2 border-ll-border dark:border-ld-border">
      <Comment v-for="(comment, index) in comments" :comment="comment"
               @onDeleteComment="onDeleteComment(index)"></Comment>
    </div>
  </div>
  <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
  ></vue-easy-lightbox>

</template>
<style>
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.3, 0, 0.6, 1);
}

.slide-fade-leave-to {
  transform: translateY(-10px);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}


</style>
