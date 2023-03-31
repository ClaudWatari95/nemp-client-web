document.addEventListener('DOMContentLoaded', () => {
 const leftPanel = document.querySelector('#page .panel.left');
 const rightPanel = document.querySelector('#page .panel.right');
 var resizer = document.querySelector('#page .resizer');
 var searchBar = document.querySelector('#searchbar');
 var userBar = document.querySelector('#userbar');
 var searchBarInput = document.querySelector('#searchbar > .text');
 var selfName = document.querySelector('#userbar > .text > .name');
 var selfAddress = document.querySelector('#userbar > .text > .address');
 var input_bar = document.querySelector('#inputbar');
 var dragging = false;

 resizer.addEventListener('mousedown', () => {
  dragging = true;
  leftPanel.style.userSelect = 'none';
  rightPanel.style.userSelect = 'none';
 });
 document.addEventListener('mouseup', () => {
  dragging = false;
  leftPanel.style.removeProperty('user-select');
  rightPanel.style.removeProperty('user-select');
 });
 document.addEventListener('mousemove', (e) => {
  if (dragging) {
   var pageWidth = leftPanel.parentElement.clientWidth;
   var leftPanelMinWidth = 250;
   var leftPanelMaxWidth = pageWidth - 500;
   var newLeftPanelWidth = e.clientX > leftPanelMinWidth ? e.clientX : leftPanelMinWidth;
   newLeftPanelWidth = newLeftPanelWidth < leftPanelMaxWidth ? newLeftPanelWidth : leftPanelMaxWidth;
   leftPanel.style.width = newLeftPanelWidth + 'px';
   rightPanel.style.width = pageWidth - newLeftPanelWidth + 'px';
   searchBar.style.width = (newLeftPanelWidth - 20) + 'px';
   selfName.style.width = (pageWidth - newLeftPanelWidth - 290) + 'px';
   selfAddress.style.width = (pageWidth - newLeftPanelWidth - 290) + 'px';
   userBar.style.width = (pageWidth - newLeftPanelWidth - 20) + 'px';
   resizer.style.left = newLeftPanelWidth - (resizer.offsetWidth / 2) + 'px';
   var conversations_text = document.querySelectorAll('#conversations > a .conversation >.text');
   input_bar.style.marginLeft = newLeftPanelWidth + 'px';
   conversations_text.forEach((text) => {
    text.style.width = (newLeftPanelWidth - 170) + 'px';
   });
  }
 });
 getConversations();
 getConversation(2);
 if(window.matchMedia('(max-width: 768px)').matches) {
  resizer.style.display = 'none';
  rightPanel.style.display = 'none';
  leftPanel.style.width = '100%';
  searchBar.style.width = '100%';
  searchBarInput.style.marginRight = '2rem';
 }

});

function menu() {
 var menu = document.querySelector('#menu');
 if (getComputedStyle(menu).display == 'none') menuShow();
 else menuHide();
}

function menuShow() {
//  document.querySelector('#menu').style.display = 'flex';
 document.querySelector('#menu').classList.toggle('show');
}

function menuHide() {
//  document.querySelector('#menu').style.display = 'none';
 document.querySelector('#menu').classList.toggle('show');
}

function copy(text) {
 navigator.clipboard.writeText(text);
}

async function addConversation(id, photo, name, message, time, unread, active) {
 var html = translate(await getFileContent('html/temp-conversation.html'), {
  '{ID}': id,
  '{PHOTO}': photo,
  '{NAME}': name,
  '{MESSAGE}': message,
  '{TIME}': time,
  '{UNREAD}': unread,
  '{ACTIVE}': active ? ' active' : '',
  '{READ-ICON}': 'recieved.svg',
  '{READ-TEXT}': '✔',
 });
 document.querySelector('#conversations').innerHTML += html;
 document.querySelectorAll('#conversations .conversation .status .unread').forEach((item) => {
    if(item.innerHTML === '0') item.style.display = 'none';
 });
}

function translate(template, dictionary) {
 for (var key in dictionary) template = template.replaceAll(key, dictionary[key]);
 return template;
}

async function getFileContent(file) {
 var content = await fetch(file, { headers: { 'cache-control': 'no-cache' }});
 return content.text();
}

async function getConversations() {
 await addConversation('1', 'https://i.pravatar.cc/300?u=user1', 'Ultraultraultra Long Username - Company Ltd.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl sit amet nunc. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl sit amet nunc.', '12:59:59', 10, false);
 await addConversation('2', 'https://i.pravatar.cc/300?u=user2', 'Veryveryvery Long Username - Some Other Company Ltd.', 'Morem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl sit amet nunc. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl sit amet nunc.', '12:59:59', 0, true);
 await addConversation('3', 'https://i.pravatar.cc/300?u=user3', 'Short Name', 'Norem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl sit amet nunc. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl sit amet nunc.', '12:59:59', 888, false);
 await addConversation('4', 'https://i.pravatar.cc/300?u=user4', 'John Doe', 'Oorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl sit amet nunc. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl sit amet nunc.', '12:59:59', 5, false);
 await addConversation('5', 'https://i.pravatar.cc/300?u=user5', 'Jane Smith', 'Porem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl sit amet nunc. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl sit amet nunc.', '12:59:59', 5, false);
//  await addConversation('6', 'https://i.pravatar.cc/300?u=user6', 'User Name', 'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl sit amet nunc. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl sit amet nunc.', '12:59:59', 888, false);
}

async function getConversation(id) {
 var chat_container = document.querySelector('#chat > .container');
 var active = document.querySelector('.active');
 var a = document.querySelector(`a[onClick="getConversation('${id}')"]`);
 var clicked = a ? a.querySelector('.conversation') : null;
 active ? active.classList.remove('active'): null;
 clicked ? clicked.classList.add('active') : null;
 var messages = [
   {
      date: "17 March 2023",
      content: [
       {
        text: "Hi, how are you?",
        sender_photo: "https://i.pravatar.cc/300?u=user2",
        meta: {
         time: "14:23",
         checkmark: "✔"
        }
       },
       {
        text: "Hi, I am fine, thank you!",
        sender_photo: "https://i.pravatar.cc/300?u=ownprofile",
        meta: {
         time: "14:25",
         checkmark: "✔"
        }
       },
      ]
   }
 ];
 chat_container.innerHTML = '';
 var reversedMessages = messages.slice().reverse();
 for (var i=0; i<reversedMessages.length; i+=1) {
  var message = reversedMessages[i];
  var div = document.createElement('div');
  div.innerHTML = `<div class="date">${message.date}</div>`;
  for(var j=0; j<message.content.length; j+=1) {
   var content = message.content[j];
   var content_div = document.createElement('div');
   content_div.classList.add('message');
   if(content.sender_photo.split('?u=')[1] === 'ownprofile') content_div.classList.add('sent');
   else content_div.classList.add('received');
   content_div.innerHTML = `
    <img class="photo-circle medium" src="${content.sender_photo}" alt="NAME" />
    <div class="content">
     <div class="text">${content.text}</div>
     <div class="meta">
      <span class="time">${content.meta.time}</span>
      <span class="checkmark">&ensp;${content.meta.checkmark}</span>
     </div>
    </div>
   `;
   div.appendChild(content_div);
  }
  chat_container.appendChild(div);
 }
 chat_container.scrollTop = chat_container.scrollHeight - chat_container.clientHeight;
}