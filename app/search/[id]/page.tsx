import { notFound, redirect } from 'next/navigation'
import { Chat } from '@/components/chat'
import { getChat } from '@/lib/actions/chat'
import { AI } from '@/app/actions'
import WeixinShareWrapper from '@/components/weixin-share-wrapper'

export const maxDuration = 60

export interface SearchPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SearchPageProps) {
  const chat = await getChat(params.id, 'anonymous')
  const title =
    chat?.title.toString().slice(0, 50) ||
    'InsightAI - 数据驱动与AI赋能的分析决策'
  const answer = chat?.messages.find(message => message.type === 'answer')
  const description =
    answer?.content ||
    '适用跨行业、跨领域的智能分析，赋能实时、动态、高维数据驱动的智能决策！'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: title,
      type: 'website',
      images: [
        {
          url: `/opengraph-image.png`, // Must be an absolute URL
          width: 512,
          height: 512,
          alt: 'InsightAI'
        }
      ]
    }
  }
}

export default async function SearchPage({ params }: SearchPageProps) {
  const userId = 'anonymous'
  const chat = await getChat(params.id, userId)
  const answer = chat?.messages.find(message => message.type === 'answer')
  const description =
    answer?.content ||
    '适用跨行业、跨领域的智能分析，赋能实时、动态、高维数据驱动的智能决策！'

  if (!chat) {
    redirect('/')
  }

  if (chat?.userId !== userId) {
    notFound()
  }

  return (
    <AI
      initialAIState={{
        chatId: chat.id,
        messages: chat.messages
      }}
    >
      <WeixinShareWrapper
        url={'https://demo.txz.tech/search/' + params.id}
        title={
          chat?.title.toString().slice(0, 50) || 'InsightAI - er of Data and AI'
        }
        desc={description}
        imgUrl={'https://demo.txz.tech/opengraph-image.png'}
      />
      <Chat id={params.id} />
    </AI>
  )
}
