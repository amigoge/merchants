import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import stageComponent from '../../vue/component/merchantInfo.vue';
import merchantTableComponent from '../../vue/component/merchantTable.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.component('list-post',stageComponent);
Vue.component('merchant-table',merchantTableComponent);
var app = new Vue({
    el: '#app',
    mounted: function () {
      this.getLocation();
      this.getPost();
    },
    data: {
      merchantPost: [],
      locationData:{},
      postDetail: {}
    },
    methods: {
      // 取得招商資訊清單
      getPost: function () {
        var promise = getMerchantPost();
        promise.then(function (data) {
          app.merchantPost = data;
        }, function (err) {
          console.log(err);
        })
        // 取得超商資訊
        function getMerchantPost() {
          return $.get('/api/v1/post');
        }
      },
      // 取得城市區域清單
      getLocation: function () {
        var promise = getLocation();
        promise.then(function (data) {
          app.locationData = data;
        }, function (err) {
          console.log(err);
        })
        // 取得城市區域資料
        function getLocation() {
          return $.get('/api/v1/address/taiwan');
        }
      },
      // 顯示指定的招商文資訊
      showDetail: function (postId) {
        this.postDetail = _.find(this.merchantPost, function (item) {
          return item.id == postId
        });
        this.$refs.merchantDetailModal.show();
        // $('#merchantDetailModal').modal('show');
      }
    },
    filters: {
      
    },
    watch: {
      
    }
  }
);
