<template>
  <v-container>
    <!-- show while data loading -->
    <Loader :loading="loader" />
    <!-- popup shows after customer created -->
    <Popup :popup="popupData" />

    <v-card v-if="!loader" class="mt-8 pa-8 pt-16" flat>
      <!-- Buttons To make Acions -->
      <div class="buttons">
        <slot name="addActionButton"></slot>
        <v-btn
          color="error"
          class="mr-2"
          fab
          small
          @click="deleteOrRestore"
          :loading="loadingBtn"
        >
          <v-icon v-if="data.deleted_at" small title="restore"
            >mdi-delete-restore</v-icon
          >
          <v-icon v-else small title="delete">mdi-delete</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          class="edit-btn"
          @click="openModalEdit"
          fab
          small
        >
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
      </div>

      <!-- modal to create new Section -->
      <v-dialog v-model="modalEdit" width="800">
        <v-card class="pa-8">
          <Form
            :fields="fieldsEditData"
            :request="requestEditData"
            :btnForm="btnFormEditData"
            @success="editData"
          />
        </v-card>
      </v-dialog>

      <!-- Show Section Data Here -->
      <v-row v-for="(value, key, index) in customerData" :key="index">
        <v-col sm="4" class="elevation-1 text-capitalize">
          {{ key.replace(/_/g, " ") }}
        </v-col>
        <v-col sm="8" class="elevation-1">
          {{ value }}
        </v-col>
      </v-row>
      <slot name="addNewRow"></slot>
      <v-row>
        <v-col sm="4" class="elevation-1"> Is Deleted </v-col>
        <v-col sm="8" class="elevation-1">
          <span v-if="data.deleted_at" class="error--text">
            <!-- <span class="mr-2">&#10006;</span> -->
            Deleted
          </span>
          <span v-else class="success--text">
            <!-- <span class="mr-2">&#10004;</span> -->
            Exsits
          </span>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
/* import Components */
import Form from "@/components/Form";

export default {
  props: {
    dataKeys: {
      type: Array,
      required: true,
    },
    fieldsEditData: {
      type: Array,
      required: true,
    },
    api: {
      type: String,
      required: true,
    },
    apiPlus: {
      type: String,
    },
    sectionName: {
      type: String,
      required: true,
    },
    popup: {
      type: Object,
    },
  },
  components: {
    Form,
  },
  data() {
    return {
      data: {},
      modalEdit: false,
      loadingBtn: false,
      btnFormEditData: {
        text: "Edit",
        icon: "mdi-pencil",
      },
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    customerData() {
      const keys = this.dataKeys;
      var data = Object.keys(this.data)
        .filter((key) => keys.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: this.data[key],
          };
        }, {});
      if (keys.includes("gender")) {
        data.gender = data.gender == 1 ? "male" : "female";
      }
      if (keys.includes("pricing_method")) {
        data.pricing_method =
          data.pricing_method == 1 ? "Fixed Price" : "Open Price";
      }
      return data;
    },
    requestEditData() {
      return {
        method: "put",
        url: `/${this.api}/${this.id}`,
      };
    },
  },
  methods: {
    getData() {
      this.loader = true;
      this.axios.get(`/${this.api}/${this.id}`).then((res) => {
        // update data table
        this.data = res.data.data;
        this.loader = false;
        this.$emit("sectionData", res.data.data);
      });
    },
    deleteOrRestore() {
      this.popupData.show = false;
      this.loadingBtn = true;
      let url = `/${this.api}/${this.id}`;
      url += this.data.deleted_at ? "/restore" : "";
      let method = this.data.deleted_at ? "put" : "delete";
      this.axios({
        method: method,
        url: url,
      })
        .then(() => {
          // update data table
          this.data.deleted_at = !this.data.deleted_at;
          this.loadingBtn = false;
          this.popupData.show = true;
          this.popupData.color = this.data.deleted_at ? "error" : "success";
          this.popupData.text = this.data.deleted_at
            ? `${this.sectionName} Deleted Successfully`
            : `${this.sectionName} Restored Successfully`;
        })
        .catch((err) => {
          this.loadingBtn = false;
          this.popupData = {
            show: true,
            text: Object.values(err.response.data.errors)[0][0],
            color: "error",
          };
        });
    },
    openModalEdit() {
      this.popupData.show = false;
      this.modalEdit = true;
    },
    editData(res) {
      this.data = res.data;
      this.$emit("sectionData", res.data);
      this.modalEdit = false;
      this.popupData.show = true;
      this.popupData.color = "success";
      this.popupData.text = `${this.sectionName} Updated Successfully`;
    },
  },
  created() {
    this.popupData.show = false;
    this.getData();
  },
  watch: {
    $route() {
      this.getData();
    },
  },
};
</script>

<style scoped>
.buttons {
  position: absolute;
  right: 2%;
  top: 0px;
}
</style>
