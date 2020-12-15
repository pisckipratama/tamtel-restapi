## generate model User

`sequelize model:generate --name User --attributes email:string,password:string,photo:string,delete_at:date`
`sequelize model:generate --name Room --attributes room_name:string,room_capacity:string,photo:string,deleted_at:date`

## todo until this night 2020-12-15

- CRUD meeting room by admin - running
- GET meeting room by Guest
- CRUD booking meeting room by Guest
- deploy heroku
- github action
