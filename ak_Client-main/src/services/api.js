import axios from "./axiosInstance";

// API functions
export const homeApi = {
  // Get admin counts
  fetchCount: () => {
    return apiClient.get("admin_get_count");
  },

  // Get flagged content with limit
  getFlaggedContent: () => {
    return apiClient.get("admin_get_reported_post_details_2_limit");
  },

  // Get university/campus info
  fetchUniversity: () => {
    return apiClient.get("admin_get_Primary_campus_info");
  },

  // Get homepage counts
  getAllCounts: () => {
    return apiClient.get("admin_get_homepage_cnts");
  },

  // Get bounce rate and analytics
  getBounceRate: () => {
    return apiClient.get("admin_calculate_student_metrics");
  },

  // Silence/unfreeze student
  silentStudent: (studentId) => {
    const formData = new FormData();
    formData.append("stud_id", studentId);
    return apiClient.post("admin_change_student_freez_acc_status", formData);
  },

  // Hide post
  hidePost: (postId) => {
    const formData = new FormData();
    formData.append("f_id", postId);
    return apiClient.post("admin_flagged_content_hide_post", formData);
  },
};

// Error handler utility
export const handleApiError = (error, defaultMessage = "An error occurred") => {
  console.error("API Error:", error);
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return defaultMessage;
};

// Response handler utility
export const handleApiResponse = (response, successCallback, errorCallback) => {
  const errorCode = response.data.error_code;
  
  if (errorCode === 200) {
    successCallback(response.data.data);
  } else {
    const errorMessage = response.data.message || "Request failed";
    errorCallback(errorMessage);
  }
};