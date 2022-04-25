// Collapsible
var pack = [];
var coll = document.getElementsByClassName('collapsible');

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function () {
    this.classList.toggle('active');

    var content = this.nextElementSibling;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
}

function savePack(item) {
  sessionStorage.setItem('item', JSON.stringify(pack));
}

function loadPack(item) {
  pack = JSON.parse(sessionStorage.getItem('item'));
}
if (sessionStorage.getItem('item') != null) {
  // Ain't no given
  loadPack();
}

function getTime() {
  let today = new Date();
  hours = today.getHours();
  minutes = today.getMinutes();

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  let time = hours + ':' + minutes;
  return time;
}

// Khởi tạo tin nhắn đầu tiên của Bot
function firstBotMessage() {
  let firstMessage = 'What are you looking for?';
  document.getElementById('botStarterMessage').innerHTML =
    '<p class="botText"><span>' + firstMessage + '</span></p>';

  let time = getTime();

  $('#chat-timestamp').append(time);
  document.getElementById('userInput').scrollIntoView(false);
}

firstBotMessage();

// Đoạn message Bot trả về
function getHardResponse(userText) {
  let botResponse = getBotResponse(userText);
  let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
  $('#chatbox').append(botHtml);

  document.getElementById('chat-bar-bottom').scrollIntoView(true);
}

//Lấy value từ input khi User nhập giá trị
function getResponse() {
  let userText = $('#textInput').val();

  if (userText == '') {
    userText = 'Hey Cosy!';
  }

  let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

  $('#textInput').val('');
  $('#chatbox').append(userHtml);
  document.getElementById('chat-bar-bottom').scrollIntoView(true);

  setTimeout(() => {
    getHardResponse(userText);
  }, 1000);
}

// Click Enter đẻ gửi message
function buttonSendText(sampleText) {
  let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

  $('#textInput').val('');
  $('#chatbox').append(userHtml);
  document.getElementById('chat-bar-bottom').scrollIntoView(true);
}

function sendButton() {
  getResponse();
}

function heartButton() {
  buttonSendText('<i id="chat-icon" style="color: crimson;" class="fa fa-fw fa-heart"></i>');
}

// Nhấn Enter để gủi message
$('#textInput').keypress(function (e) {
  if (e.which == 13) {
    getResponse();
  }
});
