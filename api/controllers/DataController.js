/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // 搜尋指定一筆招商資訊
  postSearchOne:function(req,res){
    Post.findOne().exec(function(err,post){
      if(err) {
        return res.json(err);
      }
      
      res.json(post);
    })
  },
  // 搜尋多筆招商資訊
  postSearchMany:function(req,res){
    // Post.find({},{raiseTime:0, createdAt:0, updatedAt:0}).exec(function(err,posts){
    Post.find({},
      {
        select:
          [
            'location','title','status',
            'raiseTime','updatedAt','content'
          ]
      }).exec(function(err,posts){
      if(err) {
        return res.json(err);
      }
      
      res.json(posts);
    })
  },
  // 新增一筆招商資訊
  postCreate: function (req, res) {
    var data=req.body;
    data.raiseTime=new Date(data.raiseTime);
    Post.create(data).exec(function(err,post){
      if(err) {
        return res.json(err);
      }
      
      res.json(post);
    });
  },
  // 更新某筆招商資訊
  postUpdate: function (req, res) {
    var targetID=req.params.id;
    var data=req.body;
    data.raiseTime=new Date(data.raiseTime);
    Post.update({id:targetID},data).exec(function(err,post){
      if(err) {
        return res.json(err);
      }
      
      res.json(post);
    })
  },
  // 刪除指定的招商資訊
  postDestroy: function (req, res) {
    var targetID=req.params.id;
    Post.destroy({id:targetID}).exec(function(err){
      if(err) {
        return res.json(err);
      }
      
      res.json({result:'The id:"'+targetID+'" has been destroy.'});
    })
  },
  // 搜尋指定一筆的地址資訊
  addressSearchOne:function(req,res){
    var targetID=req.params.id;
    AddressData.findOne({countryId:targetID}).exec(function(err,address){
      if(err) {
        return res.json(err);
      }
      res.json(address);
    })
  },
  // 搜尋多筆的地址資訊
  addressSearchMany:function(req,res){
    AddressData.find().exec(function(err,addresses){
      if(err) {
        return res.json(err);
      }
      res.json(addresses);
    })
  },
  // 新增一筆地址資訊
  addressCreate: function (req, res) {
    var data=req.body;
    AddressData.create(data).exec(function(err,address){
      if(err) {
        return res.json(err);
      }
      
      res.json(address);
    })
  },
  // 修改指定一筆的地址資訊
  addressUpdate: function (req, res) {
    var targetID=req.params.id;
    var data=req.body;
    AddressData.update({id:targetID},data).exec(function(err,address){
      if(err) {
        return res.json(err);
      }
      
      res.json(address);
    })
  },
  // 刪除指定一筆的地址資訊
  addressDestroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  }
};

