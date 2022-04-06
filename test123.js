var B = {
    second: 2
  };
  
  function A(){
    this.first = 1;
  }
  A.prototype = B;
  
  var obj = new A();
  console.log(obj.first, obj.second);