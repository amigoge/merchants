/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    location:{type:'string'},    // 地點
    title:{type:'string'},       // 標題 or 市集名稱
    content:{type:'text'},     // 內文
    raiseTime:{type:'date'},      // 市集時間
    status:{
      type:'string',
      enum:['new','normal','hot','history','canceled']
    }
  }
};

