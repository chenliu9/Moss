import { notFound } from 'next/navigation'
import { Chat } from '@/components/chat'
import { getSharedChat } from '@/lib/actions/chat'
import { AI } from '@/app/actions'
import WeixinShareWrapper from '@/components/weixin-share-wrapper'
import { headers } from 'next/headers'

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
    'Moss - 动态、复杂、高维数据的智能分析'

  const description =
    chat.messages[0].content ||
    '基于先进的数据+AI一体化引擎，赋能企业对运营生产动态的实时监控与掌握，实现生产经营的降本增益！'

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

  const headersList = headers()
  const domain = headersList.get('host') || ''

  return (
    <AI
      initialAIState={{
        chatId: chat.id,
        messages: chat.messages,
        isSharePage: true
      }}
    >
      <WeixinShareWrapper
        url={domain + '/share/' + params.id}
        title={
          chat?.title.toString().slice(0, 50) ||
          'Moss - 动态、复杂、高维数据的智能分析'
        }
        desc={
          chat?.messages[0].content ||
          '基于先进的数据+AI一体化引擎，赋能企业对运营生产动态的实时监控与掌握，实现生产经营的降本增益！'
        }
        imgUrl={domain + '/opengraph-image.png'}
      />
      <Chat id={params.id} />
    </AI>
  )
}
