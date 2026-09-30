import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Link, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props { title?: string; url?: string; name?: string }

const enc = encodeURIComponent

const PostLiveEmail = ({ title = 'Your article', url = 'https://webgramitsolution.com', name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your article is now live on Webgram</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Your article is live! 🎉</Heading>
        <Text style={text}>{name ? `Hi ${name},` : 'Hi,'} your guest article <strong>“{title}”</strong> has passed review and is now published on the Webgram blog.</Text>
        <Button style={button} href={url}>Read your article</Button>
        <Text style={text}>Share it and earn 10 credits per platform (once a day on each):</Text>
        <Text style={links}>
          <Link href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}>Facebook</Link>{'  ·  '}
          <Link href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`}>X</Link>{'  ·  '}
          <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}>LinkedIn</Link>{'  ·  '}
          <Link href={`https://wa.me/?text=${enc(title + ' ' + url)}`}>WhatsApp</Link>
        </Text>
        <Text style={footer}>To earn share credits, use the share buttons on the article while signed in. — Webgram IT Solution</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PostLiveEmail,
  subject: (d: Record<string, any>) => `Your article “${d.title ?? 'article'}” is live`,
  displayName: 'Guest article live',
  previewData: { title: 'How to Grow Your Online Store', url: 'https://homepage-replica-magic.lovable.app/blog/example', name: 'Priya' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Manrope, Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#0b1f3a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 18px' }
const links = { fontSize: '14px', margin: '0 0 18px' }
const button = { backgroundColor: '#f5b820', color: '#0b1f3a', fontSize: '14px', fontWeight: 'bold' as const, borderRadius: '6px', padding: '12px 22px', textDecoration: 'none', display: 'inline-block', margin: '0 0 22px' }
const footer = { fontSize: '12px', color: '#999999', margin: '24px 0 0' }
