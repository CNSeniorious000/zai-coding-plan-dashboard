// @ts-nocheck
import * as __fd_glob_26 from "../content/docs/index.zh-CN.mdx?collection=docs"
import * as __fd_glob_25 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_24 from "../content/docs/index.ko.mdx?collection=docs"
import * as __fd_glob_23 from "../content/docs/index.ja.mdx?collection=docs"
import * as __fd_glob_22 from "../content/docs/index.fr.mdx?collection=docs"
import * as __fd_glob_21 from "../content/docs/index.es.mdx?collection=docs"
import * as __fd_glob_20 from "../content/docs/index.de.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/getting-started.zh-CN.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/getting-started.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/getting-started.ko.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/getting-started.ja.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/getting-started.fr.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/getting-started.es.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/getting-started.de.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/faq.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/faq.ko.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/faq.ja.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/faq.fr.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/faq.es.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/faq.de.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/api-reference.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/api-reference.ko.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/api-reference.ja.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/api-reference.fr.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/api-reference.es.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/api-reference.de.mdx?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, }, {"api-reference.de.mdx": __fd_glob_1, "api-reference.es.mdx": __fd_glob_2, "api-reference.fr.mdx": __fd_glob_3, "api-reference.ja.mdx": __fd_glob_4, "api-reference.ko.mdx": __fd_glob_5, "api-reference.mdx": __fd_glob_6, "faq.de.mdx": __fd_glob_7, "faq.es.mdx": __fd_glob_8, "faq.fr.mdx": __fd_glob_9, "faq.ja.mdx": __fd_glob_10, "faq.ko.mdx": __fd_glob_11, "faq.mdx": __fd_glob_12, "getting-started.de.mdx": __fd_glob_13, "getting-started.es.mdx": __fd_glob_14, "getting-started.fr.mdx": __fd_glob_15, "getting-started.ja.mdx": __fd_glob_16, "getting-started.ko.mdx": __fd_glob_17, "getting-started.mdx": __fd_glob_18, "getting-started.zh-CN.mdx": __fd_glob_19, "index.de.mdx": __fd_glob_20, "index.es.mdx": __fd_glob_21, "index.fr.mdx": __fd_glob_22, "index.ja.mdx": __fd_glob_23, "index.ko.mdx": __fd_glob_24, "index.mdx": __fd_glob_25, "index.zh-CN.mdx": __fd_glob_26, });