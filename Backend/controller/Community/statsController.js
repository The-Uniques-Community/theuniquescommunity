import Stats from "../../models/community/statsModel.js";

const DEFAULT_STATS = {
  Earnings: 860000,
  Clients: 100,
  Projects: 150,
  Events: 40,
};

export const getStats = async (req, res) => {
  try {
    let stats = await Stats.findOne().sort({ updatedAt: -1 });
    if (!stats) {
      stats = await Stats.create(DEFAULT_STATS);
    }
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ success: false, message: "Error fetching stats", error: error.message });
  }
};

export const updateStats = async (req, res) => {
  try {
    const { Earnings, Clients, Projects, Events } = req.body;
    let stats = await Stats.findOne().sort({ updatedAt: -1 });
    
    if (stats) {
      stats.Earnings = Number(Earnings) || stats.Earnings;
      stats.Clients = Number(Clients) || stats.Clients;
      stats.Projects = Number(Projects) || stats.Projects;
      stats.Events = Number(Events) || stats.Events;
      await stats.save();
    } else {
      stats = await Stats.create({
        Earnings: Number(Earnings) || DEFAULT_STATS.Earnings,
        Clients: Number(Clients) || DEFAULT_STATS.Clients,
        Projects: Number(Projects) || DEFAULT_STATS.Projects,
        Events: Number(Events) || DEFAULT_STATS.Events,
      });
    }

    res.status(200).json({ success: true, message: "Stats updated successfully", data: stats });
  } catch (error) {
    console.error("Error updating stats:", error);
    res.status(500).json({ success: false, message: "Error updating stats", error: error.message });
  }
};
