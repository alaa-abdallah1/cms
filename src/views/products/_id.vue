<template>
  <div>
    <ViewSectionDetails
      :dataKeys="dataKeys"
      :fieldsEditData="fieldsEditUser"
      :api="api"
      :sectionName="sectionName"
      @sectionData="fillData"
    >
      <template #addNewRow>
        <v-row>
          <v-col
            sm="3"
            class="text-capitalize pa-4 custom-border font-weight-bold"
          >
            Category
          </v-col>
          <v-col sm="9" class="pa-4 custom-border text-capitalize">
            <router-link
              :to="{
                name: 'categoryView',
                params: {id: product.category.id},
              }"
            >
              {{ product.category.name }}</router-link
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col
            sm="3"
            class="text-capitalize pa-4 custom-border font-weight-bold"
          >
            Active Status
          </v-col>
          <v-col sm="9" class="pa-4 custom-border text-capitalize">
            <span v-if="isActive" class="success--text">
              <span class="mr-2">&#10006;</span>
              Active
            </span>
            <span v-else class="error--text">
              <span class="mr-2">&#10006;</span>

              Inactive
            </span>
          </v-col>
        </v-row>
      </template>
      <template #addActionButton>
        <v-btn
          :color="isActive ? 'success' : 'error'"
          @click="activeOrDeactive"
          class="mr-2"
          :loading="bntActiveLoading"
          fab
          small
        >
          <v-icon v-if="isActive" small>mdi-thumb-up-outline</v-icon>
          <v-icon v-else small>mdi-thumb-down-outline</v-icon>
        </v-btn>
      </template>
    </ViewSectionDetails>
  </div>
</template>

<script>
/* import Components */
import ViewSectionDetails from '@/components/ViewSectionDetails'
import {categories} from '@/mixins/categories'

export default {
  mixins: [categories],
  components: {
    ViewSectionDetails,
  },
  data: () => ({
    product: {},
    api: 'products',
    bntActiveLoading: false,
    isActive: '',
    sectionName: 'Product',
    dataKeys: ['name', 'sku', 'pricing_method', 'price'],
  }),
  computed: {
    // this data  uses with add New product
    fieldsEditUser() {
      return [
        {
          component: 'v-text-field',
          label: 'Name',
          key: 'name',
          required: true,
          value: this.product.name,
          width: {
            md: 6,
            col: 12,
          },
        },
        {
          component: 'v-text-field',
          label: 'Sku',
          required: true,
          key: 'sku',
          value: this.product.sku,
          width: {
            md: 6,
            col: 12,
          },
        },
        {
          component: 'v-select',
          label: 'Category',
          required: true,
          key: 'category_id',
          value: this.product.category ? this.product.category.id : '',
          width: {
            md: 6,
            col: 12,
          },
          bindOptions: {
            items: this.categoriesItems,
            ['item-text']: 'name',
            ['item-value']: 'id',
            menuProps: {offsetY: true},
          },
        },
        {
          component: 'v-select',
          label: 'Pricing',
          required: true,
          key: 'pricing_method',
          value: this.product.pricing_method,
          width: {
            md: 6,
            col: 12,
          },
          bindOptions: {
            items: [
              {
                text: 'Fixed Price',
                value: 1,
              },
              {
                text: 'Open Price',
                value: 2,
              },
            ],
            ['item-text']: 'text',
            ['item-value']: 'value',
            menuProps: {offsetY: true},
          },
        },
        {
          component: 'v-text-field',
          label: 'Price',
          required: true,
          key: 'price',
          value: this.product.price,
          width: {
            md: 6,
            col: 12,
          },
        },
      ]
    },
  },
  methods: {
    fillData(data) {
      this.product = data
      this.isActive = data.is_active
    },
    activeOrDeactive() {
      this.bntActiveLoading = true
      this.product.is_active = !this.product.is_active
      this.axios({
        method: 'put',
        url: `/products/${this.product.id}`,
        data: {is_active: this.product.is_active},
      }).then(() => {
        this.isActive = this.product.is_active
        this.bntActiveLoading = false
      })
    },
  },
  created() {
    // this.fetchAllCategories().then((categories) => {
    //   this.categoriesItems = categories;
    // });
  },
}
</script>
