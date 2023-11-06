<script>
import {defineComponent} from 'vue'
import config from '@/config/config'

const {urlConfig: {imageUrl}, reactionTargetType, reactionType} = config

export default defineComponent({
  name: "Comment",
  props: {
    comment: {
      type: Array
    }
  },
  data() {
    return {
      liked: false
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
  }
})
</script>

<template>
  <div class="w-full px-5 py-2 bg-ll-neutral dark:bg-ld-neutral rounded-md flex flex-col">
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
          <div v-if="comment.reactionTotal" class="absolute bg-ll-border rounded-lg dark:bg-ld-border -bottom-2 right-0">
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
    </div>
  </div>
</template>

<style scoped>

</style>
