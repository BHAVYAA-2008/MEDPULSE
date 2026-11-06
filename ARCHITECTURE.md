# Architecture

```
React PWA (Vercel)  --REST/Realtime-->  Supabase (Postgres + RLS + Auth)
        |                                    |
        |--- functions.invoke --->  Edge Functions --> WhatsApp / SMS / webhook
```

* The browser only holds the **anon key**. Row Level Security is the real access control.
* Multi-step rules live in database functions so they run atomically: `create_hold`, `release_hold`, `contact_hospital`, `open_chat`, `search_hospitals`.
* Secrets (WhatsApp, SMS, service role) exist only inside Edge Functions.
* Realtime tables: resources, blood_stock, blood_requests, messages, trips, trip_points, holds.

## Blood request privacy
`blood_requests` has a policy that lets a donor read an open request only when their profile has the same `blood_group` and `donor_opt_in = true`. Because Realtime respects RLS, other users never receive the event.
Hospital staff see donors who ticked through the view `hospital_donor_responses`, which exposes name and blood group only, never a phone number.

## Traffic police alarm
`start-trip-alarm` fetches the route from OSRM, samples points along it, finds every `police_zones` row whose radius touches the route, and notifies each control room. Each attempt is stored in `alarms`.

## Scheduled jobs (pg_cron)
* every minute: return expired holds to stock
* every Monday: reset weekly donor alert counters
* every 10 minutes: expire blood requests older than 6 hours
