# 🦜️🔗 LangChain + Next.js Starter Template

## 之前只是在某些岗位描述里见过langchain相关描述，最先以为是跟区块链相关，后来初步了解是跟AI相关。机器学习方向好点儿的职位，在面试上我觉得应该很侧重理论推导，例如数学公式那些。虽然我早在17年的时候，在弄爬虫验证码的那时也入门过tensorflow框架(pytorch那时才刚出来)，一些机器学习理论书籍也看过部分，发现需要数学以及统计的基础很好，比如当时卡在svm里的对偶函数那里。虽然我自认工程实践方面还可以，但是要在此方向上得到好点儿的职位，恐怕有些难，当时也有硕士博士在相关岗位上，发觉他们的产出也不怎么好，科班出生的人都不怎么干得好，更何况半路出家的呢，所以那时以后就没去侧重于机器学习方向。

## 最近一年chatgpt忽然变成了话题，公司里也有人在弄(薅api玩，自身业务停滞，上窜下跳，叶公好龙，反感)。我的初步认识是一个更方便智能的搜索引擎，目前还没看到有什么可以形成长期稳定,能商业闭环的项目(即便有，也会很快面临同质化竞争)，商业上也应该是短期项目挣快钱，所以就变成了有好点子且快速交付项目，比的是工程上的集成能力，侧重fullstack，就比较贴合我已有的技术栈。

## 看了一些langchain的文档，都是python的，也是准备后端用python的,但ipython测试的时候chroma的sqlite3版本不满足,pysqlite3-binary也没起作用(后证实chroma的解决方案可行),分析了报错的代码,安装google.colab也无效,重新用源码编译了也不能解决，(开发桌面是deepin 20.9,它的最新sqlite3库比chroma要求的3.35.0低,也不想去升级到测试版系统),想来还是前后端用统一typescript,好编写调试些，后端准备用nestjs来写，后面想来也没必要，整个用nextjs来弄写，一个工程更方便。去看了langchainjs的文档和一些资料，发现langchain-ai里本就有这个方案的模板，考虑到自己对这些库的使用也不一定很熟悉，到时耗时间去调试修改代码，没时间去理解实现功能，所以就直接基于模板库改，完成了再细看一遍代码就行。

## 模板代码运行了下，发出prompt请求后，发现报错`Module not found: Package path ./utils/chunk_array is not exported from package`，@langchain+openai的代码库中issue里也没找到相关解决方案，把@langchain往前往后改版本也不行，在changelogs里看到最近一周确实有`chunk_array`相关的改动，后来根据报错路径在node_module里的代码上排查，确实没有相应的代码实现，继续排查版本信息，应该是@langchain/core库在package.json中被固定了，更新到最新版本，访问报错排除。然后就是代理问题(在ipython里做测试也遇到这种情况)，但是pnpm加all_proxy环境变量无法生效，OPENAI_API_KEY的添加方式也不行，后面使用proxychains去处理的代理问题,域名解析报错,排除了proxychains的dns代理,但搭建本地chroma时,报`Error: Chroma getOrCreateCollection error: Error: TypeError: fetch failed`,排查为proxychains未代理时未排除本地局域网网段,导致127.0.0.1请求到了代理服务器,访问远端的对应端口报错.

## 余下的是根据项目要求和已有的模板代码，该精简的精简,该加的加，该理解的理解,该注释的注释。

### 将模板中使用的远程superbase改为本地的chroma,修复了模板的rag功能,除了Agents项需要第三方SearchApi Loader或SerpAPI Loader没有本地化替代外,其他项都可用;本想将Chat项的history放在了chroma里,先不作用户甄别,每次点开页面都有历史,但测试了些代码发现用不了,所以用了pouchdb-browser,直接保存在客户端浏览器中,仅针对Chat项有效,有对话时刷新可以看见效果

## 总结就是有分析解决突现问题的能力,还需熟悉使用相关库,项目开发速度就快.(期间绕了些路,后端用不太熟悉的node替换python,本可以参考python的资料直接python写，用node还得重新看相关库的node实现部分的api文档)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/langchain-ai/langchain-nextjs-template)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flangchain-ai%2Flangchain-nextjs-template)

This template scaffolds a LangChain.js + Next.js starter app. It showcases how to use and combine LangChain modules for several
use cases. Specifically:

- [Simple chat](/app/api/chat/route.ts)
- [Returning structured output from an LLM call](/app/api/chat/structured_output/route.ts)
- [Answering complex, multi-step questions with agents](/app/api/chat/agents/route.ts)
- [Retrieval augmented generation (RAG) with a chain and a vector store](/app/api/chat/retrieval/route.ts)
- [Retrieval augmented generation (RAG) with an agent and a vector store](/app/api/chat/retrieval_agents/route.ts)

Most of them use Vercel's [AI SDK](https://github.com/vercel-labs/ai) to stream tokens to the client and display the incoming messages.

![Demo GIF](/public/images/agent-convo.gif)

You can check out a hosted version of this repo here: https://langchain-nextjs-template.vercel.app/

## 🚀 Getting Started

First, clone this repo and download it locally.

Next, you'll need to set up environment variables in your repo's `.env.local` file. Copy the `.env.example` file to `.env.local`.
To start with the basic examples, you'll just need to add your OpenAI API key.

Next, install the required packages using your preferred package manager (e.g. `yarn`).

Now you're ready to run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result! Ask the bot something and you'll see a streamed response:

![A streaming conversation between the user and the AI](/public/images/chat-conversation.png)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Backend logic lives in `app/api/chat/route.ts`. From here, you can change the prompt and model, or add other modules and logic.

## 🧱 Structured Output

The second example shows how to have a model return output according to a specific schema using OpenAI Functions.
Click the `Structured Output` link in the navbar to try it out:

![A streaming conversation between the user and an AI agent](/public/images/structured-output-conversation.png)

The chain in this example uses a [popular library called Zod](https://zod.dev) to construct a schema, then formats it in the way OpenAI expects.
It then passes that schema as a function into OpenAI and passes a `function_call` parameter to force OpenAI to return arguments in the specified format.

For more details, [check out this documentation page](https://js.langchain.com/docs/modules/chains/popular/structured_output).

## 🦜 Agents

To try out the agent example, you'll need to give the agent access to the internet by populating the `SERPAPI_API_KEY` in `.env.local`.
Head over to [the SERP API website](https://serpapi.com/) and get an API key if you don't already have one.

You can then click the `Agent` example and try asking it more complex questions:

![A streaming conversation between the user and an AI agent](/public/images/agent-conversation.png)

This example uses the OpenAI Functions agent, but there are a few other options you can try as well.
See [this documentation page for more details](https://js.langchain.com/docs/modules/agents/agent_types/).

## 🐶 Retrieval

The retrieval examples both use Supabase as a vector store. However, you can swap in
[another supported vector store](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/) if preferred by changing
the code under `app/api/retrieval/ingest/route.ts`, `app/api/chat/retrieval/route.ts`, and `app/api/chat/retrieval_agents/route.ts`.

For Supabase, follow [these instructions](https://js.langchain.com/docs/modules/data_connection/vectorstores/integrations/supabase) to set up your
database, then get your database URL and private key and paste them into `.env.local`.

You can then switch to the `Retrieval` and `Retrieval Agent` examples. The default document text is pulled from the LangChain.js retrieval
use case docs, but you can change them to whatever text you'd like.

For a given text, you'll only need to press `Upload` once. Pressing it again will re-ingest the docs, resulting in duplicates.
You can clear your Supabase vector store by navigating to the console and running `DELETE FROM docuemnts;`.

After splitting, embedding, and uploading some text, you're ready to ask questions!

![A streaming conversation between the user and an AI retrieval chain](/public/images/retrieval-chain-conversation.png)

![A streaming conversation between the user and an AI retrieval agent](/public/images/retrieval-agent-conversation.png)

For more info on retrieval chains, [see this page](https://js.langchain.com/docs/use_cases/question_answering/).
The specific variant of the conversational retrieval chain used here is composed using LangChain Expression Language, which you can
[read more about here](https://js.langchain.com/docs/guides/expression_language/cookbook). This chain example will also return cited sources
via header in addition to the streaming response.

For more info on retrieval agents, [see this page](https://js.langchain.com/docs/use_cases/question_answering/conversational_retrieval_agents).

## 📚 Learn More

The example chains in the `app/api/chat/route.ts` and `app/api/chat/retrieval/route.ts` files use
[LangChain Expression Language](https://js.langchain.com/docs/guides/expression_language/interface) to
compose different LangChain modules together. You can integrate other retrievers, agents, preconfigured chains, and more too, though keep in mind
`BytesOutputParser` is meant to be used directly with model output.

To learn more about what you can do with LangChain.js, check out the docs here:

- https://js.langchain.com/docs/

## ▲ Deploy on Vercel

When ready, you can deploy your app on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Thank You!

Thanks for reading! If you have any questions or comments, reach out to us on Twitter
[@LangChainAI](https://twitter.com/langchainai), or [click here to join our Discord server](https://discord.gg/langchain).
