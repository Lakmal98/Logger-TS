import * as fs from "fs";

export class Logger {
  private file: string;
  private name: string;

  constructor({
    name = "log",
    file = "logs.log",
  }: { name?: string; file?: string } = {}) {
    this.file = file;
    this.name = name;
  }

  private write({ message, type }: { message: string; type: string }): void {
    fs.appendFile(
      this.file,
      `${this.getTimeStamp()} [${type}] [${this.name}] >> ${message}\n`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  private getTimeStamp(): string {
    return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  }

  public error(message: string): void {
    this.write({ message, type: "Error  " });
  }

  public info(message: string): void {
    this.write({ message, type: "Info   " });
  }

  public debug(message: string): void {
    this.write({ message, type: "Debug  " });
  }

  public success(message: string): void {
    this.write({ message, type: "Success" });
  }

  public fatal(message: string): void {
    this.write({ message, type: "Fatal  " });
  }
}
