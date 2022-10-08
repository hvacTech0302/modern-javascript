/* eslint-disable no-undef */
// DOM queries
const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const updateNameForm = document.querySelector('.new-name')
const updateMessage = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms')
const clearChat = document.querySelector('.clear-chat')

// update username
updateNameForm.addEventListener('submit', e => {
  e.preventDefault()
  const newName = updateNameForm.name.value.trim()
  chatroom.updateName(newName)
  updateNameForm.reset()
  updateMessage.innerText = `Your name was updated to ${newName}.`
  setTimeout(() => { updateMessage.innerText = '' }, 3000)
})

// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = newChatForm.message.value.trim()
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err))
})

rooms.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear()
    chatroom.updateRoom(e.target.id)
    localStorage.setItem('room', e.target.id)
    chatroom.getChats(chat => chatUI.render(chat))
  }
})

clearChat.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    chatroom.clearChat()
    chatUI.clear()
  }
})

while (!localStorage.getItem('guest')) {
  localStorage.setItem('guest', `Guest#${String(Math.floor(Math.random() * 100000))}`)
}
const guest = localStorage.getItem('guest')

const username = localStorage.getItem('username') ? localStorage.getItem('username') : guest

while (!localStorage.getItem('room')) {
  localStorage.setItem('room', 'general')
}

const room = localStorage.getItem('room')

// class instances
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom(room, username)

// get chats and render
chatroom.getChats(data => chatUI.render(data))
