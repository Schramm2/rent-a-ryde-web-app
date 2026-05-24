// documentService.js - Handles all document-related API calls

import { API_BASE_URL } from './config'

// Upload a single document for a user
export const uploadDocument = async (userId, file, fileType = 'document', fileName = null) => {
  try {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('fileType', fileType);
    if (fileName) {
      formData.append('fileName', fileName);
    }

    const response = await fetch(`${API_BASE_URL}/api/documents/upload/${userId}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Upload failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

// Upload multiple documents for a user
export const uploadMultipleDocuments = async (userId, files, fileType = 'document') => {
  try {
    const formData = new FormData();
    
    // Append each file to the form data
    files.forEach((file) => {
      formData.append('documents', file);
    });
    
    formData.append('fileType', fileType);

    const response = await fetch(`${API_BASE_URL}/api/documents/upload-multiple/${userId}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Upload failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading multiple documents:', error);
    throw error;
  }
};

// Get all documents for a user
export const getUserDocuments = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/documents/user/${userId}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch documents: ${response.status}`);
    }

    const data = await response.json();
    
    // Ensure we return an array even if the API returns unexpected data
    if (data && Array.isArray(data)) {
      return data;
    } else if (data && data.documents && Array.isArray(data.documents)) {
      return data.documents;
    } else {
      console.warn('API returned unexpected format for user documents:', data);
      return [];
    }
  } catch (error) {
    console.error('Error getting user documents:', error);
    // Return empty array instead of throwing to prevent app crashes
    return [];
  }
};

// Get specific document info
export const getDocumentInfo = async (userId, fileName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/documents/user/${userId}/document/${fileName}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to get document info: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting document info:', error);
    throw error;
  }
};

// Delete a specific document
export const deleteDocument = async (userId, fileName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/documents/user/${userId}/document/${fileName}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to delete document: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// Replace a specific document
export const replaceDocument = async (userId, fileName, file, fileType = 'document') => {
  try {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('fileType', fileType);

    const response = await fetch(`${API_BASE_URL}/api/documents/replace/${userId}/${fileName}`, {
      method: 'PUT',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to replace document: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error replacing document:', error);
    throw error;
  }
};

// Get user images for preview
export const getUserImages = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/documents/user/${userId}/images`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch user images: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the images array from the response
    if (data && data.success && data.data) {
      return data.data;
    } else {
      console.warn('API returned unexpected format for user images:', data);
      return [];
    }
  } catch (error) {
    console.error('Error getting user images:', error);
    // Return empty array instead of throwing to prevent app crashes
    return [];
  }
};

// Helper function to validate file before upload
export const validateFile = (file, maxSize = 10 * 1024 * 1024) => { // 10MB default
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];

  if (!file) {
    throw new Error('No file provided');
  }

  if (file.size > maxSize) {
    throw new Error(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error('File type not supported');
  }

  return true;
};

// Helper function to get file extension
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

// Helper function to format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
