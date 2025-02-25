import { create } from "zustand";

const useOffcanvasStore = create((set, get) => ({
  isVisible: false,
  toggleOffcanvas: () => {
    const newState = !get().isVisible;
    console.log("Toggling offcanvas:", newState);
    set({ isVisible: newState });
  },
  setIsVisible: (value) => {
    console.log("Setting offcanvas visibility:", value);
    set({ isVisible: Boolean(value) });
  },
  forceClose: () => {
    console.log("Forzando cierre del offcanvas");
    set({ isVisible: false });
    document.body.classList.remove("overflow-hidden");
    // Limpiar cualquier otro estado que pueda interferir
    document.body.style.overflow = "visible";
  },
}));

export default useOffcanvasStore;

/**
 * Cómo Funciona:

    Si llamas a toggleOffcanvas(true), el isVisible se establecerá en true.
    Si llamas a toggleOffcanvas(false), el isVisible se establecerá en false.
    Si no pasas ningún argumento (toggleOffcanvas()), se comportará como un alternador (cambiando entre true y false).
 */
