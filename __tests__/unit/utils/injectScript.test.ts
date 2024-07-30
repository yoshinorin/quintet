import { expect, test } from "vitest";
import { ExternalResources } from "../../../src/models/externalResource";
import { InjectScript } from "../../../src/models/script";
import { getScripts } from "../../../src/utils/injectScript";

test("should return an empty array when externalResources is empty", () => {
  const externalResources: Array<ExternalResources> = [];
  const externalResourcesConfig: Array<any> = [];
  const result = getScripts(externalResources, externalResourcesConfig);

  expect(result).toEqual([]);
});

test("should return an empty array when no JavaScript resources are found", () => {
  const externalResources: Array<ExternalResources> = [
    { kind: "css", values: ["style.css"] },
    { kind: "js", values: ["example.js"] }
  ];
  const externalResourcesConfig: Array<any> = [];
  const result = getScripts(externalResources, externalResourcesConfig);

  expect(result).toEqual([]);
});

test("should return an array of InjectScript objects when JavaScript resources are found", () => {
  const externalResources: Array<ExternalResources> = [
    { kind: "js", values: ["script1.js", "script2.js"] }
  ];
  const externalResourcesConfig: Array<any> = [
    {
      key: "script1.js",
      async: true,
      src: "https://example.com/script1.js",
      code: {
        type: "inline",
        onLoad: true,
        code: "console.log('Script 1 loaded');"
      }
    },
    {
      key: "script2.js",
      async: false,
      src: "https://example.com/script2.js",
      code: {
        type: "external",
        onLoad: false,
        code: ""
      }
    }
  ];
  const result = getScripts(externalResources, externalResourcesConfig);
  const expected: Array<InjectScript> = [
    {
      key: "script1.js",
      async: true,
      src: "https://example.com/script1.js",
      code: {
        type: "inline",
        onLoad: true,
        code: "console.log('Script 1 loaded');"
      }
    },
    {
      key: "script2.js",
      async: false,
      src: "https://example.com/script2.js",
      code: {
        type: "external",
        onLoad: false,
        code: ""
      }
    }
  ];

  expect(result).toEqual(expected);
});
