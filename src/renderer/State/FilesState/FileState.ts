export default interface FileState {
  files: FileInfo[];
}

export interface FileInfo {
  isDirectory: boolean;
  name: string;
  path: string;
  children?: FileInfo[];
}
