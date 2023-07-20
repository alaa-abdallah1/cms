<template>
  <div class="text-center">
    <v-snackbar
      transition="fab-transition"
      :color="popup.color ? popup.color : 'success'"
      v-model="popup.show"
      top
    >
      <span class="text-capitalize">{{ popup.text }}</span>

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="'#fff'"
          small
          text
          v-bind="attrs"
          @click="popup.show = false"
        >
          x
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: {
    popup: {
      show: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
      },
      color: {
        type: String,
      },
    },
  },
};
</script>

<style scoped>
.v-snack {
  top: 50px !important;
}
</style>
