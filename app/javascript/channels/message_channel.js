import consumer from "./consumer"

consumer.subscriptions.create("MessageChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const myMessage = `
      <div class="my-message">
        <div class="upper-message">
          <div class="message-user">
            ${data.name}
          </div>
          <div class="message-date">
            ${data.date}
          </div>
        </div>
        <div class="lower-message">
          <div class="message-content">
            <p>${data.content.content}</p>
          </div>
        </div>
      </div>`;

    const othersMessage = `
      <div class="message">
        <div class="upper-message">
          <div class="message-user">
            ${data.name}
          </div>
          <div class="message-date">
            ${data.date}
          </div>
        </div>
        <div class="lower-message">
          <div class="message-content">
            <p>${data.content.content}</p>
          </div>
        </div>
      </div>`;

    const messages = document.getElementById('messages');
    const currentUserId = parseInt(messages.dataset.currentUser, 10);
    const newMessage = document.getElementById('message_content');

    if(currentUserId === data.content.user_id) {
      messages.insertAdjacentHTML('beforeend', myMessage);
    } else {
      messages.insertAdjacentHTML('beforeend', othersMessage);
    }
    
    messages.scrollTop = messages.scrollHeight;
    newMessage.value = '';
  }
});
