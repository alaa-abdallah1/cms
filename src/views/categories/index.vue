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
    >
      <template #addNewView v-if="sortList">
        <SortingPage />
      </template>
      <template #addNewButton>
        <v-btn
          color="success"
          class="float-right mr-4"
          @click="sortList = !sortList"
          title="sorting"
          small
        >
          <v-icon class="mr-2" small>mdi-format-list-bulleted-square</v-icon>
          <span v-if="sortList" class="d-sm-flex d-none">List</span>
          <span v-else class="d-sm-flex d-none">Sorting</span>
        </v-btn>
      </template>
    </ListDataTable>
  </div>
</template>

<script>
import ListDataTable from '@/components/ListDataTable'
import SortingPage from '@/views/categories/parts/sortingList'

export default {
  components: {
    ListDataTable,
    SortingPage,
  },
  data: () => ({
    sortList: false,
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
      width: 2,
      bindOptions: {
        text: true,
        outlined: true,
      },
    },
  }),
}
</script>
