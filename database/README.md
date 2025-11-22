# Supabase Database Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Fill in project details:
   - Name: `Filadelfia Christian Centre`
   - Database Password: (create a strong password)
   - Region: Choose closest to Tanzania (probably Europe/Frankfurt)

## 2. Get Your Credentials

Once your project is created:

1. Go to `Settings` → `API`
2. Copy your:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## 3. Configure Environment Variables

1. Create `.env.local` file in your project root
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Set Up Database Tables

1. Go to your Supabase project dashboard
2. Click on `SQL Editor` in the sidebar
3. Copy and paste the contents of `database/schema.sql`
4. Click `Run` to execute the SQL

This will create all the necessary tables:
- `church_registrations`
- `ministry_join_requests`
- `contact_messages`
- `donations`
- `events`
- `event_registrations`
- `newsletter_subscribers`
- `prayer_requests`
- `sermons`

## 5. Test Database Connection

After setting up, your forms will automatically save to the database:

- Church registration form → `church_registrations` table
- Ministry join forms → `ministry_join_requests` table
- Contact form → `contact_messages` table
- Donation form → `donations` table

## 6. View Your Data

1. Go to `Table Editor` in Supabase dashboard
2. Select any table to view submitted data
3. You can export data, edit records, etc.

## 7. Optional: Set Up Authentication

If you want admin login functionality:

1. Go to `Authentication` → `Settings`
2. Configure sign-up settings
3. Add admin users manually in the dashboard

## Database Functions Available

The database connection provides these functions:

### Church Registration
```javascript
import { churchRegistration } from '@/lib/database'

// Submit registration
await churchRegistration.submitRegistration(formData)

// Get all registrations (admin)
await churchRegistration.getRegistrations()
```

### Ministry Join
```javascript
import { ministryJoin } from '@/lib/database'

// Submit join request
await ministryJoin.submitJoinRequest(joinData)

// Get requests by ministry
await ministryJoin.getJoinRequestsByMinistry('Youth Ministry')
```

### Contact Form
```javascript
import { contactForm } from '@/lib/database'

// Submit contact message
await contactForm.submitContact(contactData)

// Get all messages
await contactForm.getContactMessages()
```

### Donations
```javascript
import { donations } from '@/lib/database'

// Submit donation
await donations.submitDonation(donationData)

// Get donation statistics
await donations.getDonationStats()
```

## Security Notes

- Row Level Security (RLS) is enabled
- Public can insert new records (registrations, messages, etc.)
- Only authenticated admin users can read all data
- Adjust policies in Supabase dashboard as needed

## Next Steps

1. Set up your Supabase project
2. Configure environment variables
3. Run the SQL schema
4. Test by submitting forms on your website
5. Check data in Supabase dashboard