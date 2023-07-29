<template>
  <v-container>
    <!-- popup shows after customer created -->
    <Popup :popup="popupData" />

    <!-- modal to create new row -->
    <v-dialog v-model="dialog" width="800">
      <v-card class="pa-8">
        <Form
          :fields="fieldsAddRow"
          :request="requestAddRow"
          :btnForm="btnFormAddRow"
          @success="addRow"
        />
      </v-card>
    </v-dialog>

    <v-card class="py-6 elevation-10 my-8">
      <div v-if="loader">
        <div class="d-sm-block d-none">
          <div class="mb-8 px-4 d-flex align-center justify-between">
            <v-skeleton-loader
              class="flex-grow-1"
              type="heading"
            ></v-skeleton-loader>
            <v-skeleton-loader
              type="heading"
              align="right"
              width="300"
            ></v-skeleton-loader>
          </div>

          <v-container>
            <v-row class="px-1 mb-1">
              <v-col cols="4">
                <v-skeleton-loader type="heading"></v-skeleton-loader>
              </v-col>
              <v-col cols="4">
                <v-skeleton-loader type="heading"></v-skeleton-loader>
              </v-col>
              <v-col cols="4">
                <div>
                  <v-skeleton-loader
                    align="right"
                    class="justify-end"
                    type="heading"
                    max-width="400"
                  ></v-skeleton-loader>
                </div>
              </v-col>
            </v-row>
          </v-container>

          <v-skeleton-loader type="table-thead"></v-skeleton-loader>
          <v-skeleton-loader type="table-tbody"></v-skeleton-loader>
          <v-skeleton-loader type="table-tbody"></v-skeleton-loader>
        </div>
        <div class="d-sm-none d-block px-4">
          <div class="mb-8 d-flex align-center justify-between">
            <v-skeleton-loader
              class="flex-grow-1"
              width="300"
              type="heading"
            ></v-skeleton-loader>
            <v-skeleton-loader
              type="heading"
              align="right"
              width="300"
            ></v-skeleton-loader>
          </div>
          <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
          <v-skeleton-loader
            v-for="(n, index) in 8"
            :key="index"
            type="list-item-three-line"
          ></v-skeleton-loader>
        </div>
      </div>

      <div v-else>
        <slot name="addNewView">
          <!-- top section -->
          <div class="mb-8 px-3 d-flex align-center justify-between">
            <h1 class="flex-grow-1 text-bold">{{ pageHeaderText }}</h1>
            <v-btn color="primary" @click="dialog = true">
              <v-icon small>mdi-plus</v-icon>
              <span class="d-sm-flex d-none">{{ modalButtonText }}</span>
            </v-btn>
          </div>

          <!-- Data Table -->
          <Form
            :fields="fieldsSearch"
            :request="requestSearch"
            :btnForm="btnFormSearch"
            @success="search"
          />

          <v-data-table
            :headers="headers"
            :items="computedData"
            :items-per-page="pagination.per_page"
            hide-default-footer
            class="data-table"
            :page.sync="pagination.current_page"
            @page-count="pagination.total = $event"
            @click:row="navigateToCustomerPage"
          >
          </v-data-table>

          <v-card v-if="computedData.length" class="pa-4 mt-5" flat>
            <v-pagination
              v-model="pagination.current_page"
              :length="total"
              @input="paginate"
            ></v-pagination>
          </v-card>
        </slot>
      </div>
    </v-card>
  </v-container>
</template>

<script>
/* import Components */
import Form from '@/components/Form'
// import Loader from "@/components/Loader";
// import Popup from "@/components/Popup";

export default {
  props: {
    fieldsAddRow: {
      type: Array,
      required: true,
    },
    requestAddRow: {
      type: Object,
      required: true,
    },
    btnFormAddRow: {
      type: Object,
    },
    popupMessageAddRow: {
      type: String,
    },
    fieldsSearch: {
      type: Array,
      required: true,
    },
    requestSearch: {
      type: Object,
      required: true,
    },
    btnFormSearch: {
      type: Object,
    },
    listHeaders: {
      type: Array,
      required: true,
    },
    listDataApi: {
      type: String,
      required: true,
    },
    apiParams: {
      type: Object,
    },
    pageHeaderText: {
      type: String,
    },
    modalButtonText: {
      type: String,
    },
    navigateToViewPageRouteName: {
      type: String,
      required: true,
    },
  },
  components: {
    Form,
  },
  data() {
    return {
      total: 1,
      dialog: false,
      data: [],
      // data table headers
      headers: this.listHeaders,
      pagination: {
        current_page: 1,
      },
    }
  },

  computed: {
    computedData() {
      return this.data.map(obj =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [key, value ? value : '—'])
        )
      )
    },
  },

  methods: {
    /*
     * this function used to get Row
     * it takes first param to use  this.$forceUpdate to up date pagintion or not
     */
    getData() {
      // turn on loader
      this.loader = true
      // send request
      this.axios
        .get(`/${this.listDataApi}`, {
          params: {
            page: this.pagination.current_page,
            sort: '-created_at',
            ...this.apiParams,
          },
        })
        .then(res => {
          // update date table

          this.data = res.data.data
          this.pagination = res.data.meta
          this.total = Math.ceil(
            this.pagination.total / this.pagination.per_page
          )
          // stop loader
          this.loader = false
        })
    },
    search(res) {
      // updata data table
      // updata pagination data
      // this.updataPagination(res.meta);
      this.data = res.data
      this.pagination = res.meta
      this.total = Math.ceil(this.pagination.total / this.pagination.per_page)
    },
    paginate() {
      // update data table depend on page number
      this.getData()
    },
    addRow() {
      // make modal inputs equal null
      this.fieldsAddRow.map(field => (field.value = ''))
      // close the modal
      this.dialog = false
      // show popup with success message
      this.popupData.show = true
      this.popupData.text = this.popupMessageAddRow
      this.getData()
    },
    navigateToCustomerPage(item) {
      this.$router.push({
        name: this.navigateToViewPageRouteName,
        params: {id: item.id},
      })
    },
  },
  created() {
    // fetch data
    this.getData()
  },
}
</script>

<style>
.data-table {
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
}
.data-table tr:hover {
  cursor: pointer;
}
@media screen and (max-width: 776px) {
  .data-table {
    border-top: none;
  }
}
</style>
