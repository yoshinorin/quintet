import { isMatch as _isMatch } from 'micromatch';
import { filterRequestPaths } from '../../config';

export function isMatch(path: string) {
  if (!path || !filterRequestPaths || filterRequestPaths.length == 0) {
    return false;
  }
  return _isMatch(path, filterRequestPaths);
}
