<template>
  <div>
    <ListDataTable
      :fieldsAddRow="fieldsAddProduct"
      :requestAddRow="requestAddProduct"
      :btnFormAddRow="btnFormAddProduct"
      :popupMessageAddRow="popupMessageAddRow"
      :fieldsSearch="fieldsSearch"
      :requestSearch="requestSearch"
      :btnFormSearch="btnFormSearch"
      :listHeaders="listHeaders"
      :listDataApi="listDataApi"
      :pageHeaderText="pageHeaderText"
      :modalButtonText="modalButtonText"
      :navigateToViewPageRouteName="navigateToViewPageRouteName"
    />
  </div>
</template>

<script>
import ListDataTable from '@/components/ListDataTable'
import {categories} from '@/mixins/categories'

export default {
  mixins: [categories],
  components: {
    ListDataTable,
  },
  data: () => ({
    listDataApi: 'products?include=category',
    pageHeaderText: 'Products',
    modalButtonText: 'Add Product',
    navigateToViewPageRouteName: 'productView',
    popupMessageAddRow: 'Product Created Sussufully',
    requestAddProduct: {
      method: 'post',
      url: '/products',
    },
    btnFormAddProduct: {
      text: 'Add',
      icon: 'mdi-plus',
    },
    requestSearch: {
      method: 'get',
      url: '/products?include=category',
      type: 'search',
    },
  }),
  computed: {
    btnFormSearch() {
      return {
        icon: 'mdi-magnify',
        flat: true,
        text: 'Search',
        bindOptions: {
          text: true,
          outlined: true,
          class: this.isSmAndDown ? 'mb-4 mt-n8' : '',
        },
      }
    },
    fieldsSearch() {
      return [
        {
          component: 'v-text-field',
          label: 'Name',
          key: 'name',
          value: '',
          width: {
            md: 4,
            col: 12,
          },
          bindOptions: {
            dense: true,
          },
        },
        {
          component: 'v-select',
          label: 'Category',
          key: 'category_id',
          value: '',
          width: {
            md: 4,
            col: 12,
          },
          bindOptions: {
            items: this.categoriesItems,
            ['item-text']: 'name',
            ['item-value']: 'id',
            dense: true,
            clearable: true,
            menuProps: {offsetY: true},
            class: this.isSmAndDown ? 'mt-n8' : '',
          },
        },
      ]
    },
    fieldsAddProduct() {
      return [
        {
          component: 'v-text-field',
          label: 'Name',
          key: 'name',
          required: true,
          value: '',
          width: {
            md: 6,
            col: 12,
          },
        },
        {
          component: 'v-text-field',
          label: 'SKU',
          key: 'sku',
          required: true,
          value: '',
          width: {
            md: 6,
            col: 12,
          },
        },
        {
          component: 'v-select',
          label: 'Category',
          key: 'category_id',
          required: true,
          value: '',
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
          key: 'pricing_method',
          required: true,
          value: '',
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
          value: '',
          show: ({pricing_method}) => pricing_method === 1,
          width: {
            md: 6,
            col: 12,
          },
          bindOptions: {
            type: 'number',
          },
        },
        {
          component: 'v-select',
          label: 'Costing method',
          required: true,
          key: 'costing_method',
          value: '',
          width: {
            md: 6,
            col: 12,
          },
          bindOptions: {
            items: [
              {
                text: 'Fixed',
                value: 1,
              },
              {
                text: 'From Ingredients',
                value: 2,
              },
            ],
            ['item-text']: 'text',
            ['item-value']: 'value',
            menuProps: {offsetY: true},
          },
        },
        {
          component: 'v-select',
          label: 'Selling method',
          key: 'selling_method',
          value: '',
          required: true,
          width: {
            md: 6,
            col: 12,
          },
          bindOptions: {
            items: [
              {
                text: 'Unit',
                value: 1,
              },
              {
                text: 'Weight',
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
          label: 'Cost',
          key: 'cost',
          value: '',
          width: {
            md: 6,
            col: 12,
          },
          bindOptions: {
            type: 'number',
          },
        },
      ]
    },
    listHeaders: () => [
      {
        text: 'Name',
        value: 'name',
        sortable: false,
      },
      {text: 'SKU', value: 'sku', sortable: false},
      {text: 'Category', value: 'category.name', sortable: false},
      {
        text: 'Price',
        value: 'price',
        sortable: false,
      },
    ],
  },
}
</script>
