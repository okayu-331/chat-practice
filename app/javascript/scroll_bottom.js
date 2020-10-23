document.addEventListener('turbolinks:load', function() {
  const path = location.pathname;
  const messagesRegex = /^\/rooms\/\d+\/messages$/

  if (messagesRegex.test(path)) {
    const messagesArea = document.getElementById('messages');
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

})