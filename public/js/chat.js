"use strict";
const io = require('socket.io');
const socket = io();
// //elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
// //templates
// // const messageTemplate = document.querySelector('#message-template').innerHTML
// // const locationTemplate = document.querySelector('#location-message-template').innerHTML
// // const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
const messageTemplate = document.querySelector('#message-template');
const locationTemplate = document.querySelector('#location-message-template');
const sidebarTemplate = document.querySelector('#sidebar-template');
//options
const { username, room } = qs.parse(location.search, { ignoreQueryPrefix: true });
// const autoscroll = ()=>{
//     //New message element
//     const $newMessage = $messages.lastElementChild
//     //height of the new message
//     const newMessageStyles = getComputedStyle($newMessage)
//     const newMessageMargin = parseInt(newMessageStyles.marginBottom)
//     const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
//     //visible height
//     const visibleHeight = $messages.offsetHeight
//     //height of message container
//     const containerHeight = $messages.scrollHeight
//     //how far have I scrolled?
//     const scrolledOffset = $messages.scrollTop + visibleHeight
//     if(containerHeight - newMessageHeight <= scrolledOffset){
//         $messages.scrollTop = $messages.scrollHeight
//     }
// }
// socket.on('message',(message)=>{
//     console.log(message);
//     const html = Mustache.render(messageTemplate,{
//         username:message.username,
//         message:message.text,
//         createdAt:moment(message.createdAt).format('h:mm a')
//     })
//     $messages.insertAdjacentHTML('beforeend',html)
//     autoscroll()
// })
// socket.on('locationMessage',(message)=>{
//     const html = Mustache.render(locationTemplate,{
//         username:message.username,
//         url:message.url,
//         createdAt:moment(message.createdAt).format('h:mm a')
//     })
//     $messages.insertAdjacentHTML('beforeend',html)
//     autoscroll()
// })
// socket.on('roomData',({room,users})=>{
//    const html = Mustache.render(sidebarTemplate,{
//        room,
//        users
//    })
//    document.querySelector('#sidebar').innerHTML = html
// })
// $messageForm.addEventListener('submit',(e)=>{
//     e.preventDefault()
//     //disable
//     $messageFormButton.setAttribute('disabled','disabled') //for disabling the button
//     const message = e.target.elements.message.value
//     socket.emit('sendMessage',message ,(error)=>{
//        //enable
//         $messageFormButton.removeAttribute('disabled')
//         $messageFormInput.value = ''
//         $messageFormInput.focus()
//         if(error){
//             return console.log(error);
//         }
//         console.log('Message Delivered');
//     })
// })
// $sendLocationButton.addEventListener('click',()=>{
//     if(!navigator.geolocation){
//         return alert('Geolaction by your browsre.')
//     }
//     $sendLocationButton.setAttribute('disabled','disabled')
//     navigator.geolocation.getCurrentPosition((position)=>{
//         socket.emit('sendLocation',{
//             latitude:position.coords.latitude,
//             longitude:position.coords.longitude
//         },()=>{
//             $sendLocationButton.removeAttribute('disabled')
//             console.log('location shared!');
//         })
//     })
// })
