import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Contact from '../views/ContactView.vue';
import Training from '../views/TrainingView.vue';
import VehiclesView from '../views/VehiclesView.vue';
import BookingsView from '../views/BookingsView.vue';
import LegalInfoView from '../views/LegalInfoView.vue';
import FAQView from '../views/FAQView.vue';
import LoginView from '../views/Registration/LoginView.vue';
import SignupView from '../views/Registration/SignUpView.vue';
import ForgotPassword from '../views/Registration/ForgotPassword.vue';
import AdminDashboard from '../views/Admin/AdminDashboard.vue';
import ProfileView from '../views/ProfileView.vue';
import NotFound from '../components/NotFound.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '@/services/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'


const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/training', name: 'Training', component: Training },
  { path: '/vehicles', name: 'VehiclesView', component: VehiclesView },
  { path: '/bookings', name: 'BookingsView', component: BookingsView },
  { path: '/profile', name: 'ProfileView', component: ProfileView },
  { path: '/legal', name: 'LegalInfoView', component: LegalInfoView },
  { path: '/faq', name: 'FAQView', component: FAQView },
  { path: '/login', name: 'LoginView', component: LoginView },
  { path: '/signup', name: 'SignupView', component: SignupView },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  
  if (!requiresAuth && !requiresAdmin) {
    return next()
  }

  const auth = getAuth()
  
  // Wait for auth state to be determined
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe() // Unsubscribe after first call
      
      if (requiresAuth && !user) {
        // Not logged in, redirect to login
        return resolve(next({ path: '/login' }))
      }

      if (requiresAdmin) {
        if (!user) {
          return resolve(next({ path: '/login' }))
        }
        // Fetch user role from Firestore
        try {
          const userDocRef = doc(db, 'users', user.uid)
          const userSnap = await getDoc(userDocRef)
          if (userSnap.exists() && userSnap.data().role === 'admin') {
            return resolve(next())
          } else {
            // Not an admin, redirect to home
            return resolve(next({ path: '/' }))
          }
        } catch (e) {
          // On error, redirect to home
          return resolve(next({ path: '/' }))
        }
      }

      resolve(next())
    })
  })
})

export default router;