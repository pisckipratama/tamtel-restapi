# TamTel (Tama Hostel) RESTful API

Backend application with RESTful API for TamTel Application

#### Publishing
[Postman](https://www.getpostman.com/collections/8e744f30b7bb6f7ced31) <br>
[Heroku App](https://tamtel-restapi.herokuapp.com/)

#### Todo
- [x] User admin login dan memasukkan data ruangan
- [x] User Guest register dengan data (email, password, photo profile)
- [x] User Guest login
- [x] User Guest melihat ruangan yang tersedia
- [x] User Guest memboking di ruangan tersebut pada tanggal dan waktu yang telah dia tentukan.
      <b>CATATAN</b>: total orang tidak boleh lebih dari kapasitas ruangan
- [x] User mendapatkan email tentang bokingan
- [x] User mendapatkan email pemberitahuan ketika tanggal booking = tanggal saat ini
- [x] User Cek in ruangan
- [x] User mendapatkan email Cek In
- [x] Deployed

#### How to running at development enviroment
`npm install` <br />
`npm install sequelize-cli -g` _*) use sudo if you're Linux user_ <br />
`sequelize db:migrate` <br />
`sequelize db:seed:all` <br />
`npm run dev` <br /> <br />

try to login with this credential:
- admin user : _username_ `admin@testing.com` _password_ `nopassword`
- guest user : _username_ `guest@testing.com` _password_ `nopassword`

