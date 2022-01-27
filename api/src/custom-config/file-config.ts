import * as fs from 'fs';

export class FileConfig {
  protected secretReader(pathOrVariable: string): string {
    try {
      return fs.readFileSync(pathOrVariable, 'utf8').trim();
    } catch (e) {
      return pathOrVariable;
    }
  }
}
