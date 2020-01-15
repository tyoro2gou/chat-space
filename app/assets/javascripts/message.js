$(function(){
  
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html =
        `<div class="content" data-message-id=${message.id}>
          <div class="content__box">
            <div class="content__box--user-name">
            ${message.user_name}
            </div>
            <div class="time">
            ${message.created_at}
            </div>
          </div>
          <div class="content__message_box">
            <p class="content__message_box--text">
            ${message.content}
            </p>
            <img class="content__message_box--image" src=${message.image}>
          </div>
        </div>`
    } else if (message.content){
      var html =
      `<div class="content" data-message-id=${message.id}>
        <div class="content__box">
          <div class="content__box--user-name">
          ${message.user_name}
          </div>
          <div class="time">
          ${message.created_at}
          </div>
        </div>
        <div class="content__message_box">
          <p class="content__message_box--text">
          ${message.content}
          </p>
        </div>
      </div>`
    } else if (message.image) {
      var html =
        `<div class="content" data-message-id=${message.id}>
          <div class="content__box">
            <div class="content__box--user-name">
            ${message.user_name}
            </div>
            <div class="time">
            ${message.created_at}
            </div>
          </div>
          <div class="content__message_box">
            <img class="content__message_box--image" src=${message.image}>
          </div>
        </div>`
    };
      return html;
  };
  
  // hidouki
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
      var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message_list').append(html);
      $('.chat-main__message_list').animate({ scrollTop: $('.chat-main__message_list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    });
  })


  // zidoukousin
  var reloadMessages = function() {
    last_message_id = $('.content:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message_list').append(insertHTML);
        $('.chat-main__message_list').animate({ scrollTop: $('.chat-main__message_list')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function(){
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 5000);
  }
});