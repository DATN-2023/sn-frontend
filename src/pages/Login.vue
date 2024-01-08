<template>
  <div class="bg-fixed h-full flex flex-row justify-center items-center"
       style="background-image: url(https://minio.egosnet.click/social-network/EGOSNET.svg)">
    <div class="bg-white rounded-md p-6 w-300px">
      <h1 class="p-2 rounded-md text-2xl text-center">Đăng nhập</h1>
<!--      <div class="my-2">-->
<!--        <input name="phone" type="text" class="border-black border rounded" v-model="phone">-->
<!--      </div>-->
      <button class="bg-sky-500 text-white mt-2 p-2 rounded w-full" @click="handleSignInGoogle">Đăng nhập qua google</button>
    </div>
  </div>
</template>

<script>
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import platform from 'platform'
import {getFingerPrintBrowser} from "@/config";
import notificationApi from "@/api/notification";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export default {
  name: "Login",
  data() {
    return {
      loading: null,
      isSignedIn: null,
      phone: ''
    }
  },
  methods: {
    async getDataLogin(user) {
      const { accessToken, email, displayName, photoURL, phoneNumber } = user

      const deviceId = await getFingerPrintBrowser()

      const data = {
        deviceType: 3,
        token: accessToken,
        deviceId,
        versionCode: '1',
        name: displayName,
        avatar: photoURL,
        deviceName: platform.description,
        fcmToken: '',
        signature: '1',
        phone: phoneNumber
      }

      if (!phoneNumber) {
        delete data.phone
      }

      return data
    },
    handleSignInGoogle() {
      signInWithPopup(auth, googleProvider)
          .then( async (result) => {
            const data = await this.getDataLogin(result.user)
            try {
              this.loading = true
              await this.$store.dispatch('auth/login', data)
              if(this.$route.query.redirect === '/dang-ky') {
                this.$router.push('/')
              } else {
                this.$router.push(this.$route.query.redirect || '/')
              }
              this.loading = false
            } catch (err) {
              this.loading = false
            }
            this.isSignedIn = true;
            const fcmToken = window.$cookies.get('fcmToken')
            notificationApi.addFcmToken({fcmToken})
          }).catch((error) => {
        console.error(error);
      });
    }
  },

}
</script>

<style scoped>

</style>
