import Vue from 'vue'
Vue.mixin({
  data: () => ({
    loader: false,
    popupData: {
      show: false,
      text: '',
      color: '',
    },

    isSmAndDown: false,
  }),

  mounted() {
    this.isSmAndDown = this.$vuetify
      ? this.$vuetify.breakpoint.smAndDown
      : false

    window.addEventListener(
      'resize',
      () => (this.isSmAndDown = this.$vuetify.breakpoint.smAndDown)
    )
  },
})
