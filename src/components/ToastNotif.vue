<template>
    <teleport to="body">
      <div class="toast-container" :class="{ 'toast-container--admin': isAdminDashboard }">
        <transition-group name="toast" tag="div" class="toast-stack">
          <div
            v-for="toast in toasts"
            :key="toast.id"
            :class="['toast-item', `toast--${toast.type}`]"
          >
            <div class="toast-content">
              <div class="toast-icon">
                <svg v-if="toast.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                <svg v-else-if="toast.type === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <svg v-else-if="toast.type === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <svg v-else-if="toast.type === 'info'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </div>
              <div class="toast-message">
                <p class="toast-title">{{ toast.title }}</p>
                <p v-if="toast.message" class="toast-description">{{ toast.message }}</p>
              </div>
            </div>
            <button 
              @click="removeToast(toast.id)" 
              class="toast-close"
              aria-label="Close notification"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </transition-group>
      </div>
    </teleport>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { defineExpose } from 'vue'
  import { useRoute } from 'vue-router'
  
  // Toast state
  const toasts = ref([])
  let toastId = 0
  
  // Check if we're in admin dashboard
  const route = useRoute()
  const isAdminDashboard = ref(false)
  
  onMounted(() => {
    // Check if current route is admin dashboard
    isAdminDashboard.value = route.path === '/admin'
  })
  
  // Watch for route changes
  watch(() => route.path, (newPath) => {
    isAdminDashboard.value = newPath === '/admin'
  })
  
  // Toast configuration
  const defaultDuration = 4000 // 4 seconds
  

  
  // Add toast method
  const addToast = (type, title, message = '', duration = defaultDuration) => {
    const id = ++toastId
    const toast = {
      id,
      type,
      title,
      message,
      duration
    }
    
    toasts.value.push(toast)
    
    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
    
    return id
  }
  
  // Remove toast method
  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  // Clear all toasts
  const clearAllToasts = () => {
    toasts.value = []
  }
  
  // Convenience methods for different toast types
  const showSuccess = (title, message = '', duration = defaultDuration) => {
    return addToast('success', title, message, duration)
  }
  
  const showError = (title, message = '', duration = defaultDuration) => {
    return addToast('error', title, message, duration)
  }
  
  const showWarning = (title, message = '', duration = defaultDuration) => {
    return addToast('warning', title, message, duration)
  }
  
  const showInfo = (title, message = '', duration = defaultDuration) => {
    return addToast('info', title, message, duration)
  }
  
  // Expose methods for parent components
  defineExpose({
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo
  })
  

  </script>
  
  <style scoped>
  /* Color Variables - matching project theme */
  :root {
    --olive: #6B7C32;
    --sand: #D4B896;
    --charcoal: #2C2C2C;
    --tan: #C19A6B;
    --cream: #F5F1E8;
    --rust: #B85450;
    --forest: #4A5D23;
    --success: #22c55e;
  }
  
  .toast-container {
    position: fixed;
    top: 100px; /* Position below navbar (80px) + 20px margin */
    right: 20px;
    z-index: 10000;
    pointer-events: none;
  }
  
  .toast-container--admin {
    top: 20px; /* Position at top for admin dashboard */
  }
  
  .toast-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 400px;
  }
  
  .toast-item {
    pointer-events: auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(0, 0, 0, 0.08);
    overflow: hidden;
    min-width: 320px;
    backdrop-filter: blur(8px);
  }
  
  .toast-content {
    display: flex;
    align-items: flex-start;
    padding: 16px;
    gap: 12px;
  }
  
  .toast-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    margin-top: 2px;
  }
  
  .toast-icon svg {
    width: 100%;
    height: 100%;
  }
  
  .toast-message {
    flex: 1;
    min-width: 0;
  }
  
  .toast-title {
    font-weight: 600;
    font-size: 14px;
    line-height: 1.4;
    margin: 0 0 4px 0;
    color: #2c2c2c;
  }
  
  .toast-description {
    font-size: 13px;
    line-height: 1.4;
    margin: 0;
    color: #666;
  }
  
  .toast-close {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    color: #999;
    transition: all 0.2s ease;
  }
  
  .toast-close:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #666;
  }
  
  .toast-close svg {
    width: 16px;
    height: 16px;
  }
  
  /* Toast type styles - RentARyde brand colors */
  .toast--success {
    border-left: 4px solid var(--success, #22c55e);
  }
  
  .toast--success .toast-icon {
    color: var(--success, #22c55e);
  }
  
  .toast--error {
    border-left: 4px solid var(--rust, #B85450);
  }
  
  .toast--error .toast-icon {
    color: var(--rust, #B85450);
  }
  
  .toast--warning {
    border-left: 4px solid var(--tan, #C19A6B);
  }
  
  .toast--warning .toast-icon {
    color: var(--tan, #C19A6B);
  }
  
  .toast--info {
    border-left: 4px solid var(--olive, #6B7C32);
  }
  
  .toast--info .toast-icon {
    color: var(--olive, #6B7C32);
  }
  
  /* Toast animations */
  .toast-enter-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .toast-leave-active {
    transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  }
  
  .toast-enter-from {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
  }
  
  .toast-leave-to {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
  }
  
  .toast-move {
    transition: transform 0.3s ease;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .toast-container {
      top: auto;
      bottom: 20px;
      left: 20px;
      right: 20px;
    }
    
    .toast-container--admin {
      top: 20px;
      bottom: auto;
    }
    
    .toast-stack {
      max-width: none;
    }
    
    .toast-item {
      min-width: auto;
      width: 100%;
    }
    
    .toast-enter-from,
    .toast-leave-to {
      transform: translateY(100%) scale(0.95);
    }
  }
  
  @media (max-width: 480px) {
    .toast-container {
      left: 16px;
      right: 16px;
      bottom: 16px;
    }
    
    .toast-container--admin {
      top: 16px;
      bottom: auto;
    }
    
    .toast-content {
      padding: 14px;
      gap: 10px;
    }
    
    .toast-title {
      font-size: 13px;
    }
    
    .toast-description {
      font-size: 12px;
    }
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .toast-enter-active,
    .toast-leave-active,
    .toast-move {
      transition: none;
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .toast-item {
      background: #2c2c2c;
      border-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    
    .toast-title {
      color: #f5f5f5;
    }
    
    .toast-description {
      color: #ccc;
    }
    
    .toast-close {
      color: #999;
    }
    
    .toast-close:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ccc;
    }
  }
  </style>