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
    scrollPos: 0,
    listDataApi: 'customers',
    pageHeaderText: 'Customers',
    modalButtonText: 'Add Customer',
    navigateToViewPageRouteName: 'customerView',
    popupMessageAddRow: 'Customer Created Sussufully',
    listHeaders: [
      {
        text: 'Name',
        value: 'name',
        sortable: false,
      },
      {text: 'Email', value: 'email', sortable: false},
      {text: 'Phone number', value: 'phone', sortable: false},
      {
        text: 'Last order date',
        value: 'last_order_at',
        sortable: false,
      },
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
        required: true,
      },
      {
        component: 'v-text-field',
        label: 'Dial Code',
        key: 'dial_code',
        value: '',
        type: 'number',
        required: true,
        width: {
          md: 6,
          col: 12,
        },
        bindOptions: {
          type: 'number',
        },
      },
      {
        component: 'v-text-field',
        label: 'Phone Number',
        required: true,
        key: 'phone',
        value: '',
        width: {
          md: 6,
          col: 12,
        },
      },
      {
        component: 'v-text-field',
        label: 'Email',
        key: 'email',
        value: '',
        width: {
          md: 6,
          col: 12,
        },
      },
    ],
    requestAddCustomer: {
      method: 'post',
      url: '/customers',
    },
    btnFormAddCustomer: {
      text: 'Add',
      icon: 'mdi-plus',
    },

    requestSearch: {
      method: 'get',
      url: '/customers',
      type: 'search',
    },
  }),

  computed: {
    fieldsSearch() {
      return [
        {
          component: 'v-text-field',
          label: 'Email',
          key: 'email',
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
          label: 'Phone Number',
          key: 'phone',
          value: '',
          width: {
            md: 4,
            col: 12,
          },
          bindOptions: {
            dense: true,
            class: this.isSmAndDown ? 'mt-n8' : '',
          },
        },
      ]
    },

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
  },
}
</script>
