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
    this.isSmAndDown = this.$vuetify.breakpoint.smAndDown

    window.addEventListener(
      'resize',
      () => (this.isSmAndDown = this.$vuetify.breakpoint.smAndDown)
    )
  },
})
