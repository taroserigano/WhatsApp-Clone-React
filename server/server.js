const io = require('socket.io')(5000)

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient) // recipient is Me! The sender, so filter out the actual sender and send only to the other people
      newRecipients.push(id) // adding the actual sender's ID here 
      socket.broadcast.to(recipient).emit('receive-message', { // send msg to the recipient's Room 
        recipients: newRecipients, sender: id, text            // recipients is All recipients (with new recipient) 
      })
    })
  })
})
