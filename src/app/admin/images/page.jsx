'use client'

import { useState, useEffect } from 'react'
import { Image as ImageIcon, Upload, Trash2, Eye, Download, Edit3 } from 'lucide-react'
import ImageUpload, { ImageGallery } from '@/components/ImageUpload'
import { imageStorage } from '@/lib/storage'

export default function AdminImages() {
  const [selectedBucket, setSelectedBucket] = useState('gallery')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [renameModal, setRenameModal] = useState(null)
  const [newImageName, setNewImageName] = useState('')
  const [renaming, setRenaming] = useState(false)

  const buckets = [
    { key: 'church', label: 'Church Images', folder: '' },
    { key: 'ministry', label: 'All Ministry Images', folder: '' },
    { key: 'ministry-youth', label: 'Youth Ministry', folder: 'youth' },
    { key: 'ministry-children', label: 'Children Ministry', folder: 'children' },
    { key: 'ministry-womens', label: 'Women Ministry', folder: 'womens' },
    { key: 'ministry-mens', label: 'Men Ministry', folder: 'mens' },
    { key: 'ministry-worship', label: 'Worship Ministry', folder: 'worship' },
    { key: 'ministry-prayer', label: 'Prayer Ministry', folder: 'prayer' },
    { key: 'ministry-discipleship', label: 'Discipleship Ministry', folder: 'discipleship' },
    { key: 'ministry-evangelism', label: 'Evangelism Ministry', folder: 'evangelism' },
    { key: 'events', label: 'Event Images', folder: '' },
    { key: 'gallery', label: 'Gallery Images', folder: '' },
    { key: 'uploads', label: 'User Uploads', folder: '' }
  ]

  // Load images for selected bucket
  useEffect(() => {
    loadImages()
  }, [selectedBucket])

  const loadImages = async () => {
    setLoading(true)
    try {
      const currentBucket = buckets.find(b => b.key === selectedBucket)
      const bucketType = currentBucket?.key.startsWith('ministry-') ? 'ministry' : selectedBucket
      const folder = currentBucket?.folder || ''
      
      const result = await imageStorage.listImages(bucketType, folder)
      if (result.success) {
        setImages(result.images)
      }
    } catch (error) {
      console.error('Failed to load images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = (result) => {
    // Refresh images after upload
    setTimeout(() => {
      loadImages()
    }, 1000)
  }

  // Get current bucket and folder info
  const getCurrentBucketInfo = () => {
    const currentBucket = buckets.find(b => b.key === selectedBucket)
    return {
      bucketType: currentBucket?.key.startsWith('ministry-') ? 'ministry' : selectedBucket,
      folder: currentBucket?.folder || ''
    }
  }

  const handleDeleteImage = async (imageName) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const { bucketType } = getCurrentBucketInfo()
      const result = await imageStorage.deleteImage(imageName, bucketType)
      if (result.success) {
        loadImages() // Refresh list
      }
    } catch (error) {
      console.error('Failed to delete image:', error)
    }
  }

  const handleRenameImage = async () => {
    if (!newImageName.trim()) return

    setRenaming(true)
    try {
      const { bucketType, folder } = getCurrentBucketInfo()
      
      // Get file extension from original name
      const fileExt = renameModal.name.split('.').pop()
      const newName = newImageName.trim()
      
      // Add extension if not provided
      const finalNewName = newName.includes('.') ? newName : `${newName}.${fileExt}`
      
      // Build full paths with folder
      const oldPath = folder ? `${folder}/${renameModal.name}` : renameModal.name
      const newPath = folder ? `${folder}/${finalNewName}` : finalNewName
      
      const result = await imageStorage.renameImage(
        oldPath, 
        newPath, 
        bucketType
      )
      
      if (result.success) {
        setRenameModal(null)
        setNewImageName('')
        loadImages() // Refresh list
      } else {
        alert('Failed to rename image: ' + result.error)
      }
    } catch (error) {
      console.error('Failed to rename image:', error)
      alert('Failed to rename image')
    } finally {
      setRenaming(false)
    }
  }

  const openRenameModal = (image) => {
    setRenameModal(image)
    // Set current name without extension as default
    const nameWithoutExt = image.name.replace(/\.[^/.]+$/, "")
    setNewImageName(nameWithoutExt)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#E31E24] text-white p-6">
            <h1 className="text-3xl font-bold">Image Management</h1>
            <p className="text-red-100">Upload and manage church images</p>
          </div>

          <div className="p-6">
            {/* Bucket Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Image Category
              </label>
              
              {/* General Categories */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">General Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {buckets.filter(bucket => !bucket.key.startsWith('ministry-')).map(bucket => (
                    <button
                      key={bucket.key}
                      onClick={() => setSelectedBucket(bucket.key)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        selectedBucket === bucket.key
                          ? 'bg-[#E31E24] text-white border-[#E31E24]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#E31E24]'
                      }`}
                    >
                      {bucket.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ministry Categories */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Ministry Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {buckets.filter(bucket => bucket.key.startsWith('ministry-')).map(bucket => (
                    <button
                      key={bucket.key}
                      onClick={() => setSelectedBucket(bucket.key)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        selectedBucket === bucket.key
                          ? 'bg-[#FFD500] text-gray-900 border-[#FFD500]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#FFD500]'
                      }`}
                    >
                      {bucket.label.replace(' Ministry', '')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Upload to {buckets.find(b => b.key === selectedBucket)?.label}
              </h2>
              {(() => {
                const { bucketType, folder } = getCurrentBucketInfo()
                return (
                  <ImageUpload
                    bucketType={bucketType}
                    folder={folder}
                    multiple={true}
                    maxFiles={10}
                    onUpload={handleUpload}
                  />
                )
              })()}
            </div>

            {/* Images Grid */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Current Images ({images.length})
              </h2>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E31E24] mx-auto"></div>
                  <p className="text-gray-500 mt-4">Loading images...</p>
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No images in this category yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-40 md:h-48 object-cover rounded-lg border"
                      />
                      
                      {/* Image Actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all rounded-lg flex items-center justify-center space-x-1">
                        <button
                          onClick={() => setSelectedImage(image)}
                          className="bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                          title="View Full Size"
                        >
                          <Eye className="h-3 w-3" />
                        </button>
                        
                        <button
                          onClick={() => openRenameModal(image)}
                          className="bg-blue-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600"
                          title="Rename"
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                        
                        <a
                          href={image.url}
                          download={image.name}
                          className="bg-green-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-green-600"
                          title="Download"
                        >
                          <Download className="h-3 w-3" />
                        </a>
                        
                        <button
                          onClick={() => handleDeleteImage(image.name)}
                          className="bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                      
                      {/* Image Name */}
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded max-w-full truncate">
                        {image.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Preview Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{selectedImage.name}</h3>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="max-w-full max-h-96 mx-auto"
                />
                
                <div className="mt-4 flex justify-center space-x-4">
                  <a
                    href={selectedImage.url}
                    download={selectedImage.name}
                    className="bg-[#E31E24] text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </a>
                  
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedImage.url)
                      alert('Image URL copied to clipboard!')
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rename Modal */}
        {renameModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="max-w-md w-full bg-white rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Rename Image</h3>
                  <button
                    onClick={() => setRenameModal(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Current Image Preview */}
                <div className="mb-4 text-center">
                  <img
                    src={renameModal.url}
                    alt={renameModal.name}
                    className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                  />
                  <p className="text-sm text-gray-600">Current: {renameModal.name}</p>
                </div>

                {/* Rename Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Name
                    </label>
                    <input
                      type="text"
                      value={newImageName}
                      onChange={(e) => setNewImageName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E31E24] focus:border-transparent"
                      placeholder="Enter new image name..."
                      onKeyPress={(e) => e.key === 'Enter' && handleRenameImage()}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      File extension will be added automatically if not provided
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleRenameImage}
                      disabled={renaming || !newImageName.trim()}
                      className="flex-1 bg-[#E31E24] text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {renaming ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Renaming...</span>
                        </>
                      ) : (
                        <>
                          <Edit3 className="h-4 w-4" />
                          <span>Rename</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => setRenameModal(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}