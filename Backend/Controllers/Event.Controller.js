const EventModel = require("../Models/EventModel");
const fs = require("fs");
const path = require("path");
const extensions = require("../Utils/Constants");

let GetAllEvents = async (req, res) => {
  let AllEvents = await EventModel.find();
  if (AllEvents) {
    res.status(200).json({ data: AllEvents });
  } else {
    res.status(400).json({ message: "Bad Request" });
  }
};
let GetEventByID = async (req, res) => {
  try {
    let Id = req.params.id;
    let foundEvent = await EventModel.findById(Id);

    if (foundEvent) {
      res.status(200).json({ data: foundEvent });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error retrieving event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let AddEvent = async (req, res) => {
  let eventDetails = JSON.parse(req.body.data);
  console.log(eventDetails);
  if (eventDetails) {
    let foundEvent = await EventModel.findOne({
      name: eventDetails.name,
      date: eventDetails.data,
    });

    let oldPath = path.join(
      __dirname,
      "../images/Event-Images/newEvent." + extensions.getExtension()
    );
    let newPath = path.join(
      __dirname,
      "../images/Event-Images/" +
        eventDetails.name +
        eventDetails.date +
        "." +
        extensions.getExtension()
    );

    if (foundEvent) {
      fs.unlink(oldPath, (err) => {
        console.log(err);
      });
      return res.status(409).json({ msg: "Already Exist" });
    }
    eventDetails.imageURL =
      eventDetails.name + eventDetails.date + "." + extensions.getExtension();
    console.log(eventDetails.imageURL);
    let newEvent = new EventModel(eventDetails);

    newEvent
      .save()
      .then(() => {
        fs.rename(oldPath, newPath, (err) => {
          console.log(err);
        });
        res.status(201).json({ data: newEvent });
      })
      .catch((err) => {
        fs.unlink(oldPath, (err) => {
          console.log(err);
        });
        console.log(err);
        res.status(400).json({ message: "bad request 1" });
      });
  } else {
    res.status(400).json({ message: "bad request" });
  }
};

let GetPromotedEvents = async (req, res) => {
  let highstedPromoted = await EventModel.find({ promotion: { $gt: 0 } })
    .sort({ promotion: -1 })
    .limit(5);
  if (!highstedPromoted) {
    return res.status(404).json({ Msg: "No Events Available" });
  }

  return res.status(200).json({ data: highstedPromoted });
};

let UpdateEvent = async (req, res) => {
  try {
    let Id = req.params.id;
    let updatedEvent = await EventModel.findOneAndUpdate(
      { _id: Id },
      { $set: req.body },
      { new: true }
    );

    if (updatedEvent) {
      res.status(200).json({ data: updatedEvent });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

let DeleteEventByID = async (req, res) => {
  try {
    let Id = req.params.id;
    let deletedEvent = await EventModel.findOneAndDelete({ _id: Id });

    if (deletedEvent) {
      res.status(200).json({ data: deletedEvent });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  GetAllEvents,
  GetEventByID,
  AddEvent,
  UpdateEvent,
  DeleteEventByID,
  GetPromotedEvents,
};
