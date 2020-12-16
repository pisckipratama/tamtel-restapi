const model = require('../models/index');
const scheduler = require('node-schedule');
const sendEmail = require('./send_email');
const moment = require('moment');

const sendEmailScheduler = async () => {
  try {
    const dateNow = moment(Date.now()).format('YYYY-MM-DD');
    const dataBooking = await model.Booking.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'UserId', 'RoomId']
      },
      include: [
        { model: model.User, attributes: ['email'] },
        { model: model.Room, attributes: ['room_name', 'room_capacity'] }
      ]
    });

    let data = dataBooking.map(item => item.dataValues);
    data.forEach(async item => {
      const bookingTime = moment(item.booking_time).format('YYYY-MM-DD');
      const message = `
      Please don't reply this email.
      Are you ready for meeting in our meeting room? Don't forget to check-in ASAP.
      Here is your detail booking,\n
      Room Name \t: ${item.Room.room_name}
      Total Person \t: ${item.total_person}
      Booking Time \t: ${moment(item.booking_time).format('LL')}
      Notes \t\t: ${item.noted}\n\n
      if you are not booked, please contact us at support@tamtel.com
      `;

      if (bookingTime === dateNow) {
        await sendEmail({
          email: `${item.User.email}`,
          subject: `Your Booking Reminder Today`,
          message
        })
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const runningScheduler = scheduler.scheduleJob('* 3 * * *', () => {
  sendEmailScheduler();
});

module.exports = { runningScheduler };