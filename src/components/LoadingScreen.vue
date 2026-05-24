<template>
    <div class="loading-screen">
        <div class="loading-content">
            <DotLottieVue class="loading-animation" autoplay loop src="https://lottie.host/312cc6c4-4510-44b2-860f-966537ee1328/JgFv2KEkb8.lottie" />
            
            <p class="loading-text">Loading your adventure...</p>
        </div>
    </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
</script>

<style scoped>
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    font-family: 'Arial', sans-serif;
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    animation: fadeIn 0.8s ease-in-out;
}

.loading-animation {
    width: 500px;
    height: auto;
    max-width: 90vw;
    margin-bottom: -3rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
    animation: gentle-pulse 2s ease-in-out infinite;
}

.loading-text {
    color: #000000;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    letter-spacing: 0.5px;
    opacity: 0.8;
    animation: textFade 3s ease-in-out infinite;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes gentle-pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }
}

@keyframes textFade {

    0%,
    100% {
        opacity: 0.8;
    }

    50% {
        opacity: 0.5;
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .loading-animation {
        width: 100px;
        margin-bottom: 20px;
    }

    .loading-text {
        font-size: 16px;
    }
}

@media (max-width: 480px) {
    .loading-animation {
        width: 320px;
        margin-bottom: -1rem;
    }

    .loading-text {
        font-size: 20px;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .loading-screen {
        background: #f5f5f5;
    }

    .loading-text {
        color: #333;
        opacity: 1;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {

    .loading-animation,
    .loading-text,
    .loading-content {
        animation: none;
    }
}
</style>