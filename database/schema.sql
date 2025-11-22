-- Filadelfia Christian Centre Database Schema
-- Run these SQL commands in your Supabase SQL editor

-- Church Registrations Table
CREATE TABLE church_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    age INTEGER,
    occupation VARCHAR(100),
    previous_church VARCHAR(200),
    interests TEXT[], -- Array of interests
    visit_reason TEXT,
    prayer_requests TEXT,
    preferred_contact VARCHAR(20) DEFAULT 'email',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ministry Join Requests Table
CREATE TABLE ministry_join_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ministry VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    experience TEXT,
    availability TEXT[], -- Array of available days
    motivation TEXT NOT NULL,
    skills TEXT,
    previous_volunteer TEXT,
    reference_contacts VARCHAR(200),
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages Table
CREATE TABLE contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    request_type VARCHAR(50) DEFAULT 'general',
    visit_planning BOOLEAN DEFAULT FALSE,
    prayer_request BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'unread', -- unread, read, responded
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations Table
CREATE TABLE donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    donor_first_name VARCHAR(100) NOT NULL,
    donor_last_name VARCHAR(100) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    donor_phone VARCHAR(20),
    amount DECIMAL(10,2) NOT NULL,
    donation_type VARCHAR(20) NOT NULL, -- one-time, recurring
    category VARCHAR(50) NOT NULL, -- general, missions, building, youth, special
    payment_method VARCHAR(20) NOT NULL, -- card, mpesa, bank
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed
    transaction_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events Table (for dynamic event management)
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    location VARCHAR(200) NOT NULL,
    address TEXT,
    category VARCHAR(50) NOT NULL,
    capacity INTEGER,
    image_url TEXT,
    organizer VARCHAR(100),
    registration_required BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active', -- active, cancelled, completed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event Registrations Table
CREATE TABLE event_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    number_of_attendees INTEGER DEFAULT 1,
    special_requirements TEXT,
    registration_status VARCHAR(20) DEFAULT 'confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscribers Table
CREATE TABLE newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(200),
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prayer Requests Table
CREATE TABLE prayer_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    requester_name VARCHAR(200) NOT NULL,
    requester_email VARCHAR(255),
    requester_phone VARCHAR(20),
    request_text TEXT NOT NULL,
    request_type VARCHAR(50) DEFAULT 'general', -- general, healing, family, work, etc.
    is_anonymous BOOLEAN DEFAULT FALSE,
    is_urgent BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active', -- active, answered, archived
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sermons Table
CREATE TABLE sermons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    speaker VARCHAR(100) NOT NULL,
    sermon_date DATE NOT NULL,
    duration_minutes INTEGER,
    scripture_reference VARCHAR(100),
    description TEXT,
    audio_url TEXT,
    video_url TEXT,
    thumbnail_url TEXT,
    series_name VARCHAR(100),
    tags TEXT[],
    view_count INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'published', -- draft, published, archived
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_church_registrations_email ON church_registrations(email);
CREATE INDEX idx_church_registrations_created_at ON church_registrations(created_at);
CREATE INDEX idx_ministry_join_requests_ministry ON ministry_join_requests(ministry);
CREATE INDEX idx_ministry_join_requests_status ON ministry_join_requests(status);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_donations_category ON donations(category);
CREATE INDEX idx_donations_created_at ON donations(created_at);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_sermons_date ON sermons(sermon_date);
CREATE INDEX idx_sermons_speaker ON sermons(speaker);

-- Enable Row Level Security (RLS)
ALTER TABLE church_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ministry_join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed)
-- Allow anyone to insert registrations, contact messages, etc.
CREATE POLICY "Allow public registration submission" ON church_registrations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public ministry join submission" ON ministry_join_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public contact submission" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public donation submission" ON donations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public event registration" ON event_registrations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public newsletter subscription" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public prayer request submission" ON prayer_requests
    FOR INSERT WITH CHECK (true);

-- Allow public to read events and sermons
CREATE POLICY "Allow public to read events" ON events
    FOR SELECT USING (status = 'active');

CREATE POLICY "Allow public to read sermons" ON sermons
    FOR SELECT USING (status = 'published');