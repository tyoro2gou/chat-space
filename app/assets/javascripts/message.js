$(function(){
  function buildHTML(message){
    if (message.image) {
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
      return html;
    } else {
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
      return html;
    };
  }

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
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.form__submit').prop('disabled', false);
    });
  })
});