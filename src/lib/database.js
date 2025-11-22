import { supabase } from './supabase'

// Gallery and Image Management
export const gallery = {
  // Add image to gallery
  async addImage(imageData) {
    try {
      const { data, error } = await supabase
        .from('church_gallery')
        .insert({
          title: imageData.title,
          description: imageData.description,
          image_url: imageData.image_url,
          category: imageData.category,
          ministry_type: imageData.ministry_type || null,
          folder_path: imageData.folder_path || null,
          is_featured: imageData.is_featured || false
        })
        .select()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Gallery add error:', error)
      return { success: false, error: error.message }
    }
  },

  // Get gallery images
  async getImages(category = null, featured = null, ministryType = null) {
    try {
      let query = supabase
        .from('church_gallery')
        .select('*')
        .order('created_at', { ascending: false })

      if (category) {
        query = query.eq('category', category)
      }

      if (featured !== null) {
        query = query.eq('is_featured', featured)
      }

      if (ministryType) {
        query = query.eq('ministry_type', ministryType)
      }

      const { data, error } = await query
      if (error) throw error

      return { success: true, data }
    } catch (error) {
      console.error('Gallery fetch error:', error)
      return { success: false, error: error.message }
    }
  },

  // Get images by ministry type
  async getMinistryImages(ministryType) {
    return this.getImages('ministries', null, ministryType)
  },

  // Get all ministry categories
  async getMinistryCategories() {
    try {
      const { data, error } = await supabase
        .from('church_gallery')
        .select('ministry_type, category')
        .not('ministry_type', 'is', null)
        .order('ministry_type')

      if (error) throw error

      // Get unique ministry types
      const uniqueMinistries = [...new Set(data.map(item => item.ministry_type))]
      
      return { success: true, data: uniqueMinistries }
    } catch (error) {
      console.error('Ministry categories fetch error:', error)
      return { success: false, error: error.message }
    }
  },

  // Delete gallery image
  async deleteImage(id) {
    try {
      const { error } = await supabase
        .from('church_gallery')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Gallery delete error:', error)
      return { success: false, error: error.message }
    }
  }
}

// Church Registration Functions
export const churchRegistration = {
  // Submit church registration form
  async submitRegistration(registrationData) {
    try {
      const { data, error } = await supabase
        .from('church_registrations')
        .insert([registrationData])
        .select()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error submitting registration:', error)
      return { success: false, error: error.message }
    }
  },

  // Get all registrations (admin only)
  async getRegistrations() {
    try {
      const { data, error } = await supabase
        .from('church_registrations')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching registrations:', error)
      return { success: false, error: error.message }
    }
  }
}

// Ministry Join Functions
export const ministryJoin = {
  // Submit ministry join form
  async submitJoinRequest(joinData) {
    try {
      const { data, error } = await supabase
        .from('ministry_join_requests')
        .insert([joinData])
        .select()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error submitting ministry join request:', error)
      return { success: false, error: error.message }
    }
  },

  // Get join requests by ministry
  async getJoinRequestsByMinistry(ministryName) {
    try {
      const { data, error } = await supabase
        .from('ministry_join_requests')
        .select('*')
        .eq('ministry', ministryName)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching ministry join requests:', error)
      return { success: false, error: error.message }
    }
  }
}

// Contact Form Functions
export const contactForm = {
  // Submit contact form
  async submitContact(contactData) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([contactData])
        .select()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error submitting contact message:', error)
      return { success: false, error: error.message }
    }
  },

  // Get all contact messages
  async getContactMessages() {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching contact messages:', error)
      return { success: false, error: error.message }
    }
  }
}

// Donation Functions
export const donations = {
  // Submit donation
  async submitDonation(donationData) {
    try {
      const { data, error } = await supabase
        .from('donations')
        .insert([donationData])
        .select()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error submitting donation:', error)
      return { success: false, error: error.message }
    }
  },

  // Get donation statistics
  async getDonationStats() {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('amount, donation_type, category, created_at')
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching donation stats:', error)
      return { success: false, error: error.message }
    }
  }
}

// Event Functions
export const events = {
  // Get all events
  async getEvents() {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching events:', error)
      return { success: false, error: error.message }
    }
  },

  // Register for event
  async registerForEvent(registrationData) {
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .insert([registrationData])
        .select()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error registering for event:', error)
      return { success: false, error: error.message }
    }
  }
}

// Newsletter Functions
export const newsletter = {
  // Subscribe to newsletter
  async subscribe(email, name = null) {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, name, subscribed_at: new Date().toISOString() }])
        .select()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      return { success: false, error: error.message }
    }
  }
}