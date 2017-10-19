import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

// import stageComponent from '../../vue/component/merchantInfo.vue';
import merchantTableComponent from '../../vue/component/merchantTable.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
// Vue.component('list-post',stageComponent);
Vue.component('merchant-table',merchantTableComponent);
var app = new Vue({
    el: '#backstageApp',
    mounted: function () {
      this.getLocation('taiwan');
      this.getPost();
    },
    data: {
      merchantPost: [],
      locationData:{},
      dynamicCity:[],
      dynamicDistrict:[{value:'',text:'請先選擇城市'}],
      postDetail: {},
      target:{
        id:'',
        title:'',
        content:'',
        image:'',
        raiseTime:'',
        city:'',
        district:''
      }
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
      getLocation: function (country) {
        var promise = getLocation(country);
        promise.then(function (data) {
          app.locationData =data;
          app.dynamicCity= dataMapping(data);
        }, function (err) {
          console.log(err);
        })
        // 取得城市區域資料
        function getLocation(country) {
          return $.get('/api/v1/address/'+country);
        }
        // 轉成bootstrap-vue的select格式
        function dataMapping(data){
          var cityList=_.map(data.city,function(city){
            return {value:city.id,text:city.name};
          });
          cityList.unshift({value:'',text:'請選擇'});
          
          return cityList;
        }
      },
      // 取得指定城市的區域資料,
      getDistrict:function(e){
        var targetCity=_.find(this.locationData.city,function(item){
          return item.id==e.target.value;
        })
        
        if(!targetCity){
          this.dynamicDistrict=[{value:'',text:'請先選擇城市'}]
        }else{
          this.dynamicDistrict=_.map(targetCity.district,function(item){
            return {value:item.id,text:item.name};
          });
          this.dynamicDistrict.unshift({value:'',text:'請選擇'});
        }
      },
      // 顯示指定的招商文資訊
      showDetailModal: function (postId) {
        this.postDetail = _.find(this.merchantPost, function (item) {
          return item.id == postId
        });
        this.$refs.merchantDetailModal.show();
        // $('#merchantDetailModal').modal('show');
      },
      // 顯示修改資訊的Modal
      showEditModal:function(postId){
        this.target = _.find(this.merchantPost, function (item) {
          return item.id == postId
        });
        this.$refs.merchantEditModal.show();
      },
      // 新增招商資訊的button click event handler
      showCreateModal:function(){
        this.$refs.merchantCreatModal.show();
      },
      // 顯示刪除招商資訊的Modal
      showDeleteModal:function(postId){
        this.postDetail = _.find(this.merchantPost, function (item) {
          return item.id == postId
        });
        this.$refs.merchantDeleteModal.show();
      },
      deletePost:function(){
        console.log('delete!'+this.postDetail.id);
        this.$refs.merchantDeleteModal.hide();
      }
    },
    filters: {

    },
    watch: {

    }
  }
);
