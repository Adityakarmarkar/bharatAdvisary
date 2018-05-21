module.exports = {
  attributes: {
    title:{
      type:'string',
      required: true
    },
    decription:{
      type:'string',
      required: true
    },
    language:{
      type:'boolean',
      defaultsTo:false
    }
  }
};
