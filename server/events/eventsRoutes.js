const express = require('express');
const router = express.Router();
const event = require('./eventsController')

router.put("/update/:id", event.updateEvent);

router.post('/new-event', event.createEvent);

router.get('/get-events', event.showAllEvents);

router.get('/get-full-event/:id', event.showFullEvent);

router.delete('/delete-event/:id', event.deleteEvent);

module.exports = router;