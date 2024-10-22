import { useEffect } from "react";
import {
  useForm,
  UseFormReturn,
  FieldValues,
  UseFormProps,
} from "react-hook-form";
import localforage from "localforage";

export const usePersistentForm = <T extends FieldValues>(
  key: string,
  options?: UseFormProps<T, any>
): UseFormReturn<T> => {
  const methods = useForm<T>(options);

  // Load data from IndexedDB on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await localforage.getItem<T>(key);
        if (savedData) {
          methods.reset(savedData); // Restore the saved state
        }
      } catch (error) {
        console.error("Failed to load data from IndexedDB", error);
      }
    };
    loadData();
  }, [key, methods]);

  // Save form data to IndexedDB whenever it changes
  useEffect(() => {
    const subscription = methods.watch((value) => {
      try {
        localforage.setItem(key, value);
      } catch (error) {
        console.error("Failed to save data to IndexedDB", error);
      }
    });

    return () => subscription.unsubscribe();
  }, [methods.watch, key]);

  return methods;
};
