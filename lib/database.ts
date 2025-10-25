import { supabase, Story, AudioStory, Animation, Purchase } from './supabase'

// Stories CRUD Operations
export const storiesDB = {
  // Get all published stories
  async getAll(filters?: { genre?: string; search?: string }) {
    let query = supabase
      .from('stories')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (filters?.genre && filters.genre !== 'All') {
      query = query.eq('genre', filters.genre)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Story[]
  },

  // Get all stories (including drafts) for admin
  async getAllAdmin() {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data: data as Story[], error }
  },

  // Get single story by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Story
  },

  // Create new story
  async create(story: Omit<Story, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('stories')
      .insert([story])
      .select()
      .single()

    if (error) throw error
    return data as Story
  },

  // Update story
  async update(id: string, updates: Partial<Story>) {
    const { data, error } = await supabase
      .from('stories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Story
  },

  // Delete story
  async delete(id: string) {
    const { error } = await supabase
      .from('stories')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  },

  // Increment views
  async incrementViews(id: string) {
    const { data: story } = await supabase
      .from('stories')
      .select('views')
      .eq('id', id)
      .single()

    if (story) {
      await supabase
        .from('stories')
        .update({ views: story.views + 1 })
        .eq('id', id)
    }
  },
}

// Audio Stories CRUD Operations
export const audioStoriesDB = {
  async getAll(filters?: { genre?: string; search?: string }) {
    let query = supabase
      .from('audio_stories')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (filters?.genre && filters.genre !== 'All') {
      query = query.eq('genre', filters.genre)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return data as AudioStory[]
  },

  // Get all audio (including drafts) for admin
  async getAllAdmin() {
    const { data, error } = await supabase
      .from('audio_stories')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data: data as AudioStory[], error }
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('audio_stories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as AudioStory
  },

  async create(audio: Omit<AudioStory, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('audio_stories')
      .insert([audio])
      .select()
      .single()

    if (error) throw error
    return data as AudioStory
  },

  async update(id: string, updates: Partial<AudioStory>) {
    const { data, error } = await supabase
      .from('audio_stories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as AudioStory
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('audio_stories')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  },

  async incrementPlays(id: string) {
    const { data: audio } = await supabase
      .from('audio_stories')
      .select('plays')
      .eq('id', id)
      .single()

    if (audio) {
      await supabase
        .from('audio_stories')
        .update({ plays: audio.plays + 1 })
        .eq('id', id)
    }
  },
}

// Animations CRUD Operations
export const animationsDB = {
  async getAll(filters?: { genre?: string; search?: string }) {
    let query = supabase
      .from('animations')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (filters?.genre && filters.genre !== 'All') {
      query = query.eq('genre', filters.genre)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Animation[]
  },

  // Get all animations (including drafts) for admin
  async getAllAdmin() {
    const { data, error } = await supabase
      .from('animations')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data: data as Animation[], error }
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('animations')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Animation
  },

  async create(animation: Omit<Animation, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('animations')
      .insert([animation])
      .select()
      .single()

    if (error) throw error
    return data as Animation
  },

  async update(id: string, updates: Partial<Animation>) {
    const { data, error } = await supabase
      .from('animations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Animation
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('animations')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  },

  async incrementViews(id: string) {
    const { data: animation } = await supabase
      .from('animations')
      .select('views')
      .eq('id', id)
      .single()

    if (animation) {
      await supabase
        .from('animations')
        .update({ views: animation.views + 1 })
        .eq('id', id)
    }
  },
}

// Purchases Operations
export const purchasesDB = {
  async create(purchase: Omit<Purchase, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('purchases')
      .insert([purchase])
      .select()
      .single()

    if (error) throw error
    return data as Purchase
  },

  async getByEmail(email: string) {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_email', email)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Purchase[]
  },

  async updateStatus(id: string, status: 'pending' | 'completed' | 'failed') {
    const { data, error } = await supabase
      .from('purchases')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Purchase
  },

  async getAll() {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Purchase[]
  },

  async getStats() {
    const { data, error } = await supabase
      .from('purchases')
      .select('amount, status, content_type')
      .eq('status', 'completed')

    if (error) throw error

    const totalRevenue = data.reduce((sum, p) => sum + Number(p.amount), 0)
    const totalSales = data.length
    const byType = {
      story: data.filter(p => p.content_type === 'story').length,
      audio: data.filter(p => p.content_type === 'audio').length,
      animation: data.filter(p => p.content_type === 'animation').length,
    }

    return { totalRevenue, totalSales, byType }
  },
}
