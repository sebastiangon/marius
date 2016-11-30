module.exports = {
  box:box
}

function box(id){

  var _id= id;

  function sayId(){
    console.log(_id);
  }

  return {
    sayId : sayId
  }

}
