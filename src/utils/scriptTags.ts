import {
  ExternalResources,
  InjectScript
} from '../models/models';

// TODO: write test code
export function getScripts(externalResources: Array<ExternalResources>, externalResourcesConfig: Array<any>): Array<InjectScript> {
  let scriptTags: Array<InjectScript> = [];

  // TODO: fix nested loop
  externalResources.filter(x => { return x.kind === 'js' }).forEach(ers => {
    ers.values.forEach(er => {
      const config = externalResourcesConfig.filter(y => { return y.key == er });
      if (config) {
        config.forEach(i => {
          // @ts-ignore
          scriptTags.push({
            key: i.key,
            async: i.async,
            src: i.src,
            code: {
              type: i['code'].type,
              onLoad: i['code'].onLoad,
              code: i['code'].code
            }
          });
        });
      };
    });
  });
  return scriptTags;
}
