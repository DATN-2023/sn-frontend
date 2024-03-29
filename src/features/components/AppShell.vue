<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "AppShell",
  props: {
    fullSidebar: Boolean,
    navbarExpanded: Boolean,
    rightNavbarExpanded: Boolean,
    showNavBar: Boolean,
    overflow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      darkmod: 0
    }
  },
  methods: {
    async changeDarkMod() {
      this.darkmod = !this.darkmod
      window.$cookies.set('darkmod', +this.darkmod)
      this.$emit('onChangeTheme', this.darkmod)
    }
  },
  mounted() {
    this.darkmod = +window.$cookies.get('darkmod') || 0
  }
})

</script>

<template>
  <div :class="`${darkmod ? 'dark' : 'light'}`">
    <div class="w-screen h-screen bg-ll-base dark:bg-ld-base flex flex-col text-gray-500 ">
      <div v-if="!fullSidebar"
           class="w-full h-14 bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border border-b flex justify-between items-center px-5">
        <slot name="header"></slot>
        <button @click="changeDarkMod"
                class="w-10 h-10 border rounded-md flex justify-center items-center ml-2 border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95 transition-transform transform">
          <svg v-if="!darkmod" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
          </svg>

        </button>
      </div>

      <div class="w-full flex h-full relative overflow-hidden relative ">
        <div v-if="showNavBar"
             :class="`absolute left-0 top-0 z-10 w-full md:relative origin-left overflow-x-hidden ${navbarExpanded ? 'md:w-110' : 'w-0 md:w-20'} transition-all  border-r h-full bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border flex flex-col`">
          <slot name="navbar"></slot>
        </div>
        <div class="w-full h-full flex flex-col">

          <div v-if="fullSidebar"
               class="w-full h-14 bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border border-b flex justify-between items-center px-5">
            <slot name="header"></slot>
            <button @click="changeDarkMod"
                    class="w-10 h-10 border rounded-md flex justify-center items-center ml-2 border-ll-border dark:border-ld-border bg-ll-base dark:bg-ld-base dark:text-gray-200 active:scale-95 transition-transform transform">
              <svg v-if="!darkmod" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
              </svg>

            </button>
          </div>

          <div class="w-full h-full flex flex-col" :class="`${overflow ? 'overflow-auto' : ''}`">
            <slot name="body"></slot>
          </div>
        </div>

        <div v-if="$slots.rightNavbar"
             :class="`origin-left overflow-x-hidden ${rightNavbarExpanded ? 'w-130' : 'w-0'} transition-all border-l h-full bg-ll-neutral dark:bg-ld-neutral border-ll-border dark:border-ld-border flex flex-col`">
          <slot name="rightNavbar"></slot>
        </div>

      </div>
    </div>
  </div>
</template>
<style lang="">

</style>
