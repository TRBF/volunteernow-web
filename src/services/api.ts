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
    config.headers.Authorization = `Token ${token}`;
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
        organization: opportunity.organization || 'VolunteerNow',
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
        organization: data.organization || 'VolunteerNow',
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
  // Expected response: { token: string, user: { id: number, username: string } }
  login: async (credentials: { username: string; password: string }) => {
    try {
      // First get CSRF token
      await api.get('/csrf/');
      
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      
      const response = await api.post('/get_token/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.token) {
        // Store the token
        const token = response.data.token;
        localStorage.setItem('token', token);
        
        // Get user ID
        const idResponse = await api.get('/get_id/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        
        const userId = idResponse.data.id;
        localStorage.setItem('user_id', userId.toString());
        localStorage.setItem('username', credentials.username);

        return {
          token: token,
          user: {
            id: userId,
            username: credentials.username
          }
        };
      }
      
      throw new Error('Login failed');
    } catch (error: any) {
      if (error.response) {
        throw error;
      }
      throw new Error('Login failed. Please try again.');
    }
  },

  // Expected response: { token: string, user: { id: number, username: string, email: string } }
  register: async (userData: { 
    username: string; 
    email: string; 
    password: string;
    first_name?: string;
    last_name?: string;
    gender?: string;
    birthday?: string;
    parent_email?: string;
  }) => {
    const response = await api.post('/register/', userData);
    return response.data;
  },

  // Expected response: { token: string, user: { id: number, username: string, email: string } }
  signUp: async (userData: { 
    username: string; 
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    gender?: string;
    birthday?: string;
    parent_email?: string;
  }) => {
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
    const response = await api.get(`/get_user_profile_by_id/${userId}?format=json`);
    return response.data;
  },

  getUserProfilePictureById: async (userId: number) => {
    const response = await api.get(`/get_user_profile_by_id/${userId}?format=json`);
    console.log("url: " + MEDIA_BASE_URL + response.data["profile_picture"]);
    return MEDIA_BASE_URL + response.data["profile_picture"];
  },

  // Expected response: Same as getUserProfileById
  updateProfile: async (profileData: {
    username?: string;
    first_name?: string;
    last_name?: string;
    description?: string;
  }) => {
    // Update user data
    await api.put('/update_user/', {
      username: profileData.username,
      first_name: profileData.first_name,
      last_name: profileData.last_name,
    });

    // Update profile data
    await api.put('/update_user_profile/', {
      description: profileData.description,
    });

    // Return updated profile
    const userId = localStorage.getItem('user_id');
    const response = await api.get(`/get_user_profile_by_id/${userId}?format=json`);
    return response.data;
  },

  // Expected response: { profile_picture: string }
  updateProfilePicture: async (file: File, userId: number) => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    const response = await api.put(`/update_user_pfp/`, formData, {
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
  //   id: string,
  //   role: string,
  //   organiser: string,
  //   description: string,
  //   start_date: string,
  //   end_date: string,
  //   hours: string,
  //   participation_picture?: string
  // }
  getExperiences: async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) throw new Error('User not logged in');
    const response = await api.get(`/get_user_added_participations/${userId}/`);
    return response.data;
  },

  // Expected response: Same as getExperiences but filtered for specified user
  getUserExperience: async (userId: number) => {
    const response = await api.get(`/get_user_added_participations/${userId}/`);
    return response.data;
  },

  // Expected response: Same as single item in getExperiences
  addExperience: async (experienceData: {
    role: string;
    organiser: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    hours: string;
  }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not logged in');
    }

    // Format dates as YYYY-MM-DD
    const start_date = experienceData.startDate ? experienceData.startDate.toISOString().split('T')[0] : '';
    const end_date = experienceData.endDate ? experienceData.endDate.toISOString().split('T')[0] : '';

    const response = await api.post('/add_user_added_participation/', {
      role: experienceData.role,
      organiser: experienceData.organiser,
      description: experienceData.description,
      start_date: start_date,
      end_date: end_date,
      hours: experienceData.hours,
    });
    return response.data;
  },

  // Expected response: { message: string }
  deleteExperience: async (experienceId: string) => {
    const response = await api.delete(`/delete_user_added_participation/${experienceId}/`);
      return response.data;
  },

  // Expected response: Same as single item in getExperiences
  updateExperience: async (experienceId: string, experienceData: {
    role: string;
    organiser: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    hours: string;
  }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not logged in');
    }

    // Format dates as YYYY-MM-DD
    const start_date = experienceData.startDate ? experienceData.startDate.toISOString().split('T')[0] : '';
    const end_date = experienceData.endDate ? experienceData.endDate.toISOString().split('T')[0] : '';

    const response = await api.put(`/update_user_added_participation/${experienceId}/`, {
      role: experienceData.role,
      organiser: experienceData.organiser,
      description: experienceData.description,
      start_date: start_date,
      end_date: end_date,
      hours: experienceData.hours,
    });
    return response.data;
  },

  // Expected response: { message: string }
  updateExperiencePicture: async (experienceId: string, file: File) => {
    const formData = new FormData();
    formData.append('user_added_participation_picture', file);
    const response = await api.put(`/update_user_added_participation_picture/${experienceId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Callouts Service
export const calloutsService = {
  // Expected response: Array of {
  //   id: number,
  //   title: string,
  //   description: string,
  //   sender: { id: number, username: string },
  //   opportunity: { id: number, name: string } | null,
  //   callout_picture: string | null,
  //   time: string
  // }
  getCallouts: async () => {
    const response = await api.get('/get_callouts/');
    return response.data.map((callout: any) => ({
      id: callout.id,
      title: callout.title,
      description: callout.description,
      organization: callout.sender?.user?.username || 'VolunteerNow',
      organizationLogo: callout.sender?.profile_picture ? getMediaUrl(callout.sender.profile_picture) : undefined,
      calloutPicture: callout.callout_picture ? getMediaUrl(callout.callout_picture) : undefined,
      opportunity: callout.opportunity ? {
        id: callout.opportunity,
        name: callout.title
      } : undefined
    }));
  },

  // Get callouts for the current user
  getUserCallouts: async () => {
    const response = await api.get('/get_user_callouts/');
    return response.data.map((callout: any) => ({
      id: callout.id,
      title: callout.title,
      description: callout.description,
      organization: callout.sender?.user?.username || 'VolunteerNow',
      organizationLogo: callout.sender?.profile_picture ? getMediaUrl(callout.sender.profile_picture) : undefined,
      calloutPicture: callout.callout_picture ? getMediaUrl(callout.callout_picture) : undefined,
      opportunity: callout.opportunity ? {
        id: callout.opportunity,
        name: callout.title
      } : undefined
    }));
  },

  // Expected response: { message: string }
  respondToCallout: async (calloutId: string, responseData: { message: string }) => {
    const apiResponse = await api.post(`/respond_to_callout/${calloutId}`, responseData);
    return apiResponse.data;
  },
};

// Archive Service
export const archiveService = {
  // Expected response: Array of {
  //   id: number,
  //   name: string,
  //   description: string,
  //   time: string,
  //   location: string,
  //   post_image: string,
  //   profile_picture: string,
  //   participation_picture?: string
  // }
  getPastEvents: async () => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User not logged in');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      console.log('Fetching past events for user:', userId);
      const response = await api.get(`/get_user_participations/${userId}/?format=json`);
      console.log('API Response:', response.data);

      if (!response.data) {
        throw new Error('No data received from server');
      }

      return response.data;
    } catch (error) {
      console.error('Archive service error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Please log in to view your past participations');
        }
        if (error.response?.status === 404) {
          throw new Error('No past participations found');
        }
        throw new Error(error.response?.data?.message || 'Failed to load past events');
      }
      throw error;
    }
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
    try {
      const response = await api.get(`/search/${query}?format=json`);
      const results = response.data;
      
      // Process results
      if (!Array.isArray(results)) {
        return [];
      }

      return results.map((result: any) => {
        if (result.name) {
          // This is an opportunity
          return {
            id: result.id,
            title: result.name,
            organization: result.organization || 'VolunteerNow',
            image_url: result.post_image ? `${MEDIA_BASE_URL}${result.post_image}` : '',
            type: 'opportunity'
          };
        } else if (result.username) {
          // This is a user
          return {
            id: result.id,
            username: result.username,
            first_name: result.first_name || '',
            last_name: result.last_name || '',
            profile_picture: result.profile_picture ? `${MEDIA_BASE_URL}${result.profile_picture}` : '',
            type: 'user'
          };
        }
        return null;
      }).filter(Boolean);
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
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