import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'
import type { FounderNotificationEmailProps } from '@/types'
import { APPLICATION_TYPE_LABELS } from '../client'

const typeBadgeColors: Record<string, string> = {
  waste_supplier: '#2E7D32',
  buyer: '#1565C0',
  investor: '#B85C00',
  research: '#6A1B9A',
  media: '#00838F',
}

export function FounderNotificationEmail({
  applicantName,
  applicantEmail,
  applicationType,
  organisationOrPublication,
  keyDetails,
  applicationId,
  submittedAt,
}: FounderNotificationEmailProps) {
  const typeLabel = APPLICATION_TYPE_LABELS[applicationType] ?? 'Partner'
  const badgeColor = typeBadgeColors[applicationType] ?? '#2E7D32'

  return (
    <Html>
      <Head />
      <Preview>
        New {typeLabel} application — {applicantName} ({organisationOrPublication})
      </Preview>
      <Tailwind>
        <Body className="bg-[#F3F4F6] font-sans">
          <Container className="mx-auto max-w-[600px] bg-white">
            {/* Header */}
            <Section className="px-8 py-6" style={{ backgroundColor: badgeColor }}>
              <Row>
                <Column>
                  <Text className="m-0 text-xs font-medium uppercase tracking-widest text-white opacity-80">
                    NutriLoop Africa — Internal
                  </Text>
                  <Heading className="m-0 mt-1 text-xl font-semibold text-white">
                    New {typeLabel} Application
                  </Heading>
                </Column>
              </Row>
            </Section>

            {/* Applicant summary */}
            <Section className="px-8 py-8">
              <Heading className="mb-4 mt-0 text-base font-semibold text-[#111827]">
                Applicant Details
              </Heading>

              <Row>
                <Column className="w-1/2 pr-4">
                  <Text className="m-0 text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                    Name
                  </Text>
                  <Text className="mb-4 mt-1 text-sm font-medium text-[#111827]">
                    {applicantName}
                  </Text>
                </Column>
                <Column className="w-1/2 pl-4">
                  <Text className="m-0 text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                    Email
                  </Text>
                  <Link
                    href={`mailto:${applicantEmail}`}
                    className="mb-4 mt-1 block text-sm font-medium text-[#2E7D32]"
                  >
                    {applicantEmail}
                  </Link>
                </Column>
              </Row>

              <Row>
                <Column className="w-1/2 pr-4">
                  <Text className="m-0 text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                    Organisation / Publication
                  </Text>
                  <Text className="mb-4 mt-1 text-sm font-medium text-[#111827]">
                    {organisationOrPublication}
                  </Text>
                </Column>
                <Column className="w-1/2 pl-4">
                  <Text className="m-0 text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                    Application type
                  </Text>
                  <Text
                    className="mb-4 mt-1 text-sm font-semibold"
                    style={{ color: badgeColor }}
                  >
                    {typeLabel}
                  </Text>
                </Column>
              </Row>

              <Hr className="my-4 border-[#E5E7EB]" />

              {/* Key application details */}
              <Heading className="mb-4 mt-0 text-base font-semibold text-[#111827]">
                Key Details
              </Heading>

              {Object.entries(keyDetails).map(([label, value]) => (
                <Row key={label}>
                  <Column className="w-2/5 pr-4">
                    <Text className="m-0 text-xs font-medium text-[#6B7280]">{label}</Text>
                  </Column>
                  <Column className="w-3/5">
                    <Text className="mb-3 mt-0 text-sm text-[#111827]">{value}</Text>
                  </Column>
                </Row>
              ))}

              <Hr className="my-4 border-[#E5E7EB]" />

              {/* Meta */}
              <Row>
                <Column className="w-1/2 pr-4">
                  <Text className="m-0 text-xs text-[#9CA3AF]">Application ID</Text>
                  <Text className="m-0 mt-0.5 font-mono text-xs text-[#6B7280]">
                    {applicationId}
                  </Text>
                </Column>
                <Column className="w-1/2 pl-4">
                  <Text className="m-0 text-xs text-[#9CA3AF]">Submitted at</Text>
                  <Text className="m-0 mt-0.5 text-xs text-[#6B7280]">{submittedAt}</Text>
                </Column>
              </Row>
            </Section>

            {/* CTA */}
            <Section className="bg-[#F9FAF9] px-8 py-6">
              <Text className="m-0 text-sm text-[#374151]">
                <strong>Next step:</strong> Reply within 48 hours to{' '}
                <Link href={`mailto:${applicantEmail}`} className="text-[#2E7D32]">
                  {applicantEmail}
                </Link>
                .
              </Text>
              <Text className="m-0 mt-3 text-xs text-[#9CA3AF]">
                View and manage all applications in the{' '}
                <Link href="https://nutriloopAfrica.com/admin" className="text-[#6B7280]">
                  admin dashboard
                </Link>
                .
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default FounderNotificationEmail
