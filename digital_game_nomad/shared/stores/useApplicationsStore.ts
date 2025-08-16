// package
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// slice
import { ApplicationsState, ApplicationData } from '../types';

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set) => ({
      applications: [],
      addApplication: async (newApplicationWithImage) => {
        const { imageFile, applicantEmail, ...restOfNewApplication } =
          newApplicationWithImage;

        const id = Date.now().toString();
        const submittedAt = new Date().toISOString();

        let imageData: string | undefined = undefined;
        let hasImage = false;

        if (imageFile) {
          try {
            const reader = new FileReader();
            imageData = await new Promise<string>((resolve, reject) => {
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(imageFile);
            });
            hasImage = true;
          } catch (error) {
            console.error('이미지 변환 실패:', error);
            hasImage = false;
          }
        }

        const applicationToAdd: ApplicationData = {
          id,
          ...restOfNewApplication,
          hasImage,
          imageData,
          submittedAt,
          status: 'pending',
          applicantEmail,
          contactEmail: undefined,
          contactPhone: undefined,
          reviewedAt: undefined,
          reviewedBy: undefined,
          notes: undefined,
        };

        set((state) => ({
          applications: [...state.applications, applicationToAdd],
        }));
      },
      updateApplicationStatus: (id, status) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id
              ? {
                  ...app,
                  status,
                  reviewedAt:
                    status !== 'pending' ? new Date().toISOString() : undefined,
                  reviewedBy: status !== 'pending' ? 'Admin User' : undefined,
                }
              : app
          ),
        })),
      bulkUpdateApplicationStatus: (ids, status) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            ids.includes(app.id)
              ? {
                  ...app,
                  status,
                  reviewedAt:
                    status !== 'pending' ? new Date().toISOString() : undefined,
                  reviewedBy: status !== 'pending' ? 'Admin User' : undefined,
                }
              : app
          ),
        })),
      deleteApplications: (ids) =>
        set((state) => ({
          applications: state.applications.filter(
            (app) => !ids.includes(app.id)
          ),
        })),
    }),
    {
      name: 'company-applications-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
