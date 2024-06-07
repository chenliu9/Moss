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

const defaultTitle = process.env.Metadata_Title || ''
const defaultDesc = process.env.Metadata_Description || ''
const metadataBaseUrl = process.env.Metadata_URL || ''

export async function generateMetadata({ params }: SearchPageProps) {
  const chat = await getChat(params.id, 'anonymous')
  const title = chat?.title.toString().slice(0, 50) || defaultTitle
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
          url: `${metadataBaseUrl}/opengraph-image.png`, // Must be an absolute URL
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
        url={metadataBaseUrl + '/search/' + params.id}
        title={chat?.title.toString().slice(0, 50) || defaultTitle}
        desc={answer?.content || defaultDesc}
        imgUrl={`${metadataBaseUrl}/opengraph-image.png`}
      />
      <Chat id={params.id} />
    </AI>
  )
}
