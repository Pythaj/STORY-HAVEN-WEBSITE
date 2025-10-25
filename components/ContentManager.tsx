'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Edit, Trash2, Eye, Plus, Search, X, Loader, Image as ImageIcon, FileText, Music, Film } from 'lucide-react'

interface ContentManagerProps {
  type: 'stories' | 'audio' | 'animations'
}

interface ContentItem {
  id: string
  title: string
  genre: string
  description?: string
  price: number
  published: boolean
  views?: number
  plays?: number
  cover_url?: string
  thumbnail_url?: string
  pdf_url?: string
  audio_url?: string
  video_url?: string
  duration?: number
  pages?: number
  created_at: string
}

export default function ContentManager({ type }: ContentManagerProps) {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)

  useEffect(() => {
    fetchContent()
  }, [type])

  const fetchContent = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/${type}`)
      if (response.ok) {
        const data = await response.json()
        setContent(data)
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const contentData = { stories: [], audio: [], animations: [] }

  const categories = ['All', 'Romance', 'Thriller', 'Educational', 'Bedtime', 'Moral', 'Adventure', 'African Legends', 'Drama', 'Fantasy']

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    try {
      const response = await fetch(`/api/admin/${type}/${id}`, { method: 'DELETE' })
      if (response.ok) fetchContent()
    } catch (error) {
      console.error('Error deleting content:', error)
    }
  }

  const filteredContent = content.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.genre === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-4xl font-bold text-primary-gold mb-2">
            Manage {typeLabel}
          </h1>
          <p className="text-primary-gold-light/70">
            Upload, edit, and manage your {type}
          </p>
        </div>
        <motion.button
          onClick={() => {
            setEditingItem(null)
            setShowUploadModal(true)
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Upload New</span>
        </motion.button>
      </div>

      {/* Category Filter Buttons */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 shadow-lg shadow-primary-gold/30'
                  : 'bg-dark-800 text-primary-gold-light border border-primary-gold/20 hover:border-primary-gold/50 hover:bg-dark-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-gold" size={20} />
          <input
            type="text"
            placeholder={`Search ${type}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-800 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="animate-spin text-primary-gold" size={48} />
        </div>
      ) : filteredContent.length === 0 ? (
        <div className="card text-center py-20">
          <p className="text-2xl text-primary-gold-light/70 mb-4">No {type} found</p>
          <p className="text-primary-gold-light/50 mb-6">
            {content.length === 0 
              ? `Start by uploading your first ${type.slice(0, -1)}`
              : 'Try adjusting your filters or search query'
            }
          </p>
          {content.length === 0 && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Upload Your First {typeLabel.slice(0, -1)}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              type={type}
              onEdit={() => {
                setEditingItem(item)
                setShowUploadModal(true)
              }}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {showUploadModal && (
          <UploadModal
            type={type}
            editingItem={editingItem}
            onClose={() => {
              setShowUploadModal(false)
              setEditingItem(null)
            }}
            onSuccess={() => {
              setShowUploadModal(false)
              setEditingItem(null)
              fetchContent()
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function ContentCard({ item, type, onEdit, onDelete }: { 
  item: ContentItem
  type: string
  onEdit: () => void
  onDelete: () => void
}) {
  const coverImage = item.cover_url || item.thumbnail_url || '/Watermark.jpg'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card overflow-hidden group hover:shadow-2xl hover:shadow-primary-gold/20 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={coverImage} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.published ? 'bg-green-500 text-white' : 'bg-yellow-500 text-dark-900'
          }`}>
            {item.published ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2 line-clamp-2">
          {item.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-primary-gold-light/70 mb-3">
          <span className="bg-primary-gold/10 px-2 py-1 rounded">{item.genre}</span>
          <span className="font-semibold text-primary-gold">₵{item.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-primary-gold-light/60 mb-4">
          <div className="flex items-center space-x-4">
            {(item.views !== undefined || item.plays !== undefined) && (
              <span>{type === 'audio' ? `${item.plays || 0} plays` : `${item.views || 0} views`}</span>
            )}
            {item.duration && <span>{Math.floor(item.duration / 60)}m</span>}
            {item.pages && <span>{item.pages} pages</span>}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="flex-1 py-2 px-3 rounded-lg bg-primary-gold/10 hover:bg-primary-gold/20 text-primary-gold transition-colors flex items-center justify-center space-x-2"
          >
            <Edit size={16} />
            <span>Edit</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            className="py-2 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Upload Modal Component
function UploadModal({ type, editingItem, onClose, onSuccess }: { 
  type: string
  editingItem: ContentItem | null
  onClose: () => void
  onSuccess: () => void
}) {
  const [formData, setFormData] = useState({
    title: editingItem?.title || '',
    description: editingItem?.description || '',
    genre: editingItem?.genre || 'Romance',
    price: editingItem?.price || (type === 'stories' ? 5 : type === 'audio' ? 3 : 7),
    language: 'English',
    pages: editingItem?.pages || 0,
    duration: editingItem?.duration || 0,
    published: editingItem?.published || false
  })

  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [contentFile, setContentFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string>(editingItem?.cover_url || editingItem?.thumbnail_url || '')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const coverInputRef = useRef<HTMLInputElement>(null)
  const contentInputRef = useRef<HTMLInputElement>(null)

  const handleCoverChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setCoverFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setCoverPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const uploadToCloudinary = async (file: File, folder: string, resourceType: 'image' | 'video' | 'raw') => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)
    formData.append('resourceType', resourceType)
    const response = await fetch('/api/upload', { method: 'POST', body: formData })
    if (!response.ok) throw new Error('Upload failed')
    return await response.json()
  }

  const handleSubmit = async (e: React.FormEvent, publishNow: boolean) => {
    e.preventDefault()
    if (!formData.title.trim()) return alert('Please enter a title')
    if (!editingItem && (!coverFile || !contentFile)) {
      return alert('Please upload both cover image and content file')
    }

    setUploading(true)
    setUploadProgress(10)

    try {
      let coverUrl = editingItem?.cover_url || editingItem?.thumbnail_url || ''
      let coverPublicId = ''
      let contentUrl = editingItem?.pdf_url || editingItem?.audio_url || editingItem?.video_url || ''
      let contentPublicId = ''

      if (coverFile) {
        setUploadProgress(30)
        const coverResult = await uploadToCloudinary(coverFile, type, 'image')
        coverUrl = coverResult.url
        coverPublicId = coverResult.publicId
      }

      if (contentFile) {
        setUploadProgress(60)
        const resourceType = type === 'stories' ? 'raw' : type === 'animations' ? 'video' : 'raw'
        const contentResult = await uploadToCloudinary(contentFile, type, resourceType)
        contentUrl = contentResult.url
        contentPublicId = contentResult.publicId
      }

      setUploadProgress(80)

      const apiData: any = {
        title: formData.title,
        genre: formData.genre,
        description: formData.description,
        price: Number(formData.price),
        language: formData.language,
        published: publishNow
      }

      if (type === 'stories') {
        apiData.cover_url = coverUrl
        apiData.pdf_url = contentUrl
        apiData.pages = Number(formData.pages) || 0
        if (coverPublicId) apiData.cloudinary_cover_id = coverPublicId
        if (contentPublicId) apiData.cloudinary_pdf_id = contentPublicId
      } else if (type === 'audio') {
        apiData.cover_url = coverUrl
        apiData.audio_url = contentUrl
        apiData.duration = Number(formData.duration) || 0
        if (coverPublicId) apiData.cloudinary_cover_id = coverPublicId
        if (contentPublicId) apiData.cloudinary_audio_id = contentPublicId
      } else {
        apiData.thumbnail_url = coverUrl
        apiData.video_url = contentUrl
        apiData.duration = Number(formData.duration) || 0
        if (coverPublicId) apiData.cloudinary_thumbnail_id = coverPublicId
        if (contentPublicId) apiData.cloudinary_video_id = contentPublicId
      }

      const method = editingItem ? 'PUT' : 'POST'
      const url = editingItem ? `/api/admin/${type}/${editingItem.id}` : `/api/admin/${type}`
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      })

      if (!response.ok) throw new Error('Failed to save content')
      setUploadProgress(100)
      setTimeout(() => onSuccess(), 500)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload. Please try again.')
      setUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-sm" onClick={uploading ? undefined : onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-dark-800 rounded-2xl border border-primary-gold/30 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 z-10 bg-dark-800 border-b border-primary-gold/20 px-8 py-4 flex items-center justify-between">
          <h2 className="font-playfair text-3xl font-bold text-primary-gold">
            {editingItem ? 'Edit' : 'Upload New'} {type.slice(0, -1).charAt(0).toUpperCase() + type.slice(1, -1)}
          </h2>
          <button onClick={onClose} disabled={uploading} className="text-primary-gold-light hover:text-primary-gold transition-colors disabled:opacity-50">
            <X size={24} />
          </button>
        </div>

        <form className="p-8 space-y-6">
          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-primary-gold-light">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary-gold to-accent-orange"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-primary-gold-light mb-2 font-medium">Title *</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter title" disabled={uploading} className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold disabled:opacity-50" required />
          </div>

          <div>
            <label className="block text-primary-gold-light mb-2 font-medium">Description</label>
            <textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Enter description" disabled={uploading} className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold disabled:opacity-50" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Genre *</label>
              <select value={formData.genre} onChange={(e) => setFormData({ ...formData, genre: e.target.value })} disabled={uploading} className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold disabled:opacity-50">
                <option>Romance</option>
                <option>Thriller</option>
                <option>Educational</option>
                <option>Bedtime</option>
                <option>Moral</option>
                <option>Adventure</option>
                <option>African Legends</option>
                <option>Drama</option>
                <option>Fantasy</option>
              </select>
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Price (₵) *</label>
              <input type="number" step="0.01" min="0" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} disabled={uploading} className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold disabled:opacity-50" required />
            </div>
          </div>

          {type === 'stories' && (
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Number of Pages</label>
              <input type="number" min="0" value={formData.pages} onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value) })} disabled={uploading} className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold disabled:opacity-50" />
            </div>
          )}

          {(type === 'audio' || type === 'animations') && (
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Duration (seconds)</label>
              <input type="number" min="0" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })} disabled={uploading} className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold disabled:opacity-50" />
            </div>
          )}

          <div>
            <label className="block text-primary-gold-light mb-2 font-medium">{type === 'stories' ? 'Cover Image' : 'Thumbnail'} {!editingItem && '*'}</label>
            {coverPreview && (
              <div className="mb-4 relative w-full h-48 rounded-lg overflow-hidden border border-primary-gold/30">
                <img src={coverPreview} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => { setCoverPreview(''); setCoverFile(null) }} disabled={uploading} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50">
                  <X size={16} />
                </button>
              </div>
            )}
            <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed border-primary-gold/30' : 'hover:border-primary-gold border-primary-gold/30'}`} onClick={() => !uploading && coverInputRef.current?.click()}>
              <ImageIcon size={48} className="text-primary-gold mx-auto mb-4" />
              <p className="text-primary-gold-light mb-2">{coverFile ? coverFile.name : 'Click to upload or drag and drop'}</p>
              <p className="text-primary-gold-light/50 text-sm">JPG or PNG up to 10MB</p>
              <input ref={coverInputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleCoverChange(e.target.files[0])} disabled={uploading} className="hidden" />
            </div>
          </div>

          <div>
            <label className="block text-primary-gold-light mb-2 font-medium">{type === 'stories' ? 'Story File (PDF)' : type === 'audio' ? 'Audio File (MP3)' : 'Video File (MP4)'} {!editingItem && '*'}</label>
            <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed border-primary-gold/30' : 'hover:border-primary-gold border-primary-gold/30'}`} onClick={() => !uploading && contentInputRef.current?.click()}>
              {type === 'stories' && <FileText size={48} className="text-primary-gold mx-auto mb-4" />}
              {type === 'audio' && <Music size={48} className="text-primary-gold mx-auto mb-4" />}
              {type === 'animations' && <Film size={48} className="text-primary-gold mx-auto mb-4" />}
              <p className="text-primary-gold-light mb-2">{contentFile ? contentFile.name : 'Click to upload or drag and drop'}</p>
              <p className="text-primary-gold-light/50 text-sm">{type === 'stories' ? 'PDF up to 50MB' : type === 'audio' ? 'MP3 up to 100MB' : 'MP4 up to 500MB'}</p>
              <input ref={contentInputRef} type="file" accept={type === 'stories' ? '.pdf' : type === 'audio' ? '.mp3,audio/*' : '.mp4,video/*'} onChange={(e) => e.target.files?.[0] && setContentFile(e.target.files[0])} disabled={uploading} className="hidden" />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <motion.button type="button" onClick={(e) => handleSubmit(e, false)} disabled={uploading} whileHover={{ scale: uploading ? 1 : 1.02 }} whileTap={{ scale: uploading ? 1 : 0.98 }} className="flex-1 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light hover:bg-dark-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium">
              Save as Draft
            </motion.button>
            <motion.button type="button" onClick={(e) => handleSubmit(e, true)} disabled={uploading} whileHover={{ scale: uploading ? 1 : 1.02 }} whileTap={{ scale: uploading ? 1 : 0.98 }} className="flex-1 py-3 rounded-lg bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 font-semibold hover:shadow-lg hover:shadow-primary-gold/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {uploading ? 'Uploading...' : 'Publish Now'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
