import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import type { WelcomeNewsletterEmailProps } from '@/types'

export function WelcomeNewsletterEmail({ subscriberEmail }: WelcomeNewsletterEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        You're in. NutriLoop Africa updates will land in your inbox.
      </Preview>
      <Tailwind>
        <Body className="bg-[#F5F7F2] font-sans">
          <Container className="mx-auto max-w-[600px] bg-white">
            {/* Header */}
            <Section className="bg-[#0A1A0A] px-8 py-10 text-center">
              <Heading className="m-0 text-3xl font-semibold text-white">
                NutriLoop Africa
              </Heading>
              <Text className="m-0 mt-2 text-sm text-[#81C784]">
                Closing the loop on Kenya's food system
              </Text>
            </Section>

            {/* Hero stat strip */}
            <Section className="bg-[#2E7D32] px-8 py-5">
              <Text className="m-0 text-center text-sm text-[#C8E6C9]">
                <span className="font-mono font-semibold text-white">22,000+ tonnes</span> of waste
                Kenya generates daily ·{' '}
                <span className="font-mono font-semibold text-white">60%</span> of feed is imported
                · <span className="font-mono font-semibold text-white">14 days</span> to fix both
              </Text>
            </Section>

            {/* Body */}
            <Section className="px-8 py-10">
              <Heading className="mb-2 mt-0 text-2xl font-semibold text-[#0A1A0A]">
                You're in.
              </Heading>

              <Text className="text-base leading-relaxed text-[#374151]">
                Thank you for subscribing to NutriLoop Africa updates. We'll send you
                milestone announcements, impact data, and insights on BSF science and Kenya's
                circular economy — no spam, no noise.
              </Text>

              <Text className="text-base leading-relaxed text-[#374151]">
                In the meantime, here's what we're building:
              </Text>

              {/* 3 value bullets */}
              <Section className="mt-2">
                {[
                  {
                    icon: '♻️',
                    text: 'Collecting organic waste from Nairobi\'s hotels, markets, and food businesses — for free, every morning.',
                  },
                  {
                    icon: '🪲',
                    text: 'Converting it into 40–55% protein Black Soldier Fly meal that replaces imported soybean for Kenyan farmers.',
                  },
                  {
                    icon: '🌱',
                    text: 'Producing frass fertiliser that restores soil health for smallholder farmers across Kenya.',
                  },
                ].map(({ icon, text }) => (
                  <Section key={icon} className="mb-3 rounded-lg bg-[#F5F7F2] px-5 py-4">
                    <Text className="m-0 text-sm leading-relaxed text-[#374151]">
                      <span className="mr-2">{icon}</span>
                      {text}
                    </Text>
                  </Section>
                ))}
              </Section>

              <Hr className="my-6 border-[#E5E7EB]" />

              <Text className="text-sm leading-relaxed text-[#6B7280]">
                Want to be more involved? Visit{' '}
                <Link href="https://nutriloopAfrica.com/apply" className="text-[#2E7D32]">
                  nutriloopAfrica.com/apply
                </Link>{' '}
                to register as a waste supplier, product buyer, investor, or research partner.
              </Text>
            </Section>

            {/* Footer */}
            <Hr className="border-[#E5E7EB]" />
            <Section className="px-8 py-6">
              <Text className="m-0 text-xs text-[#9CA3AF]">
                You're receiving this because {subscriberEmail} subscribed at nutriloopAfrica.com.
              </Text>
              <Text className="m-0 mt-1 text-xs text-[#9CA3AF]">
                © {new Date().getFullYear()} NutriLoop Africa Ltd · Nairobi, Kenya ·{' '}
                <Link
                  href={`https://nutriloopAfrica.com/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`}
                  className="text-[#9CA3AF]"
                >
                  Unsubscribe
                </Link>{' '}
                ·{' '}
                <Link href="https://nutriloopAfrica.com/privacy" className="text-[#9CA3AF]">
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WelcomeNewsletterEmail
