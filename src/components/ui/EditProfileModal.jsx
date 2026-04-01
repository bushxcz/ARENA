import { useState, useRef, useEffect } from 'react'
import Modal from './Modal'
import Input from './Input'
import Button from './Button'

function EditProfileModal({ isOpen, onClose, user, onSave, accentColor = '#00FF88', currentAvatar }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
  })
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef(null)

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
      })
      setAvatarPreview(null)
      setAvatarFile(null)
      setSaved(false)
    }
  }, [isOpen, user])

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleFileSelect(file) {
    if (file && file.type.startsWith('image/')) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setAvatarPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  function handleDragOver(e) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e) {
    e.preventDefault()
    setIsDragging(false)
  }

  async function handleSave() {
    setSaving(true)

    // Simulate a small delay for realism
    await new Promise((r) => setTimeout(r, 400))

    const updates = {}
    if (form.name && form.name !== user.name) updates.name = form.name
    if (form.email && form.email !== user.email) updates.email = form.email
    if (form.bio !== (user.bio || '')) updates.bio = form.bio
    if (avatarPreview) updates.avatarUrl = avatarPreview

    onSave(updates)
    setSaving(false)
    setSaved(true)
    setTimeout(() => {
      onClose()
    }, 800)
  }

  const displayAvatar = avatarPreview || currentAvatar

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      description="Update your profile information and avatar."
    >
      <div className="space-y-5">
        {/* Avatar Upload Section */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={{
              width: '100px',
              height: '100px',
            }}
          >
            {/* Avatar image */}
            <img
              src={displayAvatar}
              alt="Avatar preview"
              className="w-full h-full rounded-lg object-cover transition-all duration-300"
              style={{
                border: `2px solid ${isDragging ? accentColor : 'rgba(255,255,255,0.1)'}`,
                boxShadow: isDragging ? `0 0 25px ${accentColor}30` : '0 0 20px rgba(0,0,0,0.3)',
                filter: isDragging ? 'brightness(1.2)' : 'brightness(1)',
              }}
            />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 rounded-lg flex flex-col items-center justify-center gap-1 transition-opacity duration-300"
              style={{
                background: 'rgba(4,6,8,0.75)',
                opacity: isDragging ? 1 : 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => {
                if (!isDragging) e.currentTarget.style.opacity = '0'
              }}
            >
              <iconify-icon
                icon="solar:camera-linear"
                style={{ fontSize: '1.5rem', color: accentColor }}
              />
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.5rem',
                  color: '#E8E8E0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Change
              </span>
            </div>

            {/* Status indicator */}
            {avatarPreview && (
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: accentColor, border: '2px solid #12161E' }}
              >
                <iconify-icon
                  icon="solar:check-read-linear"
                  style={{ fontSize: '0.6rem', color: '#040608' }}
                />
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files[0])}
          />

          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.55rem',
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Click or drag an image to upload
          </span>
        </div>

        {/* Form Fields */}
        <Input
          label="Display Name"
          icon="solar:user-linear"
          placeholder="Enter your name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <Input
          label="Email Address"
          icon="solar:letter-linear"
          placeholder="Enter your email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />

        {/* Bio / Title Textarea */}
        <label className="block">
          <span
            className="mb-2 block"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              fontWeight: 500,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            Bio
          </span>
          <div className="relative">
            <iconify-icon
              icon="solar:document-text-linear"
              className="absolute left-3 top-3"
              style={{ color: '#6B7280', fontSize: '1rem' }}
            />
            <textarea
              placeholder="Tell us about yourself..."
              value={form.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={3}
              className="w-full outline-none transition-colors resize-none"
              style={{
                background: '#040608',
                border: '1px solid rgba(255,255,255,0.08)',
                paddingLeft: '2.5rem',
                paddingRight: '1rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                color: '#E8E8E0',
                borderRadius: 0,
              }}
            />
          </div>
        </label>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleSave}
            disabled={saving || saved}
            style={
              accentColor !== '#00FF88'
                ? { background: saved ? '#00FF88' : accentColor }
                : saved
                  ? { background: '#00FF88' }
                  : {}
            }
          >
            {saving ? (
              <>
                <iconify-icon icon="solar:refresh-linear" style={{ fontSize: '0.85rem', animation: 'spin 1s linear infinite' }} />
                Saving...
              </>
            ) : saved ? (
              <>
                <iconify-icon icon="solar:check-circle-linear" style={{ fontSize: '0.85rem' }} />
                Saved!
              </>
            ) : (
              <>
                <iconify-icon icon="solar:diskette-linear" style={{ fontSize: '0.85rem' }} />
                Save Changes
              </>
            )}
          </Button>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Modal>
  )
}

export default EditProfileModal
