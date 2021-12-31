import { ExternalResources } from '../types/externalResource';
import { ScriptTag } from '../types/scriptTag';

// TODO: write test code
export function getScriptTags(externalResources: Array<ExternalResources>, externalResourcesConfig: Array<any>): Array<ScriptTag> {
  let scriptTags: Array<ScriptTag> = [];

  // TODO: fix nested loop
  externalResources.forEach(ers => {
    ers.values.forEach(er => {
      const config = externalResourcesConfig.filter(x => x.key == er)[0];
      if (config) {
        config.inject.forEach(i => {
          scriptTags.push({
            async: i.async,
            type: i.type,
            src: i.src,
            code: i.code
          });
        });
      };
    });
  });
  return scriptTags;
}
