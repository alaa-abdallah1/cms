<template>
  <div>
    <ListDataTable
      :fieldsAddRow="fieldsAddCustomer"
      :requestAddRow="requestAddCustomer"
      :btnFormAddRow="btnFormAddCustomer"
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

export default {
  components: {
    ListDataTable,
  },
  data: () => ({
    listDataApi: 'categories',
    pageHeaderText: 'Categories',
    modalButtonText: 'Add Category',
    navigateToViewPageRouteName: 'categoryView',
    popupMessageAddRow: 'Category Created Sussufully',
    listHeaders: [
      {
        text: 'Name',
        value: 'name',
        sortable: false,
      },
      {text: 'Reference', value: 'reference', sortable: false},
      {text: 'Created date.', value: 'created_at', sortable: false},
    ],
    fieldsAddCustomer: [
      {
        component: 'v-text-field',
        label: 'Name',
        key: 'name',
        value: '',
        required: true,
        width: {
          md: 6,
          col: 12,
        },
      },
      {
        component: 'v-text-field',
        label: 'Reference',
        key: 'reference',
        value: '',
        width: {
          md: 6,
          col: 12,
        },
      },
    ],
    requestAddCustomer: {
      method: 'post',
      url: '/categories',
    },
    btnFormAddCustomer: {
      text: 'Add',
      icon: 'mdi-plus',
    },
    fieldsSearch: [
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
        component: 'v-text-field',
        label: 'Reference',
        key: 'reference',
        value: '',
        width: {
          md: 4,
          col: 12,
        },
        bindOptions: {
          dense: true,
        },
      },
    ],
    requestSearch: {
      method: 'get',
      url: '/categories',
      type: 'search',
    },
    btnFormSearch: {
      icon: 'mdi-magnify',
      text: 'Search',
      flat: true,
      bindOptions: {
        text: true,
        outlined: true,
      },
    },
  }),
}
</script>
