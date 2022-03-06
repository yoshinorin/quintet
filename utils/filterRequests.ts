import { isMatch } from 'micromatch';
import { filterRequestPaths } from '../config';

export function isIgnoreRequest(path: string) {
  return isMatch(path, filterRequestPaths);
}
