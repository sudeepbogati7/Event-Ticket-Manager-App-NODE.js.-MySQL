// model validattion middleware 

const Joi = require('joi');

// Validation schema for the Event model
const eventSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  date: Joi.date().required(),
  description: Joi.string().min(10).required(),
});

// Validation schema for the Ticket model
const ticketSchema = Joi.object({
  price: Joi.number().required(),
});

// Validation schema for the Organizer model
const organizerSchema = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().email().required()
});

// Validation schema for the User model
const userSchema = Joi.object({
    username : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    isOrganizer : Joi.boolean()
});





// Validation middleware for the Event model
exports.validateEvent = (req, res, next) => {
  const { error } = eventSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Validation middleware for the Ticket model
exports.validateTicket = (req, res, next) => {
  const { error } = ticketSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Validation middleware for the Organizer model
exports.validateOrganizer = (req, res, next) => {
  const { error } = organizerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Validation middleware for the User model
exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
