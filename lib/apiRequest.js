//import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export async function makePostRequest(setLoading,endpoint,data,resourceName,reset){
    try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        const response = await fetch(`${baseUrl}/${endpoint}`, {
          method: "POST",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(data)
        });

        
        if(response.ok) {
           
           toast.success(`New ${resourceName} Created Successfully`);
          setLoading(false)
          reset();
          
          
        }else{
          setLoading(false)
          if(response.status === 409){
            
            toast.error("The Giving Warehouse Stock is NOT Enough")

          }else{
            toast.error("Something went wrong")
          }
          
            
        }
        
        
      } catch (error) {
        setLoading(false);
        console.log(error);
        
      }
}
export async function makePutRequest(setLoading,endpoint,data,resourceName,redirect,reset){
    try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        const response = await fetch(`${baseUrl}/${endpoint}`, {
          method: "PUT",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if(response.ok) {
          console.log(response);
          setLoading(false)
          toast.success(`${resourceName} Updated Successfully`)
           redirect();
        }else{
            setLoading(false)
            toast.error("Something went wrong")
        }
        
        
      } catch (error) {
        setLoading(false);
        console.log(error);
        
      }
}





