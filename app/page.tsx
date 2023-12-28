import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  const InfoCard = ( // 主窗口的预置内容,仅仅起说明,所以先删了
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
      Placeholder...
    </div>
  );
  return (
    <ChatWindow
      endpoint="api/chat"
      emoji="🏴‍☠️"
      titleText="Patchy the Chatty Pirate"
      placeholder="I'm an LLM pretending to be a pirate! Ask me about the pirate life!"
      emptyStateComponent={InfoCard}
    ></ChatWindow> // 主窗口,所有对话类型都使用此组件,除去传参不同外,endpoint用于与同级api目录下实现的route.ts后端api进行逻辑交互; layout.tsx包裹本page.tsx以及同级其他目录下的page.tsx组件,分别渲染成浏览器上看到的页面
  );
}
