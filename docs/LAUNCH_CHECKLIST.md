# Launch checklist

## Accounts and approvals (start first, these take weeks)
- [ ] Meta Business verification and WhatsApp Cloud API number
- [ ] Approved WhatsApp templates `blood_request` and `police_alarm`
- [ ] DLT registration (entity, sender ID, templates) for SMS in India
- [ ] SMS provider connected to Supabase phone auth
- [ ] Written agreement with the traffic control room for the alarm number
- [ ] Hospital onboarding: verify each hospital, one admin per hospital

## Security
- [ ] Review every RLS policy in `supabase/migrations/..._rls.sql`
- [ ] Confirm no service-role key is in the frontend or the repository
- [ ] Rate limit OTP and chat (Supabase Auth settings and an Edge Function if needed)
- [ ] Turn on Supabase backups and leave RLS enabled on every table
- [ ] Test: a user cannot read another user's chat; donor phone numbers are never returned; only staff edit their own hospital

## Legal and trust
- [ ] Privacy policy and consent text (DPDP Act 2023)
- [ ] Terms of use with a clear note that MedPulse supports 108 and doctors and does not replace them
- [ ] Account deletion path

## Operations
- [ ] Replace placeholder phone numbers in seed data
- [ ] Own OSRM server and a map tile provider
- [ ] Error monitoring (Sentry) and uptime check
- [ ] Pilot: one city area, 3 to 5 hospitals, one control room, collect written feedback
