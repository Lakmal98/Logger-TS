import * as fs from "fs";

export class Logger {
  private file: string;
  private name: string;

  constructor(name: string = "log", file: string = "logs.log") {
    this.file = file;
    this.name = name;
  }

  private write(message: string) {
    fs.appendFile(
      this.file,
      `${this.getDate()} [${this.name}] => ${message}\n`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  private getDate() {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  public log(message: string) {
    this.write(message);
  }
}
