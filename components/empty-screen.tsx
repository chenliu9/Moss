import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: 'GPT-4o的特点包括哪些?',
    message: 'GPT-4o的特点包括哪些?'
  },
  {
    heading: '国有企业转让资产，交易价款是否允许分期支付？',
    message: '国有企业转让资产，交易价款是否允许分期支付？'
  },
  {
    heading: '总结：https://www.gov.cn/zhengce/2022-01/12/content_5718608.htm',
    message: '总结：https://www.gov.cn/zhengce/2022-01/12/content_5718608.htm'
  },
  {
    heading:
      '如果一个邮政工作人员私自开拆了一个邮件，但只是为了查看其中的收件人地址，而并未泄露邮件内容，是否构成什么罪行？',
    message:
      '如果一个邮政工作人员私自开拆了一个邮件，但只是为了查看其中的收件人地址，而并未泄露邮件内容，是否构成什么罪行？'
  },
  {
    heading: '施工方超过国家规定标准排放噪声，是否应当承担责任?',
    message: '施工方超过国家规定标准排放噪声，是否应当承担责任?'
  },
  {
    heading: '总结：https://mp.weixin.qq.com/s/aikDRG4x08sI9Pg4tkyaZQ',
    message: '总结：https://mp.weixin.qq.com/s/aikDRG4x08sI9Pg4tkyaZQ'
  }
]
export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight
                size={16}
                className="mr-2 text-muted-foreground min-w-fit"
              />
              <div className="text-left text-wrap">{message.heading}</div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
