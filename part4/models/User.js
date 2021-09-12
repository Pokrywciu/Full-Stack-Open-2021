const moongose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new moongose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: moongose.Schema.Types.Object,
            ref: 'Blog'
        }
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })

 userSchema.plugin(uniqueValidator)

  const User = moongose.model('User', userSchema)

  module.exports = User