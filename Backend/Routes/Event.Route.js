const express = require('express');
const router=express.Router();

const EventController = require('../Controllers/Event.Controller');
const AdminPermissionMW = require('../MiddleWares/AdminPermissionMW');

router.get('/',EventController.GetAllEvents);
router.get('/:id',EventController.GetEventByID);
router.post('/',AdminPermissionMW,EventController.AddEvent);
router.put('/:id',AdminPermissionMW,EventController.UpdateEvent);
router.delete('/:id',AdminPermissionMW,EventController.DeleteEventByID);


module.exports=router;