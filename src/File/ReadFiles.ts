import fs from "fs";

export default async function ReadFiles(dirPath: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(files);
      }
    });
  });
}
