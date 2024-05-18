import { notFound } from 'next/navigation'
import { Chat } from '@/components/chat'
import { getSharedChat } from '@/lib/actions/chat'
import { AI } from '@/app/actions'
import WeixinShareWrapper from '@/components/weixin-share-wrapper'

export interface SharePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: SharePageProps) {
  const chat = await getSharedChat(params.id)

  if (!chat || !chat.sharePath) {
    return notFound()
  }

  const title =
    chat.title.toString().slice(0, 50) ||
    'Moss - Unleash the Power of Data and AI'

  const description =
    '原生态的跨行业、跨领域的大数据与大模型分析引擎，实现动态、复杂、高维数据的智能分析与汇总！'

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
          alt: 'Moss'
        }
      ]
    }
  }
}

export default async function SharePage({ params }: SharePageProps) {
  const chat = await getSharedChat(params.id)

  if (!chat || !chat.sharePath) {
    notFound()
  }

  return (
    <AI
      initialAIState={{
        chatId: chat.id,
        messages: chat.messages,
        isSharePage: true
      }}
    >
      <WeixinShareWrapper
        url={'https://demo.txz.tech/share/' + params.id}
        title={
          chat?.title.toString().slice(0, 50) ||
          'Moss - Unleash the Power of Data and AI'
        }
        desc={
          '原生态的跨行业、跨领域的大数据与大模型分析引擎，实现动态、复杂、高维数据的智能分析与汇总！'
        }
        imgUrl={'https://demo.txz.tech/opengraph-image.png'}
      />
      <Chat id={params.id} />
    </AI>
  )
}
