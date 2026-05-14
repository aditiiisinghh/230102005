const axios = require("axios")

const Log = async (
  stack,
  level,
  packageName,
  message
) => {

  try {

    await axios.post(

      "https://4.224.186.213/evaluation-service/logs",

      {
        stack,
        level,
        package: packageName,
        message,
      },

      {
        headers: {
          Authorization:
            `Bearer MY_Token  },
      }

    )

  } catch (error) {

    console.log(error.message)

  }

}

module.exports = Log

