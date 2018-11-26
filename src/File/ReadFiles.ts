import fs from "fs";

export default async function ReadFiles(dirPath: string, filterTest?: RegExp) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      } else if (filterTest) {
        resolve(files.filter(files => filterTest.test(files)));
      } else {
        resolve(files);
      }
    });
  });
}
