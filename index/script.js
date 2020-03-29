$(function () {
  $('#asur').click(function () {
    $('#modalImage').html(`
      <img src="asur/trace.png">
    `)
    $('#modal').modal('toggle');
  });
  $('#echigo-tsumari').click(function () {
    $('#modalImage').html(`
      <img src="echigo-tsumari/trace.png">
    `)
    $('#modal').modal('toggle');
  });
});
