<template>
  <div>
    <v-overlay :color="loaderColor" :value="loading">
      <v-progress-circular
        :size="$vuetify.breakpoint.xs ? 50 : 100"
        :width="5"
        color="mainColor"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
      default: () => {},
    },
    loaderColor: {
      type: String,
    },
  },
};
</script>
