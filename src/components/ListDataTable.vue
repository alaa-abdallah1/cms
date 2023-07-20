<template>
  <div class="mb-8">
    <!-- show while data loading -->
    <Loader :loading="loader" />
    <!-- popup shows after customer created -->
    <Popup :popup="popupData" />

    <!-- top section -->
    <div class="mb-16">
      <h1 class="text-center">{{ pageHeaderText }}</h1>
      <v-btn color="primary" class="float-right" @click="dialog = true" small>
        <v-icon class="mr-2" small>mdi-plus</v-icon>
        <span class="d-sm-flex d-none">{{ modalButtonText }}</span>
      </v-btn>
      <slot name="addNewButton"></slot>
    </div>

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

    <slot name="addNewView">
      <v-card class="py-6">
        <!-- Data Table -->
        <Form
          :fields="fieldsSearch"
          :request="requestSearch"
          :btnForm="btnFormSearch"
          @success="search"
          class="mb-4"
        />
        <v-data-table
          :headers="headers"
          :items="data"
          :items-per-page="pagination.per_page"
          hide-default-footer
          class="data-table"
          :page.sync="pagination.current_page"
          @page-count="pagination.total = $event"
          @click:row="navigateToCustomerPage"
        >
        </v-data-table>
        <v-card class="pa-4 mt-5" flat>
          <v-pagination
            v-model="pagination.current_page"
            :length="total"
            @input="paginate"
          ></v-pagination>
        </v-card>
      </v-card>
    </slot>
  </div>
</template>

<script>
/* import Components */
import Form from "@/components/Form";
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
    };
  },
  methods: {
    /*
     * this function used to get Row
     * it takes first param to use  this.$forceUpdate to up date pagintion or not
     */
    getData() {
      // turn on loader
      this.loader = true;
      // send request
      this.axios
        .get(`/${this.listDataApi}`, {
          params: {
            page: this.pagination.current_page,
            sort: "-created_at",
            ...this.apiParams,
          },
        })
        .then((res) => {
          // update date table
          this.data = res.data.data;
          this.pagination = res.data.meta;
          this.total = Math.ceil(
            this.pagination.total / this.pagination.per_page
          );
          // stop loader
          this.loader = false;
        });
    },
    search(res) {
      // updata data table
      // updata pagination data
      // this.updataPagination(res.meta);
      this.data = res.data;
      this.pagination = res.meta;
      this.total = Math.ceil(this.pagination.total / this.pagination.per_page);
    },
    paginate() {
      // update data table depend on page number
      this.getData();
    },
    addRow() {
      // make modal inputs equal null
      this.fieldsAddRow.map((field) => (field.value = ""));
      // close the modal
      this.dialog = false;
      // show popup with success message
      this.popupData.show = true;
      this.popupData.text = this.popupMessageAddRow;
      this.getData();
    },
    navigateToCustomerPage(item) {
      this.$router.push({
        name: this.navigateToViewPageRouteName,
        params: { id: item.id },
      });
    },
  },
  created() {
    // fetch data
    this.getData();
  },
};
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
