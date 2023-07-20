<template>
  <div>
    <ViewSectionDetails
      :dataKeys="dataKeys"
      :fieldsEditData="fieldsEditUser"
      :api="api"
      :popupData="popupData"
      :sectionName="sectionName"
      @sectionData="fillData"
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
    customer: {},
    api: "customers",
    sectionName: "Customer",
    dataKeys: [
      "name",
      "email",
      "phone",
      "last_order_at",
      "order_count",
      "birth_date",
      "gender",
    ],
  }),
  computed: {
    // this data  uses with add New customer
    fieldsEditUser() {
      return [
        {
          component: "v-text-field",
          label: "Name",
          key: "name",
          value: this.customer.name,
          width: {
            md: 6,
            col: 12,
          },
        },
        {
          component: "v-text-field",
          label: "Email",
          key: "email",
          value: this.customer.email,
          width: {
            md: 6,
            col: 12,
          },
        },
        {
          component: "v-text-field",
          label: "Phone Number",
          key: "phone",
          value: this.customer.phone,
          width: {
            md: 6,
            col: 12,
          },
        },
        {
          component: "DatePicker",
          label: "Birth Date.",
          key: "birth_date",
          value: this.customer.birth_date,
          type: "number",
          width: {
            md: 6,
            col: 12,
          },
        },
        {
          component: "v-select",
          label: "Gender",
          key: "gender",
          value: this.customer.gender,
          bindOptions: {
            items: [
              {
                text: "male",
                value: 1,
              },
              {
                text: "female",
                value: 2,
              },
            ],
            ["item-text"]: "text",
            ["item-value"]: "value",
          },
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
      this.customer = data;
    },
  },
};
</script>
