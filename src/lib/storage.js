// Supabase Storage utilities for images
import { supabase } from './supabase.js'

export const imageStorage = {
  // Storage buckets configuration
  buckets: {
    church: 'church-images',
    ministry: 'ministry-images',
    events: 'event-images',
    gallery: 'gallery-images',
    uploads: 'user-uploads'
  },

  // Upload image to Supabase Storage
  async uploadImage(file, bucketType = 'uploads', folder = '') {
    try {
      const bucket = this.buckets[bucketType] || bucketType
      const fileExt = file.name.split('.').pop()
      const fileName = `${folder}${folder ? '/' : ''}${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.')
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        throw new Error('File too large. Maximum size is 5MB.')
      }

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

      return {
        success: true,
        url: publicUrl,
        path: fileName,
        bucket: bucket
      }
    } catch (error) {
      console.error('Upload error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Upload multiple images
  async uploadMultiple(files, bucketType = 'uploads', folder = '') {
    try {
      const uploadPromises = Array.from(files).map(file => 
        this.uploadImage(file, bucketType, folder)
      )
      
      const results = await Promise.all(uploadPromises)
      
      const successful = results.filter(r => r.success)
      const failed = results.filter(r => !r.success)
      
      return {
        success: failed.length === 0,
        uploaded: successful,
        failed: failed,
        total: files.length
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Delete image from storage
  async deleteImage(path, bucketType = 'uploads') {
    try {
      const bucket = this.buckets[bucketType] || bucketType
      
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])

      if (error) throw error
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Get image URL
  getImageUrl(path, bucketType = 'uploads') {
    const bucket = this.buckets[bucketType] || bucketType
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    
    return data.publicUrl
  },

  // List images in a bucket/folder
  async listImages(bucketType = 'uploads', folder = '', limit = 100) {
    try {
      const bucket = this.buckets[bucketType] || bucketType
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder, {
          limit: limit,
          offset: 0
        })

      if (error) throw error

      return {
        success: true,
        images: data.map(file => ({
          name: file.name,
          url: this.getImageUrl(`${folder}${folder ? '/' : ''}${file.name}`, bucketType),
          size: file.metadata?.size,
          lastModified: file.updated_at
        }))
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Rename/move image in storage
  async renameImage(oldPath, newPath, bucketType = 'uploads') {
    try {
      const bucket = this.buckets[bucketType] || bucketType
      
      // Copy the file to new location
      const { data: copyData, error: copyError } = await supabase.storage
        .from(bucket)
        .copy(oldPath, newPath)

      if (copyError) throw copyError

      // Delete the old file
      const { error: deleteError } = await supabase.storage
        .from(bucket)
        .remove([oldPath])

      if (deleteError) throw deleteError

      return { 
        success: true, 
        newUrl: this.getImageUrl(newPath, bucketType)
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Create optimized thumbnail
  async createThumbnail(file, maxWidth = 300, maxHeight = 300) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img
        
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        // Set canvas dimensions
        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(resolve, 'image/jpeg', 0.8)
      }

      img.src = URL.createObjectURL(file)
    })
  }
}