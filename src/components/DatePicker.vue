<template>
  <v-menu
    v-model="menu"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @input="menu = false"
      :max="new Date().toISOString().substr(0, 10)"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: ["value", "label"],
  data: () => ({
    menu: false,
  }),
  computed: {
    date: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
