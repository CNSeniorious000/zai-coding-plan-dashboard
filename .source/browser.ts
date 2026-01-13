// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"api-reference.mdx": () => import("../content/docs/api-reference.mdx?collection=docs"), "faq.mdx": () => import("../content/docs/faq.mdx?collection=docs"), "getting-started.mdx": () => import("../content/docs/getting-started.mdx?collection=docs"), "getting-started.zh-CN.mdx": () => import("../content/docs/getting-started.zh-CN.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "index.zh-CN.mdx": () => import("../content/docs/index.zh-CN.mdx?collection=docs"), }),
};
export default browserCollections;