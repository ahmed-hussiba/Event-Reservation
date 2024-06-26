const EventModel = require("../Models/EventModel");
const fs = require("fs");
const path = require("path");
const extensions = require("../Utils/Constants");
const { log } = require("console");
//get eventCategories
let GetEventByCategoryName = async (req, res) => {
  let categoryName = req.params.name;
  foundEvents = await EventModel.find({ category: categoryName })
  let eventsWithImgs = [];
  if (foundEvents) {
    for (let event of foundEvents) {
      let imgUrl = event.imageURl;
      let imgPath = path.join(__dirname, "../images/Event-Images", imgUrl);
      if (imgPath) {
        const data = fs.readFileSync(imgPath);
        const imgBuffer = Buffer.from(data).toString("base64");

        let EventwithImg = {
          event: event,
          imgBuffer: imgBuffer,
        };
        eventsWithImgs.push(EventwithImg);
      }
    }
    return res.status(200).json({ eventsWithImgs });
  }
  else {
    return res.status(404).json({ message: "notfound" });
  }
};
let GetAllEvents = async (req, res) => {

  let AllEvents = await EventModel.find();
  let eventsWithImgs = [];
  if (AllEvents) {
    for (let event of AllEvents) {
      let imgUrl = event.imageURl;
      let imgPath = path.join(__dirname, "../images/Event-Images", imgUrl);
      if (imgPath) {
        const data = fs.readFileSync(imgPath);
        const imgBuffer = Buffer.from(data).toString("base64");

        let EventwithImg = {
          event: event,
          imgBuffer: imgBuffer,
        };
        eventsWithImgs.push(EventwithImg);
      }
    }
    return res.status(200).json({ eventsWithImgs });
  } else {
    return res.status(400).json({ message: "Bad Request" });
  }


};
let GetEventByID = async (req, res) => {
  try {
    let Id = req.params.id;
    let foundEvent = await EventModel.findById(Id);

    // if (foundEvent) {
    //   res.status(200).json({ data: foundEvent });
    // } else {
    //   res.status(404).json({ message: "Event not found" });
    // }
    if (foundEvent) {

      let imgUrl = foundEvent.imageURl;

      let imgPath = path.join(__dirname, "../images/Event-Images", imgUrl);

      if (imgPath) {
        const data = fs.readFileSync(imgPath);
        const imgBuffer = Buffer.from(data).toString("base64");

        let EventwithImg = {
          event: foundEvent,
          imgBuffer: imgBuffer,
        };

        return res.status(200).json({ EventwithImg });
      }
    } else {
      return res.status(400).json({ message: "Bad Request" });
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
      _id: eventDetails._id,
    });

    let oldPath = path.join(
      __dirname,
      "../images/Event-Images/newEvent." + extensions.getExtension()
    );
    let newPath = path.join(
      __dirname,
      "../images/Event-Images/" +
      eventDetails.name +
      eventDetails._id +
      "." +
      extensions.getExtension()
    );

    if (foundEvent) {
      fs.unlink(oldPath, (err) => {
        console.log(err);
      });
      return res.status(409).json({ msg: "Already Exist" });
    }
    eventDetails.imageURl =
      eventDetails.name + eventDetails._id + "." + extensions.getExtension();
    console.log(eventDetails.imageURl);
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
  try {
    let highstedPromoted = await EventModel.find({ promotion: { $gt: 0 } })
      .sort({ promotion: -1 })
      .limit(5);


    if (!highstedPromoted) {
      return res.status(404).json({ Msg: "No Events Available" });
    }

    let PromotedEventsWithImgs = [];

    for (let event of highstedPromoted) {
      let imgUrl = event.imageURl;

      let imgPath = path.join(__dirname, "../images/Event-Images", imgUrl);

      if (imgPath) {
        const data = fs.readFileSync(imgPath);
        const imgBuffer = Buffer.from(data).toString("base64");

        let EventwithImg = {
          event: event,
          imgBuffer: imgBuffer,
        };
        PromotedEventsWithImgs.push(EventwithImg);


      }
    }


    return res.status(200).json({ PromotedEventsWithImgs });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ Msg: "Internal Server Error" });
  }
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
  GetEventByCategoryName
};
