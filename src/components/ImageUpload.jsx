'use client'

import { useState } from 'react'
import { Upload, X, Image as ImageIcon, AlertCircle, Check } from 'lucide-react'
import { imageStorage } from '@/lib/storage'

export default function ImageUpload({ 
  onUpload, 
  bucketType = 'uploads', 
  folder = '', 
  multiple = false, 
  maxFiles = 5,
  preview = true 
}) {
  const [uploading, setUploading] = useState(false)
  const [previews, setPreviews] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files)
    
    if (!multiple && files.length > 1) {
      setError('Please select only one file')
      return
    }

    if (files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`)
      return
    }

    setError('')
    setSuccess('')

    // Create previews if enabled
    if (preview) {
      const newPreviews = await Promise.all(
        files.map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = (e) => resolve({
              file,
              url: e.target.result,
              name: file.name
            })
            reader.readAsDataURL(file)
          })
        })
      )
      setPreviews(newPreviews)
    }

    // Upload files
    setUploading(true)
    
    try {
      let result
      if (multiple) {
        result = await imageStorage.uploadMultiple(files, bucketType, folder)
      } else {
        result = await imageStorage.uploadImage(files[0], bucketType, folder)
      }

      if (result.success) {
        setSuccess(multiple ? 
          `Successfully uploaded ${result.uploaded?.length || 1} images` : 
          'Image uploaded successfully'
        )
        onUpload?.(result)
      } else {
        setError(result.error || 'Upload failed')
      }
    } catch (error) {
      setError('Upload failed: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const removePreview = (index) => {
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#E31E24] transition-colors">
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
          disabled={uploading}
        />
        
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="flex flex-col items-center space-y-4">
            {uploading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E31E24]"></div>
            ) : (
              <Upload className="h-12 w-12 text-gray-400" />
            )}
            
            <div>
              <p className="text-lg font-medium text-gray-900">
                {uploading ? 'Uploading...' : 'Upload Images'}
              </p>
              <p className="text-sm text-gray-500">
                {multiple ? `Select up to ${maxFiles} images` : 'Select an image'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, WebP up to 5MB
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
          <Check className="h-5 w-5 text-green-500" />
          <span className="text-green-700">{success}</span>
        </div>
      )}

      {/* Preview Grid */}
      {preview && previews.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview.url}
                  alt={preview.name}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  onClick={() => removePreview(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {preview.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Simple Image Gallery Component
export function ImageGallery({ images, onImageClick }) {
  if (!images?.length) {
    return (
      <div className="text-center py-12">
        <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No images uploaded yet</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="relative group cursor-pointer"
          onClick={() => onImageClick?.(image)}
        >
          <img
            src={image.url}
            alt={image.name || `Image ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg border hover:shadow-lg transition-shadow"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      ))}
    </div>
  )
}