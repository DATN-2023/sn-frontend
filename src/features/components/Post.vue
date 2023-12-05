<script>

import config from "@/config/config";
import {formatDate, stringToSlug, genImageUrl} from "@/config";
import Comment from "@/features/components/Comment.vue";

const {urlConfig: {imageUrl}, reactionType, reactionTargetType} = config


export default {
  components: {
    Comment
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
      showComment: true
    }
  },
  methods: {
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
      const body = {
        content: this.commentContent,
        feed: this.$props.post._id,
        rank: 1
      }
      const comment = await this.$store.dispatch('feed/createComment', body)
      comment.user = this.$store.getters['auth/userInfo']
      this.comments.unshift(comment)
      this.$props.post.commentTotal++
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
    }
  },
  mounted() {
    if (this.$props.post.isOwn) {
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
  watch: {
    async post(newVal, oldVal) {
      if (!newVal.updated) await this.getComments()
      else {
        delete this.$props.post.updated
      }
    }
  },
}

</script>
<template>
  <div class="w-full p-5 bg-ll-neutral dark:bg-ld-neutral rounded-md flex flex-col mt-4">
    <div class="flex justify-between">
      <div class="flex items-center">
        <div @click="onRoutingUser"
            class="avatar cursor-pointer rounded-full bg-ll-base dark:bg-ld-base w-15 h-15 border-2 border-ll-border dark:border-ld-border relative ">
          <img :src="genImageUrl(post?.user?.avatar || '')"
               class="w-full h-full  rounded-full object-cover" alt="">
        </div>
        <div class="flex flex-col ml-2">
          <p @click="onRoutingUser" class="text-2xl cursor-pointer font-bold text-gray-800 dark:text-gray-300">{{ post?.user?.name || 'Anonymous' }}</p>
          <p class="-mt-1">{{ formatDate(new Date(post.createdAt * 1000)) }}</p>
        </div>

        <div class="flex text-ll-primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
               class="w-6 h-6 -mt-4 ml-2">
            <path fill-rule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clip-rule="evenodd"/>
          </svg>

        </div>
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
      <Menu class="bg-ll-neutral dark:bg-ld-neutral text-sm" ref="menu" id="overlay_menu" :model="items" :popup="true"/>
      <Dialog :visible="visible" :modal="true" header="Header" @update:visible="setUp" :style="{ width: '50vw' }">
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

    <div v-if="post.images.length > 0"
         :class="`images w-full h-70 bg-ll-neutral dark:bg-ld-neutral rounded-xl my-4 overflow-hidden grid ${(post.images.length > 1) ? 'grid-cols-2' : 'grid-cols-1'} gap-2`">
      <div class="h-full">
        <img :src="genImageUrl(post.images[0])" class="w-full h-70   object-cover" alt="">
      </div>
      <div v-if="post.images.length > 1" :class="`

            h-70 grid ${post.images.length === 2 ? 'grid-cols-1 grid-rows-1' : ''}
             ${post.images.length === 3 ? 'grid-cols-1 grid-rows-2' : ''}
            ${post.images.length === 4 ? 'grid-cols-2 grid-rows-2' : ''}


            gap-2`">
        <img v-if="post.images.length > 1" :src="genImageUrl(post.images[1])"
             :class="`w-full h-full   object-cover ${post.images.length === 3 && 'row-span-1 col-span-1 h-full'}`"
             alt="">
        <img v-if="post.images.length > 2" :src="genImageUrl(post.images[2])"
             :class="`w-full h-full   object-cover ${post.images.length === 3 && 'row-span-2 col-span-1'}`"
             alt="">
        <img v-if="post.images.length > 3" :src="genImageUrl(post.images[3])"
             :class="`w-full h-full   object-cover ${post.images.length === 4 && 'col-span-2'}`" alt="">
        <img v-if="post.images.length > 4" :src="genImageUrl(post.images[4])"
             :class="`w-full h-2/4   object-cover ${post.images.length === 5 && 'col-span-3 row-span-1'}`"
             alt="">

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
      <button class="flex items-center active:scale-95 transform transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"/>
        </svg>
        <!--        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
        <!--             stroke="currentColor" class="w-6 h-6">-->
        <!--          <path stroke-linecap="round" stroke-linejoin="round"-->
        <!--                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>-->
        <!--        </svg>-->

        <p class="ml-2">{{ post.shareTotal }}</p>
      </button>
      <!--      <button class="flex items-center active:scale-95 transform transition-transform">-->
      <!--        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
      <!--             stroke="currentColor" class="w-6 h-6">-->
      <!--          <path stroke-linecap="round" stroke-linejoin="round"-->
      <!--                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"/>-->
      <!--        </svg>-->
      <!--      </button>-->
    </div>
    <Transition name="slide-fade">
      <div v-if="hideCommentBox"
           class="mt-2 border-t-1 flex space-x-4 border-ll-border dark:border-ld-border">
      <textarea v-model="commentContent"
                class="bg-ll-border dark:bg-ld-border mt-3 w-full border-1 border-ll-border dark:border-ld-border resize-y h-45px p-2 rounded focus:outline-none focus:border-ll-border dark:focus:border-ld-border focus:shadow-none"
                placeholder="Viết bình luận..."></textarea>
        <button @click="createComment"
                class="text-sm mt-3 px-3 py-2 w-[150px] bg-ll-primary text-white justify-center dark:bg-ld-primary rounded-md flex items-center active:scale-95 transform transition-transform">
          <font-awesome-icon class="mr-2 text-base" v-if="isUploaded" :icon="['fas', 'spinner']" spin/>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
          </svg>
          Bình luận
        </button>
      </div>
    </Transition>
    <div v-show="showComment" v-if="comments.length" class="border-t-1 mt-2 border-ll-border dark:border-ld-border">
      <Comment v-for="(comment, index) in comments" :comment="comment" @onDeleteComment="onDeleteComment(index)"></Comment>
    </div>
  </div>

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
