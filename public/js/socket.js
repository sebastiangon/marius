export default function socket(){

  var _socket = io.connect();

  return {
    socket : _socket
  }
};
