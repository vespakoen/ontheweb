const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: '/data/hummingguru.sqlite'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }, (err) => {
    console.log('Unable to connect to the database:', err);
  })

//  MODELS
const FacebookProfile = sequelize.define('facebook_profiles', {
  id: { type: Sequelize.STRING, primaryKey: true },
  facebookId: Sequelize.STRING,
  name: Sequelize.STRING,
  fullName: Sequelize.STRING
})

const GuestProfile = sequelize.define('guest_profiles', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
  deviceId: Sequelize.STRING,
  name: Sequelize.STRING,
})

const User = sequelize.define('users', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
  lastHummDate: { type: Sequelize.DATE, allowNull: true }
})

const Humm = sequelize.define('humms', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
  genre: { type: Sequelize.STRING, allowNull: true },
  recordingId: Sequelize.STRING,
  note: Sequelize.TEXT
})

const Comment = sequelize.define('comments', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
  comment: Sequelize.TEXT
})

GuestProfile.belongsTo(User)
User.hasOne(GuestProfile, { as: 'guestProfile', foreignKey: 'userId' })
FacebookProfile.belongsTo(User)
User.hasOne(FacebookProfile, { as: 'facebookProfile', foreignKey: 'userId' })
Comment.belongsTo(User)
User.hasMany(Humm, { as: 'humms' })
Humm.belongsTo(User)
Humm.hasMany(Comment, { as: 'comments' })

//  SYNC SCHEMA
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Synced database schema')
  }, (err) => {
    console.log('An error occurred while creating the table:', err)
  })

module.exports = {
  FacebookProfile,
  GuestProfile,
  User,
  Humm,
  Comment
}
