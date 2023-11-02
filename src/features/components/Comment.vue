<script>
import {defineComponent} from 'vue'
import config from '@/config/config'

const {urlConfig: {imageUrl}} = config

export default defineComponent({
  name: "Comment",
  props: {
    comment: {
      type: Array
    }
  },
  data() {
    return {
      liked: true
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
        <div class="flex flex-col bg-ll-border rounded-lg dark:bg-ld-border p-2">
          <p class="text-sm font-bold text-gray-800 dark:text-gray-100">{{ comment?.user?.name || 'Anonymous' }}</p>
          <p class="text-sm break-words" v-html="generateDescription()"></p>
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
      <!--      <div-->
      <!--          class="active:scale-95 transform transition-transform m-2 rounded-full hover:bg-gray-300 hover:cursor-pointer h-6"-->
      <!--          @click="toggle"-->
      <!--          aria-haspopup="true" aria-controls="overlay_menu">-->
      <!--        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">-->
      <!--          <path fill-rule="evenodd"-->
      <!--                d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"-->
      <!--                clip-rule="evenodd"/>-->
      <!--        </svg>-->

      <!--      </div>-->
      <!--      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true"/>-->
      <!--      <Dialog :visible="visible" :modal="true" header="Header" @update:visible="setUp" :style="{ width: '50vw' }">-->
      <!--        <template #header>-->
      <!--          <div class="inline-flex align-items-center justify-content-center gap-2">-->
      <!--            <span class="font-bold white-space-nowrap">Bạn chắc chắn muốn xoá bài viết này?</span>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--        <div class="card flex flex-wrap gap-2 justify-content-center">-->
      <!--          <Button @click="onDeletePost"-->
      <!--                  class="bg-ll-primary dark:bg-ld-primary text-white p-2 w-30 mr-4 hover:bg-sky-600"-->
      <!--                  style="border: none;" label="Chấp nhận"></Button>-->
      <!--          <Button @click="onCancelDeletePost" class="hover:bg-gray-400 bg-gray-300 p-2 w-30 border-none" label="Huỷ bỏ"-->
      <!--                  style="border: none;" severity="danger"></Button>-->
      <!--        </div>-->
      <!--      </Dialog>-->
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
        <p :class="[liked ? 'text-ll-primary' : '', 'bold text-sm ml-2 hover:underline']">Thích</p>
      </button>
<!--      <button class="flex items-center active:scale-95 transform transition-transform ">-->
<!--        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
<!--             stroke="currentColor" class="w-6 h-6">-->
<!--          <path stroke-linecap="round" stroke-linejoin="round"-->
<!--                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"/>-->
<!--        </svg>-->
<!--        <p class="ml-2">{{ comment.commentTotal }}</p>-->
<!--      </button>-->
    </div>
  </div>
</template>

<style scoped>

</style>
