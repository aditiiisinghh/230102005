const axios = require("axios");
const https = require("https");

const selectVehicles = require("../utils/knapsack");
const Log = require("../../logging_middleware/logger");

const TOKEN = "PASTE_TOKEN";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const getVehicleData = async () => {

  try {

    await Log(
      "backend",
      "info",
      "service",
      "fetching depots"
    );

    const depotsResponse = await axios.get(
      "https://4.224.186.213/evaluation-service/depots",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        httpsAgent,
      }
    );

    await Log(
      "backend",
      "info",
      "service",
      "fetching vehicles"
    );

    const vehiclesResponse = await axios.get(
      "https://4.224.186.213/evaluation-service/vehicles",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        httpsAgent,
      }
    );

    const depots = depotsResponse.data.depots || [];
    console.log(depots);
    const vehicles = vehiclesResponse.data.vehicles || [];

    const result = [];

    for (const depot of depots) {

const mechanicHours = Number(depot.MechanicHours);

      // invalid values skip
      if (isNaN(mechanicHours) || mechanicHours < 0) {
        console.log("Invalid mechanic hours:", depot.mechanicHours);
        continue;
      }

      const bestVehicles = selectVehicles(
        vehicles,
        mechanicHours
      );

      let totalHours = 0;

      for (const item of bestVehicles.selectedVehicles || []) {
        totalHours += Number(item.duration) || 0;
      }

      result.push({
        depotId: depot.ID,
        mechanicHours,
        totalImpact: bestVehicles.totalImpact || 0,
        totalHours,
        selectedVehicles: bestVehicles.selectedVehicles || [],
      });
    }

    return result;

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

   
    await Log(
      "backend",
      "error",
      "service",
      "vehicle scheduling failed"
    );

    throw error;
  }
};

module.exports = getVehicleData;
