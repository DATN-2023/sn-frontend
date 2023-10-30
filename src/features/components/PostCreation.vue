<script>
export default {
  name: "PostCreation",
  data() {
    return {
      content: '',
      isUploaded: false,
      files: [],
      preview: [],
      images: []
    }
  },
  methods: {
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
      }
    },
    async uploadFile(file) {
      const data = await this.$store.dispatch('upload/getPresignedUrl', {name: file.name})
      await this.$store.dispatch('upload/uploadFile', {url: data.url, file, type: file.type})
      return {name: data.name}
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async createFeed() {
      this.isUploaded = true
      if (this.files.length > 0) {
        for (const file of this.files) {
          const {name} = await this.uploadFile(file)
          this.images.push(`/${name}`)
        }
      }
      const body = {
        content: this.content,
        images: this.images,
        type: this.type
      }
      const post = await this.$store.dispatch('feed/createFeed', body)
      this.files = []
      this.preview = []
      this.images = []
      this.content = ''
      this.isUploaded = false
      this.$emit("turnOffVisible")
      this.$emit("onCreatePost", post)
    },
    onUploadFiles() {
      this.$refs.upload.click()
    },
    onDeleteImage(index) {
      this.preview.splice(index, 1)
      this.images.splice(index, 1)
      this.files.splice(index, 1)
    }
  }
}
</script>

<template>
  <div
      :class="` transition-all col-span-1 p-5 overflow-hidden mx-2 bg-ll-neutral dark:bg-ld-neutral rounded-md  flex flex-col relative`">
            <textarea v-model="content"
                      class="w-full h-150px rounded-md bg-ll-base dark:bg-ld-base p-4 outline-none text-lg"
                      placeholder="What's happening?" resize="none"></textarea>
    <div class="flex-wrap flex justify-center items-center">
      <div class="w-300px flex-auto p-2" v-for="(file, index) in preview">
        <div class="relative inline-block pt-2">
          <img :src="file.src" :alt="file.name">
<!--          <img src="https://images.pexels.com/photos/13920607/pexels-photo-13920607.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="test" class="">-->
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
    <div class="w-full flex items-center justify-between pt-3 ">
      <div class="flex">
        <div>
          <input type="file" ref="upload" hidden="" multiple @change="changeFileUpload">
        </div>
        <button @click="onUploadFiles"
                class="w-10 h-10 mr-2 border rounded-md flex justify-center items-center  border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-500 active:scale-95 transition-transform transform">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
          </svg>
        </button>
        <!--        <button @click="$emit('onMenuClick')"-->
        <!--                class="w-10 h-10 mr-2 border rounded-md flex justify-center items-center  border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-500 active:scale-95 transition-transform transform">-->
        <!--          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
        <!--               stroke="currentColor" class="w-6 h-6">-->
        <!--            <path stroke-linecap="round" stroke-linejoin="round"-->
        <!--                  d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>-->
        <!--          </svg>-->
        <!--        </button>-->
      </div>
      <div class="flex">
        <button @click="createFeed"
                class=" text-sm px-3 py-2 bg-ll-primary text-white dark:bg-ld-primary rounded-md flex items-center active:scale-95 transform transition-transform">
          <font-awesome-icon class="mr-2 text-base" v-if="isUploaded" :icon="['fas', 'spinner']" spin/>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
          </svg>
          Share
        </button>
      </div>


    </div>
    <button @click="$.emit('onCloseComposePost')"
            class="w-8 h-8 absolute -top-0 -right-1 bg-ll-neutral dark:bg-ld-neutral text-sm  border-ll-border dark:border-ld-border border   rounded-full flex items-center mr-2 active:scale-95 transform transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor" class="w-full h-full">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>

    </button>
  </div>
</template>

<style scoped>

</style>
