import Office from "../models/Office.js";
import Queue from "../models/Queue.js";

export const createOrUpdateOffice = async (req, res) => {
  try {
    // test
    const adminId = req.user.id;
    const { name, location, operatingHours, counters } = req.body;

    let office = await Office.findOne({ admin: adminId });

    if (!office) {
      office = await Office.create({
        admin: adminId,
        name,
        location,
        operatingHours,
        counters
      });

      return res.status(201).json({
        message: "Office created",
        office
      });
    }

    office.name = name || office.name;
    office.location = location || office.location;
    office.operatingHours = operatingHours || office.operatingHours;
    office.counters = counters || office.counters;

    await office.save();

    res.json({
      message: "Office updated",
      office
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET DASHBOARD */
export const getDashboard = async (req, res) => {
  try {
    const office = await Office.findOne({ admin: req.user.id });

    if (!office)
      return res.status(404).json({ message: "No office found" });

    const totalWaiting = await Queue.countDocuments({
      office: office._id,
      status: "waiting"
    });

    const nextToken = await Queue.findOne({
      office: office._id,
      status: "waiting"
    }).sort({ tokenNumber: 1 });

    const totalWaitingTime =
      totalWaiting * office.avgWaitingTime;

    res.json({
      office,
      totalWaiting,
      totalWaitingTime,
      currentToken: office.currentToken,
      nextToken
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CALL NEXT TOKEN */
export const callNext = async (req, res) => {
  try {
    const office = await Office.findOne({ admin: req.user.id });

    const next = await Queue.findOne({
      office: office._id,
      status: "waiting"
    }).sort({ tokenNumber: 1 });

    if (!next)
      return res.json({ message: "No one in queue" });

    next.status = "served";
    await next.save();

    office.currentToken = next.tokenNumber;
    await office.save();

    res.json({
      message: "Next token called",
      token: next
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* PAUSE OR RESUME */
export const togglePause = async (req, res) => {
  try {
    const office = await Office.findOne({ admin: req.user.id });

    office.isPaused = !office.isPaused;
    await office.save();

    res.json({
      paused: office.isPaused
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE SETTINGS */
export const updateSettings = async (req, res) => {
  try {
    const { queueLimit, avgWaitingTime } = req.body;

    const office = await Office.findOne({ admin: req.user.id });

    if (queueLimit !== undefined)
      office.queueLimit = queueLimit;

    if (avgWaitingTime !== undefined)
      office.avgWaitingTime = avgWaitingTime;

    await office.save();

    res.json({
      message: "Settings updated",
      office
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
