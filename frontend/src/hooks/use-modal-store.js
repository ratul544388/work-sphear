import { create } from "zustand";

/**
 * @typedef {"createWorkEntry" | "updateWorkEntry" | "confirmModal" | "payroll" | "fireModal" | "payment"} ModalType
 */

/**
 * @typedef {{  }} ModalData
 */

/**
 * @typedef {Object} ModalState
 * @property {boolean} open
 * @property {ModalType | null} type
 * @property {ModalData | {}} data
 * @property {(type: ModalType, data: ModalData) => void} onOpen
 * @property {() => void} onClose
 */

/** @type {import("zustand").UseBoundStore<import("zustand").StoreApi<ModalState>>} */
export const useModalStore = create((set) => ({
  open: false,
  type: /** @type {ModalType | null} */ (null),
  data: {},

  /**
   * @param {ModalType} type
   * @param {ModalData} data
   */
  onOpen: (type, data) => set({ open: true, type, data }),

  onClose: () => set({ open: false, type: null }),
}));
