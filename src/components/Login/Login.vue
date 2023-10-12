<template>
  <div class="bg-fixed h-full flex flex-row justify-center items-center"
       style="background-image: url(/src/assets/images/login/pexels-photo.jpg)">
    <div class="bg-white rounded-md p-6">
      <h1 class="p-2 rounded-md text-2xl text-center">Sign In</h1>
      <div for="phone" class="my-2 font-bold">Số điện thoại</div>
      <div class="my-2">
        <input name="phone" type="text" class="border-black border rounded" v-model="phone">
      </div>
      <button class="bg-sky-500 mt-2 p-2 rounded w-full" @click="handleSignInGoogle">Đăng nhập</button>
    </div>
  </div>
</template>

<script>
import {getAuth, signInWithPopup, getRedirectResult, GoogleAuthProvider} from "firebase/auth";
import platform from 'platform'
import {getFingerPrintBrowser} from "@/config";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export default {
  name: "Login",
  data() {
    return {
      loading: null,
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
            console.log(result)
            // const user = result.user;
            // console.log(result.user.displayName)
            const data = await this.getDataLogin(result.user)
            try {
              this.loading = true
              console.log('data ', data)
              await this.$store.dispatch.auth('login', data)
              if(this.$route.query.redirect === '/dang-ky') {
                this.$router.push('/')
              } else {
                this.$router.push(this.$route.query.redirect || '/')
              }
              this.loading = false
            } catch (err) {
              this.loading = false
            }
            console.log('User', result.user)
            this.isSignedIn = true;
          }).catch((error) => {
            console.log(error);
          });
    }
  },

}
</script>

<style scoped>

</style>
