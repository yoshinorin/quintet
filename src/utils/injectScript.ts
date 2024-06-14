import { ExternalResources } from "../models/externalResource";
import { InjectScript } from "../models/script";

// TODO: write test code
export function getScripts(
  externalResources: Array<ExternalResources>,
  externalResourcesConfig: Array<any>
): Array<InjectScript> {
  let injectScript: Array<InjectScript> = [];

  // TODO: fix nested loop
  externalResources
    .filter((x) => {
      return x.kind === "js";
    })
    .forEach((ers) => {
      ers.values.forEach((er) => {
        const config = externalResourcesConfig.filter((y) => {
          return y.key == er;
        });
        if (config) {
          config.forEach((i) => {
            // @ts-ignore
            injectScript.push({
              key: i.key,
              async: i.async,
              src: i.src,
              code: {
                type: i["code"].type,
                onLoad: i["code"].onLoad,
                code: i["code"].code
              }
            });
          });
        }
      });
    });
  return injectScript;
}
