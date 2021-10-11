<template>
  <m-card class="login">
    <template #header>
      Log in
    </template>
    <template #default>
      body
    </template>
    <template #footer>
      <div class="login__footer">
        <m-btn @click="click" primary :value="value">
          Sing In
        </m-btn>
        <m-btn @click="click" green>
          Log In
        </m-btn>
      </div>
    </template>
  </m-card>
</template>

<script>
export default {
  name: 'Login',
  components: {
    'm-card': () => import('../components/UI/m-card'),
    'm-btn': () => import('../components/UI/m-btn')
  },
  layout: 'authLayout',
  data () {
    return {
      value: 1
    }
  },
  methods: {
    click () {
      console.log('click')
    }
  },
  mounted () {
    setInterval(() => {
      this.value++
    }, 1000)
  }
}
</script>

<style lang='scss'>
  .login {
    @apply w-96 m-auto;
    .login__footer{
      @apply flex justify-between;
    }
  }
</style>
