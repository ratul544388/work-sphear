import { create } from "zustand";

/**
 * @typedef {Object} AuthUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {"EMPLOYEE" | "HR" | "ADMIN"} role
 * @property {string | null} image
 * @property {boolean} isFired
 * @property {boolean} isProfileCompleted
 * @property {boolean} isVerified
 * @property {string} designation
 * @property {number} salary
 */

/**
 * @typedef {Object} AuthState
 * @property {AuthUser | null} user
 * @property {boolean} loading
 * @property {(user: AuthUser) => void} setUser
 */

export const useAuthStore = create(
  /** @returns {AuthState} */
  (set) => ({
    user: null,
    loading: true,
    setUser: (user) => set({ user, loading: false }),
  })
);
