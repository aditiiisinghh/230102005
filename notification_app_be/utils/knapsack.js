function selectVehicles(vehicles, maxHours) {

   const n = vehicles.length

   const dp = Array(n + 1)
      .fill(null)
      .map(() => Array(maxHours + 1).fill(0))

   for (let i = 1; i <= n; i++) {

      const vehicle = vehicles[i - 1]

      for (let hrs = 0; hrs <= maxHours; hrs++) {

         if (vehicle.duration <= hrs) {

            const takeVehicle =
               vehicle.impact +
               dp[i - 1][hrs - vehicle.duration]

            const skipVehicle = dp[i - 1][hrs]

            dp[i][hrs] =
               takeVehicle > skipVehicle
                  ? takeVehicle
                  : skipVehicle

         } else {

            dp[i][hrs] = dp[i - 1][hrs]
         }
      }
   }

   let remainingHours = maxHours

   const selected = []

   for (let i = n; i > 0; i--) {

      if (dp[i][remainingHours] !== dp[i - 1][remainingHours]) {

         selected.push(vehicles[i - 1])

         remainingHours -= vehicles[i - 1].duration
      }
   }

   return {
      selectedVehicles: selected,
      totalImpact: dp[n][maxHours]
   }
}

module.exports = selectVehicles