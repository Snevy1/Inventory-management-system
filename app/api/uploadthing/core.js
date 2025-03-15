import { createUploadthing} from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();



// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  })
    
    .onUploadComplete(async ({ metadata, file }) => {
      
      console.log("file url", file.ufsUrl, metadata);
    }),
} 
