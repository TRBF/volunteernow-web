import axios from 'axios';

const API_BASE_URL = 'https://api.volunteernow.ro/api';
const MEDIA_BASE_URL = 'https://api.volunteernow.ro';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper function to get full media URL
const getMediaUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${MEDIA_BASE_URL}${path}`;
};

// Opportunity Service
export const opportunityService = {
  // Expected response: Array of {
  //   id: number,
  //   title: string,
  //   description: string,
  //   date: string,
  //   location: string,
  //   organization: string,
  //   image_url: string,
  //   likes: number
  // }
  getOpportunities: async () => {
    const response = await api.get('/get_opportunities/');
    // Transform the response to match the expected format
    return response.data.map((opportunity: any) => ({
      id: opportunity.id || '',
      title: opportunity.name || '', // API returns 'name' instead of 'title'
      description: opportunity.description || '',
      image_url: getMediaUrl(opportunity.post_image), // Handle media URL
      location: opportunity.location || '',
      date: opportunity.time || '', // API returns 'time' instead of 'date'
      organization: opportunity.organization || '',
      likes: opportunity.like_count || 0, // API returns 'like_count' instead of 'likes'
      comments: opportunity.comments || [],
    }));
  },

  // Expected response: Same as single item in getOpportunities
  getOpportunityById: async (opportunityId: string) => {
    const response = await api.get(`/get_opportunity_by_id/${opportunityId}`);
    const data = response.data;
    return {
      id: data.id || '',
      title: data.name || '',
      description: data.description || '',
      image_url: getMediaUrl(data.post_image),
      location: data.location || '',
      date: data.time || '',
      organization: data.organization || '',
      requirements: Array.isArray(data.requirements) ? data.requirements : [],
      participants: Array.isArray(data.participants) ? data.participants.map((p: any) => ({
        id: p.id || '',
        username: p.username || '',
        profile_picture: getMediaUrl(p.profile_picture),
      })) : [],
      likes: data.like_count || 0,
      comments: data.comments || [],
    };
  },

  // Expected response: { message: string }
  likeOpportunity: async (opportunityId: string) => {
    const response = await api.post(`/like_opportunity/${opportunityId}`);
    return response.data;
  },

  // Expected response: { message: string }
  addComment: async (opportunityId: string, content: string) => {
    const response = await api.post(`/add_comment/${opportunityId}`, { content });
    return response.data;
  },
};

// Auth Service
export const authService = {
  // Expected response: { token: string, user: { id: number, username: string, email: string } }
  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post('/login/', credentials);
    return response.data;
  },

  // Expected response: { token: string, user: { id: number, username: string, email: string } }
  register: async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post('/register/', userData);
    return response.data;
  },

  // Expected response: { token: string, user: { id: number, username: string, email: string } }
  signUp: async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post('/register/', userData);
    return response.data;
  },

  // Expected response: { message: string }
  logout: async () => {
    const response = await api.post('/logout/');
    return response.data;
  },

  // Check if user is logged in by verifying token exists
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },
};

// Profile Service
export const profileService = {
  // Expected response: {
  //   id: number,
  //   profile_picture: string,
  //   username: string,
  //   first_name: string,
  //   last_name: string,
  //   name: string,
  //   date_of_birth: string,
  //   gender: string | null,
  //   description: string,
  //   account_type: string,
  //   cover_image: string | null,
  //   user: number,
  //   hours: number,
  //   most_fq: string,
  //   count: number
  // }
  getUserProfileById: async (userId: number) => {
    const response = await api.get(`/get_user_profile/${userId}`);
    return response.data;
  },

  // Expected response: Same as getUserProfileById
  updateProfile: async (profileData: {
    first_name?: string;
    last_name?: string;
    bio?: string;
    skills?: string[];
    interests?: string[];
  }) => {
    const response = await api.patch('/update_profile/', profileData);
    return response.data;
  },

  // Expected response: { profile_picture: string }
  updateProfilePicture: async (file: File) => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    const response = await api.patch('/update_profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Experience Service
export const experienceService = {
  // Expected response: Array of {
  //   id: number,
  //   title: string,
  //   description: string,
  //   date: string,
  //   skills: string[],
  //   impact: string,
  //   images: string[]
  // }
  getExperiences: async () => {
    const response = await api.get('/get_experiences/');
    return response.data;
  },

  // Expected response: Same as getExperiences but filtered for current user
  getUserExperience: async () => {
    const response = await api.get('/get_user_experiences/');
    return response.data;
  },

  // Expected response: Same as single item in getExperiences
  addExperience: async (experienceData: {
    title: string;
    description: string;
    date: string;
    skills: string[];
    impact: string;
    images?: File[];
    startDate?: Date;
    endDate?: Date;
    organization?: string;
    role?: string;
  }) => {
    const formData = new FormData();
    Object.entries(experienceData).forEach(([key, value]) => {
      if (key === 'images' && Array.isArray(value)) {
        const files = (value as unknown[]).filter((item: unknown): item is File => item instanceof File);
        files.forEach((file: File) => {
          formData.append('images', file);
        });
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });
    const response = await api.post('/add_experience/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Expected response: { message: string }
  deleteExperience: async (experienceId: string) => {
    const response = await api.delete(`/delete_experience/${experienceId}`);
    return response.data;
  },
};

// Callouts Service
export const calloutsService = {
  // Expected response: Array of {
  //   id: number,
  //   title: string,
  //   description: string,
  //   date: string,
  //   location: string,
  //   required_skills: string[],
  //   priority: 'high' | 'medium' | 'low',
  //   organization: string,
  //   status: 'open' | 'closed'
  // }
  getCallouts: async () => {
    const response = await api.get('/get_callouts/');
    return response.data;
  },

  // Expected response: Same as single item in getCallouts
  respondToCallout: async (calloutId: string, responseData: { message: string }) => {
    const apiResponse = await api.post(`/respond_to_callout/${calloutId}`, responseData);
    return apiResponse.data;
  },
};

// Applications Service
export const applicationsService = {
  // Expected response: Array of {
  //   id: number,
  //   opportunity: {
  //     id: number,
  //     title: string,
  //     description: string,
  //     date: string
  //   },
  //   status: 'pending' | 'accepted' | 'rejected',
  //   applied_date: string,
  //   message: string
  // }
  getApplications: async () => {
    const response = await api.get('/get_applications/');
    return response.data;
  },

  // Expected response: Same as single item in getApplications
  submitApplication: async (opportunityId: string, applicationData: { message: string }) => {
    const response = await api.post(`/submit_application/${opportunityId}`, applicationData);
    return response.data;
  },
};

// Archive Service
export const archiveService = {
  // Expected response: Array of {
  //   id: number,
  //   title: string,
  //   description: string,
  //   date: string,
  //   location: string,
  //   organization: string,
  //   impact: string,
  //   images: string[],
  //   rating: number
  // }
  getPastEvents: async () => {
    const response = await api.get('/get_past_events/');
    return response.data;
  },
};

// Notifications Service
export const notificationsService = {
  // Expected response: Array of {
  //   id: number,
  //   title: string,
  //   message: string,
  //   created_at: string,
  //   read: boolean,
  //   opportunity_id: number,
  //   type: 'application_update' | 'new_callout' | 'reminder'
  // }
  getNotifications: async () => {
    const response = await api.get('/get_notifications/');
    return response.data;
  },

  // Expected response: { message: string }
  markAsRead: async (notificationId: number) => {
    const response = await api.patch(`/mark_notification_read/${notificationId}`);
    return response.data;
  },

  // Expected response: { message: string }
  deleteNotification: async (notificationId: number) => {
    const response = await api.delete(`/delete_notification/${notificationId}`);
    return response.data;
  },
};

export const searchService = {
  search: async (query: string) => {
    if (!query) return [];
    const response = await api.get(`/search/${query}`);
    return response.data;
  },
};

export const fileService = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload_file/', formData);
    return response.data;
  },
}; 