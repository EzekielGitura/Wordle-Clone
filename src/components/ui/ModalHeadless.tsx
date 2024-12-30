import { motion, AnimatePresence } from "framer-motion";
import FocusLock from "react-focus-lock";
import { cn } from "../../lib/utils";

interface ModalHeadlessProps {
  children: React.ReactNode;
  onOverlayClick: () => void;
  isOpen: boolean;
  center?: boolean;
  className?: string;
}

function ModalHeadless({ children, onOverlayClick, isOpen, center = true, className }: ModalHeadlessProps) {
  const bg = "bg-zinc-900 border-zinc-800 text-zinc-100";
  const bgOverlay = "bg-zinc-800/95";
  const centerClassForOverlay = center ? "items-center py-4" : "py-4";
  const centerClassForModal = center ? "" : "mt-8 sm:mt-12";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn("w-full h-dvh flex justify-center fixed top-0 left-0 z-50 px-4", bgOverlay, centerClassForOverlay)}
          onClick={onOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className={cn(`rounded-lg overflow-hidden w-full max-h-min`, bg, centerClassForModal, className)}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <FocusLock returnFocus={true}>{children}</FocusLock>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalHeadless;
