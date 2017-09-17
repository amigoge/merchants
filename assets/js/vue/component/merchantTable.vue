<!--用於CRUD招商訊息的template-->
<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <!-- 顯示幕前的排序編號 -->
      <template slot="index" scope="data">
        {{data.index + 1}}
      </template>
      <template slot="actions" scope="row">
        <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="details(row.item,row.index,$event.target)">詳細資料</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default{
    props: ['list', 'showDetail'],
    data: function () {
      return {
        fields:{
          index:{
            label:'Index'
          },
          location:{
            label:'城市'
          },
          title:{
            label:'標題'
          },
          raiseTime:{
            label:'活動時間'
          },
          status:{
            label:'狀態'
          },
          actions:{
            label:'動作'
          }
        },
        items:[]
      }
    },
    methods: {
      displayDetail: function (postId) {
        this.$emit('show-detail', postId);
      },
      details:function(item,index,e){
        console.log(item);
      }
    },
    watch: {
      list: function (val) {
        this.items=val;
        console.log(val)
      }
    }
  }
</script>

<style>
  .merchantPost{
    cursor:pointer
  }
</style>
