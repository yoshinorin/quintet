import { ExternalResources } from '../models/externalResource';
import { ScriptCode, ScriptSrc } from '../models/script';

// TODO: write test code
export function getScriptTags(externalResources: Array<ExternalResources>, externalResourcesConfig: Array<any>): Array<ScriptSrc> {
  let scriptTags: Array<ScriptSrc> = [];

  // TODO: fix nested loop
  externalResources.forEach(ers => {
    ers.values.forEach(er => {
      const config = externalResourcesConfig.map(x => { return x['src'] }).filter(y => y.key == er);
      if (config) {
        config.forEach(i => {
          scriptTags.push({
            key: i.key,
            async: i.async,
            src: i.src
          });
        });
      };
    });
  });
  return scriptTags;
}


// TODO: write test code
export function getScriptCodes(externalResources: Array<ExternalResources>, externalResourcesConfig: Array<any>): Array<ScriptCode> {
  let scriptCodes: Array<ScriptCode> = [];

  // TODO: fix nested loop
  externalResources.forEach(ers => {
    ers.values.forEach(er => {
      const config = externalResourcesConfig.map(x => { return x['code'] }).filter(y => y.key == er);
      if (config) {
        config.forEach(i => {
          scriptCodes.push({
            key: i.key,
            async: i.async,
            type: i.type,
            code: i.code
          });
        });
      };
    });
  });
  return scriptCodes;
}
