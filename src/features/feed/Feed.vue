<script>

import Post from '../components/Post.vue'
import config from "@/config/config"
import {TOKEN_KEY} from "@/config/constants";

const {feedType} = config

export default {
  props: {
    oneColumn: Boolean,
    showPostComposer: {
      type: Boolean,
      required: true
    },
    feedPosts: Array,
    visible: Boolean
  },
  data() {
    return {
      leftPosts: [],
      rightPosts: [],
      content: '',
      images: [],
      type: feedType.POST,
      files: [],
      isUploaded: false
    }
  },
  methods: {
    onDeletePost(index) {
      this.feedPosts.splice(index, 1)
    }
  },
  components: {
    Post
  }
}

</script>

<template>
  <div
      :class="`w-full transition-all`">
    <div class="flex flex-col">
      <Post v-for="(post, index) in feedPosts" :post="post" :key="index" @onDeletePost="() => this.onDeletePost(index)"
            @onEditPost="() => this.$emit('onEditPost', index)"></Post>
    </div>
    <!--    <div class="flex flex-col p-2 ">-->
    <!--      <Post v-for="(post, index) in leftPosts" :post="post" :key="index"></Post>-->
    <!--    </div>-->

  </div>
</template>
