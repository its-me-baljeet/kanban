import { motion, AnimatePresence } from "framer-motion";

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center px-4"
                onClick={onCancel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-zinc-800 text-black dark:text-white p-6 rounded-xl max-w-sm w-full shadow-xl"
                >
                    <h2 className="text-xl font-semibold mb-4">Delete Task</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                        Are you sure you want to delete this task? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ConfirmDeleteModal;
