const model = require('../models/index');
const Joi = require("joi");

class BookingsController {
  static async postBookingByRoomId(req, res, next) {
    const { roomId } = req.params;
    const { id } = req.user;
    const { 
      total_person,
      booking_time,
      noted,
      check_in_time,
      check_out_time 
    } = req.body;

    const schema = Joi.object().keys({
      UserId: Joi.number().required(),
      RoomId: Joi.number().required(),
      total_person: Joi.number().required(),
      booking_time: Joi.date().required(),
      noted: Joi.any(),
      check_in_time: Joi.date(),
      check_out_time: Joi.date(),
    });

    try {
      const payload = { 
        total_person, 
        booking_time, 
        noted, 
        check_in_time, 
        check_out_time, 
        UserId: id, 
        RoomId: roomId, 
      };
      await schema.validateAsync(payload);

      const dataRoom = await model.Room.findAll({ where: { id: roomId } });
      if (dataRoom.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "data not found!",
        });
      }

      console.log(parseInt(dataRoom[0].dataValues.room_capacity))
      if (parseInt(total_person) > parseInt(dataRoom[0].dataValues.room_capacity)) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "this room cannot overcapacity!"
        });
      }

      const data = await model.Booking.create(payload);

      return res.status(201).json({
        status: 201,
        success: true,
        message: "booking created successfully",
        content: data
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BookingsController;