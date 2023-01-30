import * as fs from 'fs'

export class Logger {
  private readonly file: string
  private readonly name: string

  constructor (name: string = 'log', file: string = 'logs.log') {
    this.file = file
    this.name = name
  }

  private write ({ message, type }: { message: string, type: string }): void {
    fs.appendFile(
      this.file,
      `${this.getTimeStamp()} [${type}] [${this.name}] >> ${message}\n`,
      (err) => {
        if (err != null) {
          console.log(err)
        }
      }
    )
  }

  private getTimeStamp (): string {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  }

  public error (message: string): void {
    this.write({ message, type: 'Error  ' })
  }

  public info (message: string): void {
    this.write({ message, type: 'Info   ' })
  }

  public debug (message: string): void {
    this.write({ message, type: 'Debug  ' })
  }

  public success (message: string): void {
    this.write({ message, type: 'Success' })
  }

  public fatal (message: string): void {
    this.write({ message, type: 'Fatal  ' })
  }

  // append custom message to the log file
  public append (message: string): void {
    fs.appendFile(this.file, message, (err) => {
      if (err != null) {
        console.log(err)
      }
    })
  }
}
