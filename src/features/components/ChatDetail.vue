<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ChatDetail"
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="w-full border-b-1 border-ll-border dark:border-ld-border">
      <div class="flex p-2 justify-between w-full">
        <div class="flex space-x-2">
          <img class="h-16 w-16 rounded-full"
               :src="user?.user?.avatar || 'https://images-cdn.carpla.dev/256x/xeco.webp'"
               alt="">
          <div class="self-center bold">Anonymous</div>
        </div>
        <div>

        </div>
      </div>
    </div>
    <div class="flex flex-col py-2 overflow-y-auto space-y-2 px-2" style="height: calc(100vh - 221px);">
      <div class="self-end bg-ll-primary dark:bg-ld-primary p-2 rounded-2xl max-w-[70%] text-white">industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
        it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
        including versions of Lorem Ipsum</div>
      <div class="self-end bg-ll-primary dark:bg-ld-primary p-2 rounded-2xl max-w-[70%] text-white">industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
        it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
        including versions of Lorem Ipsum</div>
      <div class="bg-ll-border dark:bg-ld-border p-2 rounded-2xl self-start max-w-[70%]">industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
        it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
        including versions of Lorem Ipsum
      </div>

    </div>
    <div class="flex px-2">
      <button @click="onUploadFiles"
              class="self-end w-10 h-10 mr-2 rounded-full flex justify-center items-center hover:bg-ll-base hover:dark:bg-ld-base dark:text-gray-500 active:scale-95 transition-transform transform">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor"
             class="w-6 h-6 text-ll-primary dark:text-ld-primary fill-ll-primary dark:fill-ld-primary">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
        </svg>
      </button>
      <textarea v-model="content"
                class="w-full h-80px rounded-md bg-ll-base dark:bg-ld-base p-4 outline-none text-lg"
                placeholder="What's happening?" resize="none"></textarea>
      <div class="self-end">
        <div>
          <input type="file" ref="upload" hidden="" multiple @change="changeFileUpload">
        </div>
        <button
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