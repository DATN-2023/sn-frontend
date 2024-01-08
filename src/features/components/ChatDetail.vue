<script>
import {defineComponent} from 'vue'
import {socket} from "@/plugins/socket";
import {genImageUrl} from "@/config";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

export default defineComponent({
  name: "ChatDetail",
  components: {InfiniteLoading},
  props: {
    channel: {
      type: Object,
      default: {}
    },
    messages: {
      type: Array,
      default: []
    },
    uid: {
      type: String
    },
    isLoadmore: {
      type: Number,
    }
  },
  data() {
    return {
      content: '',
      page: 0,
      isLoadmore: 1
    }
  },
  methods: {
    genImageUrl,
    onAddMessage(event) {
      if (event.shiftKey===true && event.key === "Enter") {
        return;
      }
      if (!this.content) return
      const payload = {
        content: this.content,
        channel: this.channel._id
      }
      socket.emit('message:create', payload)
      this.content = ''
    },
    async getMessages(q = {}) {
      q.channel = this.channel._id.toString()
      q.perPage = 10
      const data = await this.$store.dispatch('chat/getMessages', q)
      const messages = (data?.data || [])
      this.messages.push(...messages)
      // const scroll = document.getElementById('chatFrame')
      // scroll.scrollTo(0, scroll.scrollHeight)
      return data
    },
    async loadMessages($state) {
      console.log('loading...', this.page)
      try {
        if (this.isLoadmore) {
          const data = await this.getMessages({page: this.page + 1})
          if (data && data.page * data.perPage >= data.total) this.isLoadmore = 0
          this.page = data.page
          $state.loaded()
        }
        console.log('check')
      } catch (e) {
        $state.error()
      }
    }
  }
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="w-full border-b-1 border-ll-border dark:border-ld-border">
      <div class="flex p-2 justify-between w-full">
        <div class="flex space-x-2">
          <img class="h-16 w-16 rounded-full"
               :src="genImageUrl(channel?.user?.avatar || 'https://images.egosnet.click/social-network/user-128.png', '200x')"
               alt="">
          <div class="self-center bold">{{ channel?.user?.name }}</div>
        </div>
        <div>

        </div>
      </div>
    </div>
    <div id="chatFrame" class="flex flex-col py-2 overflow-y-auto space-y-2 px-2 flex flex-col-reverse" style="height: calc(100vh - 221px);">
      <div v-for="message in messages" class="2xl:max-w-800px max-w-150px xl:max-w-600px lg:max-w-400px"
           :class="`${message.messageFrom === uid ? 'break-words self-end bg-ll-primary dark:bg-ld-primary p-2 rounded-2xl text-white' : 'break-words bg-ll-border dark:bg-ld-border p-2 rounded-2xl self-start'}`">
        {{ message?.content || '' }}
      </div>
      <InfiniteLoading @infinite="loadMessages">
        <template #spinner>
          <span></span>
        </template>
      </InfiniteLoading>
    </div>
    <div id="chatInput" class="flex px-2">
      <button @click="onUploadFiles"
              class="self-end w-10 h-10 mr-2 rounded-full flex justify-center items-center hover:bg-ll-base hover:dark:bg-ld-base dark:text-gray-500 active:scale-95 transition-transform transform">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor"
             class="w-6 h-6 text-ll-primary dark:text-ld-primary fill-ll-primary dark:fill-ld-primary">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
        </svg>
      </button>
      <textarea @keyup.enter="onAddMessage" v-model="content"
                class="w-full h-80px rounded-md bg-ll-base dark:bg-ld-base p-4 outline-none text-lg"
                placeholder="Viết gì đó..." resize="none"></textarea>
      <div class="self-end">
        <div>
          <input type="file" ref="upload" hidden="" multiple @change="changeFileUpload">
        </div>
        <button @click="onAddMessage"
                class=" text-sm px-2 py-2 hover:bg-ll-base hover:dark:bg-ld-base text-white rounded-full flex items-center active:scale-95 transform transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6 fill-ll-primary dark:fill-ld-primary text-ll-primary dark:text-ld-primary">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
