const axios = require("axios");
const https = require("https");

const selectVehicles = require("../utils/knapsack");
const Log = require("../../logging_middleware/logger");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZGl0aS4yMzAxMDIwMDVAaWlpdGJoLmFjLmluIiwiZXhwIjoxNzc4NzQ2NjUyLCJpYXQiOjE3Nzg3NDU3NTIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIyNWYzOTBlNC1iNjc4LTQ1MmEtYTZhOS0zZjI1MzRjOWY5Y2QiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhZGl0aSBzaW5naCIsInN1YiI6IjM4MGJhMmVhLWE3YmQtNGRlNi04MzAyLWUyNzU0NDQzMTU5ZiJ9LCJlbWFpbCI6ImFkaXRpLjIzMDEwMjAwNUBpaWl0YmguYWMuaW4iLCJuYW1lIjoiYWRpdGkgc2luZ2giLCJyb2xsTm8iOiIyMzAxMDIwMDUiLCJhY2Nlc3NDb2RlIjoiTmJRVGJUIiwiY2xpZW50SUQiOiIzODBiYTJlYS1hN2JkLTRkZTYtODMwMi1lMjc1NDQ0MzE1OWYiLCJjbGllbnRTZWNyZXQiOiJrbXZzdnBTV3l0S25KR2NOIn0.Wwg_CwqMKqiu0I479Moq_APtEvt4AHLqjnWmClcoo3Q";

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