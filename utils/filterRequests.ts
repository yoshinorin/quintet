import { isMatch } from 'micromatch';
import { filterRequestPaths } from '../config';

export function isIgnoreRequest(path: string) {
  if (!path || filterRequestPaths.length == 0) {
    return false;
  }
  return isMatch(path, filterRequestPaths);
}
