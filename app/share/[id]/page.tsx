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

const defaultTitle = process.env.Metadata_Title || ''
const defaultDesc = process.env.Metadata_Description || ''
const metadataBaseUrl = process.env.Metadata_URL || ''

export async function generateMetadata({ params }: SharePageProps) {
  const chat = await getSharedChat(params.id)

  if (!chat || !chat.sharePath) {
    return notFound()
  }

  const title = chat.title.toString().slice(0, 50) || defaultTitle
  const answer = chat?.messages.find(message => message.type === 'answer')
  const description = answer?.content || defaultDesc

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

export default async function SharePage({ params }: SharePageProps) {
  const chat = await getSharedChat(params.id)
  const answer = chat?.messages.find(message => message.type === 'answer')
  const description = answer?.content || defaultDesc

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
        url={metadataBaseUrl + '/share/' + params.id}
        title={chat?.title.toString().slice(0, 50) || defaultTitle}
        desc={description}
        imgUrl={`${metadataBaseUrl}/opengraph-image.png`}
      />
      <Chat id={params.id} />
    </AI>
  )
}
