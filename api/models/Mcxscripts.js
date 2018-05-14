module.exports = {

  attributes: {
    name:{
      type:'string',
      required: true
    },
    trend:{
      type:'string',
      required: true
    },
    price:{
      type:'string',
      required: true
    },
    stoploss:{
      type:'string'
    },
    target1:{
      type:'string',
      required: true
    },
    target2:{
      type:'string'
    },
    rating:{
      type:'string'
    },
    remark:{
      type:'string'
    }
  }
};
