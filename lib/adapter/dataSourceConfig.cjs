const UserEntity = require('./entities/UserEntity')
const AccountEntity = require('./entities/AccountEntity')
const SessionEntity = require('./entities/SessionEntity')
const VerificationTokenEntity = require('./entities/VerificationTokenEntity')
const AddressEntity = require('./entities/AddressEntity')
const OrderEntity = require('./entities/OrderEntity')
const TrackingEntity = require('./entities/TrackingEntity')
const NotificationEntity = require('./entities/NotificationEntity')
const NotificationConfigEntity = require('./entities/NotificationConfigEntity')
const WarehouseEntity = require('./entities/WarehouseEntity')

module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  entities: [
    UserEntity,
    AccountEntity,
    SessionEntity,
    VerificationTokenEntity,
    AddressEntity,
    OrderEntity,
    TrackingEntity,
    NotificationEntity,
    NotificationConfigEntity,
    WarehouseEntity,
  ],
  synchronize: true,
  logging: false,
};
