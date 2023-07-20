<template>
  <v-container>
    <Loader :loading="loader" />
    <Popup :popup="popupData" />
    <draggable v-model="categoriesItems">
      <transition-group>
        <v-col
          class="col-sm-3 col-6 float-left"
          v-for="(category, index) in categoriesItems"
          :key="category.id"
        >
          <v-card class="pa-2 card caption">
            <v-badge :content="index + 1" class="mr-6"></v-badge>
            {{ category.name }}
          </v-card>
        </v-col>
      </transition-group>
    </draggable>
    <v-btn color="primary" class="d-block float-right mt-8" @click="save">
      Save
    </v-btn>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import { categories } from "@/mixins/categories";

export default {
  mixins: [categories],
  components: {
    draggable,
  },
  methods: {
    save() {
      this.loader = true;
      this.popupData.show = false;
      const categories = this.categoriesItems.map(({ id }) => ({
        category_id: id,
        children: [],
      }));

      this.axios
        .put("/menu_display", {
          categories,
        })
        .then(() => {
          this.loader = false;
          this.popupData = {
            show: true,
            text: "List Sorted Successfuly",
            color: "success",
          };
        })
        .catch(({ response }) => {
          this.loader = false;
          this.popupData = {
            show: true,
            text: response.data.message,
            color: "error",
          };
        });
    },
  },
};
</script>
<style>
.card:hover {
  cursor: move;
}
</style>
