<template>
  <div>
    <ViewSectionDetails
      :api="api"
      :dataKeys="dataKeys"
      @sectionData="fillData"
      :sectionName="sectionName"
      :fieldsEditData="fieldsEditUser"
    />
  </div>
</template>

<script>
/* import Components */
import ViewSectionDetails from "@/components/ViewSectionDetails";

export default {
  components: {
    ViewSectionDetails,
  },
  data: () => ({
    category: {},
    api: "categories",
    sectionName: "Category",
    dataKeys: ["name", "reference"],
  }),
  computed: {
    // this data  uses with add New category
    fieldsEditUser() {
      return [
        {
          component: "v-text-field",
          label: "Name",
          key: "name",
          value: this.category.name,
          width: {
            md: 6,
            col: 12,
          },
        },
        {
          component: "v-text-field",
          label: "Reference",
          key: "reference",
          value: this.category.reference,
          width: {
            md: 6,
            col: 12,
          },
        },
      ];
    },
  },
  methods: {
    fillData(data) {
      this.category = data;
    },
  },
};
</script>
