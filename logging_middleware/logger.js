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
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZGl0aS4yMzAxMDIwMDVAaWlpdGJoLmFjLmluIiwiZXhwIjoxNzc4NzQzMzkzLCJpYXQiOjE3Nzg3NDI0OTMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2ZjNkNTRiZC1hMmI5LTRjMGMtODlhMi0yMzEzNTEzZmJkZGYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhZGl0aSBzaW5naCIsInN1YiI6IjM4MGJhMmVhLWE3YmQtNGRlNi04MzAyLWUyNzU0NDQzMTU5ZiJ9LCJlbWFpbCI6ImFkaXRpLjIzMDEwMjAwNUBpaWl0YmguYWMuaW4iLCJuYW1lIjoiYWRpdGkgc2luZ2giLCJyb2xsTm8iOiIyMzAxMDIwMDUiLCJhY2Nlc3NDb2RlIjoiTmJRVGJUIiwiY2xpZW50SUQiOiIzODBiYTJlYS1hN2JkLTRkZTYtODMwMi1lMjc1NDQ0MzE1OWYiLCJjbGllbnRTZWNyZXQiOiJrbXZzdnBTV3l0S25KR2NOIn0.eLJHjfXIV3XcmBY56uoZ9gomCF-VvALrFlZmQQQMEjw`
        },
      }

    )

  } catch (error) {

    console.log(error.message)

  }

}

module.exports = Log

