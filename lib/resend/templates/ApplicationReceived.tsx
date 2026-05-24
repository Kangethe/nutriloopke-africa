import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import type { ApplicationReceivedEmailProps } from '@/types'
import { APPLICATION_TYPE_LABELS } from '../client'

const applicationTypeMessages: Record<string, { heading: string; body: string }> = {
  waste_supplier: {
    heading: 'Your waste partnership application is with us.',
    body: "We'll review your details and be in touch within 48 hours to discuss collection schedules, volumes, and how NutriLoop Africa can turn your organic waste stream into a documented sustainability asset.",
  },
  buyer: {
    heading: 'Your product enquiry is with us.',
    body: "We'll review your requirements and reach out within 48 hours with product specifications, current pricing, and lead times. We look forward to supplying Kenya-made protein for your operation.",
  },
  investor: {
    heading: 'Your investor enquiry is with us.',
    body: "We'll review your details and be in touch within 48 hours. If you would like our full investor brief — financial model, impact KPI framework, and team background — we will send it in that first response.",
  },
  research: {
    heading: 'Your research partnership enquiry is with us.',
    body: "We'll be in touch within 48 hours to discuss data access, collaboration structure, and how your institution can contribute to — and benefit from — NutriLoop Africa's BSF science programme.",
  },
  media: {
    heading: 'Your press enquiry is with us.',
    body: "We'll be in touch within 48 hours with background materials, access arrangements, and any data or statements you need for your story. We are always open to journalists covering Kenya's circular economy transition.",
  },
}

export function ApplicationReceivedEmail({
  applicantName,
  applicationType,
  organisationOrPublication,
  applicationId,
}: ApplicationReceivedEmailProps) {
  const typeLabel = APPLICATION_TYPE_LABELS[applicationType] ?? 'Partner'
  const messages =
    applicationTypeMessages[applicationType] ?? applicationTypeMessages.waste_supplier

  return (
    <Html>
      <Head />
      <Preview>{messages.heading}</Preview>
      <Tailwind>
        <Body className="bg-[#F5F7F2] font-sans">
          <Container className="mx-auto max-w-[600px] bg-white">
            {/* Header */}
            <Section className="bg-[#0A1A0A] px-8 py-8">
              <Row>
                <Column>
                  <Heading className="m-0 text-2xl font-semibold text-white">
                    NutriLoop Africa
                  </Heading>
                  <Text className="m-0 mt-1 text-sm text-[#81C784]">
                    Closing the loop on Kenya's food system
                  </Text>
                </Column>
                <Column align="right">
                  <Text className="m-0 rounded-full bg-[#2E7D32] px-3 py-1 text-xs font-medium text-white">
                    {typeLabel}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Body */}
            <Section className="px-8 py-10">
              <Heading className="mb-2 mt-0 text-2xl font-semibold text-[#0A1A0A]">
                {messages.heading}
              </Heading>

              <Text className="text-base leading-relaxed text-[#374151]">
                Dear {applicantName},
              </Text>

              <Text className="text-base leading-relaxed text-[#374151]">
                Thank you for registering{' '}
                <strong>{organisationOrPublication}</strong> as a NutriLoop Africa{' '}
                {typeLabel.toLowerCase()}. {messages.body}
              </Text>

              <Hr className="my-6 border-[#E5E7EB]" />

              <Section className="rounded-lg bg-[#F5F7F2] px-5 py-4">
                <Text className="m-0 text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                  Application reference
                </Text>
                <Text className="m-0 mt-1 font-mono text-sm font-medium text-[#2E7D32]">
                  {applicationId.slice(0, 8).toUpperCase()}
                </Text>
              </Section>

              <Text className="text-sm leading-relaxed text-[#6B7280]">
                Keep this reference in case you need to follow up. You can reach us at{' '}
                <Link href="mailto:hello@nutriloopAfrica.com" className="text-[#2E7D32]">
                  hello@nutriloopAfrica.com
                </Link>{' '}
                or via WhatsApp at{' '}
                <Link href="https://wa.me/254700000000" className="text-[#2E7D32]">
                  +254 700 000 000
                </Link>
                .
              </Text>
            </Section>

            {/* Footer */}
            <Hr className="border-[#E5E7EB]" />
            <Section className="px-8 py-6">
              <Text className="m-0 text-xs text-[#9CA3AF]">
                © {new Date().getFullYear()} NutriLoop Africa Ltd · Nairobi, Kenya
              </Text>
              <Text className="m-0 text-xs text-[#9CA3AF]">
                <Link href="https://nutriloopAfrica.com/privacy" className="text-[#9CA3AF]">
                  Privacy Policy
                </Link>{' '}
                ·{' '}
                <Link href="https://nutriloopAfrica.com/terms" className="text-[#9CA3AF]">
                  Terms
                </Link>{' '}
                ·{' '}
                <Link
                  href="https://nutriloopAfrica.com"
                  className="text-[#9CA3AF]"
                >
                  nutriloopAfrica.com
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ApplicationReceivedEmail
