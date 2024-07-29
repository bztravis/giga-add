class Logger {
  logError(message, error) {
    console.error(message)
    // console.error(error)

    process.exit()
  }

  logFinalMessage(message) {
    console.log(message)
    process.exit()
  }
}

export const logger = new Logger()
