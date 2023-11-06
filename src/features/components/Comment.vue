<script>
import {defineComponent} from 'vue'
import config from '@/config/config'

const {urlConfig: {imageUrl}, reactionTargetType, reactionType} = config

export default defineComponent({
  name: "Comment",
  props: {
    comment: {
      type: Object
    }
  },
  data() {
    return {
      liked: false,
      visible: false,
      editing: false,
      isUploaded: false,
      content: ''
    }
  },
  methods: {
    genImageUrl(endpoint) {
      return `${imageUrl}${endpoint}`
    },
    generateDescription() {
      let description = this.comment.content ? this.comment.content.trim().split('\n').join('<br>')
          : 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
      description = description.replace(/#(\S*)/g, '<a class="text-ll-primary" href="/search/$1">#$1</a>');
      return description;
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
      this.$props.comment.content = this.content
      await this.$store.dispatch('feed/updateComment', {id: this.$props.comment._id, body: this.$props.comment})
      this.isUploaded = false
      this.editing = false
    }
  }
})
</script>

<template>
  <div v-if="editing" class="w-full px-5 py-2 bg-ll-neutral dark:bg-ld-neutral rounded-md flex flex-col">
    <div
        class="mt-2 border-t-1 flex space-x-4 border-ll-border dark:border-ld-border">
      <textarea v-model="content"
                class="bg-ll-border dark:bg-ld-border mt-3 w-full border-1 border-ll-border dark:border-ld-border resize-y h-45px p-2 rounded focus:outline-none focus:border-ll-border dark:focus:border-ld-border focus:shadow-none"
                placeholder="Viết bình luận..."></textarea>
      <button @click="updateComment"
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
  </div>
  <div v-else class="w-full px-5 py-2 bg-ll-neutral dark:bg-ld-neutral rounded-md flex flex-col">
    <div class="">
      <div class="flex items-center gap-2">
        <div
            class="flex-shrink-0 avatar rounded-full bg-ll-base dark:bg-ld-base w-10 h-10 border-2 border-ll-border dark:border-ld-border relative ">
          <img :src="comment?.user?.avatar || ''"
               class="w-full h-full rounded-full object-cover" alt="">
        </div>
        <div class="flex flex-col bg-ll-border rounded-lg dark:bg-ld-border p-2 relative">
          <p class="text-sm font-bold text-gray-800 dark:text-gray-100">{{ comment?.user?.name || 'Anonymous' }}</p>
          <p class="text-sm break-words" v-html="generateDescription()"></p>
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

    <div v-if="comment?.images && comment?.images?.length > 0"
         :class="`images w-full h-70 bg-ll-neutral dark:bg-ld-neutral rounded-xl my-4 overflow-hidden grid ${(comment.images.length > 1) ? 'grid-cols-2' : 'grid-cols-1'} gap-2`">
      <div class="h-full">
        <img :src="genImageUrl(comment.images[0])" class="w-full h-70   object-cover" alt="">
      </div>
    </div>

    <div class="ml-12 flex space-x-2 justify-start pt-4dark:border-ld-border mt-2">
      <p class="flex bold text-sm">2h</p>
      <button class="flex items-center active:scale-95 transform transition-transform" @click="onLike">
        <p :class="[comment.liked ? 'text-ll-primary' : '', 'bold text-sm ml-2 hover:underline']">Thích</p>
      </button>
      <button class="flex items-center active:scale-95 transform transition-transform" @click="onEdit">
        <p class="bold text-sm ml-2 hover:underline">Sửa</p>
      </button>
      <button class="flex items-center active:scale-95 transform transition-transform" @click="onDelete">
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
