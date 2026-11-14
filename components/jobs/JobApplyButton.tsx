'use client'
import { applyToJob } from "@/lib/actions/application"
import { useSession } from "@/lib/auth-client"
import { JobPost } from "@/lib/types"
import { Button } from "@base-ui/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


const JobApplyButton = ({job}:{job:JobPost}) => {
    const router = useRouter()
    
    const {data:session} = useSession()
    const user = session?.user;


    const handleApplyNow = async() => {
        if(!user){
            router.push(`/sign-in?redirectTo=/brows-jobs/${job._id}`)
            return;
        }else if(user?.role === 'seeker'){
            const application = {
                jobId: job._id,
                userId: user.id,
                email: user.email,
                userName: user.name,
                jobTitle: job.title,
                jobCategory: job.category,
            }
            const result = await applyToJob(application);
            if(result.insertedId){
                console.log('application submited successfully!')
                toast.success('Application submited successfully!')
                router.push('/brows-jobs')
            }
        }else{
            console.log('user is not a seeker')
            toast.error('Your not applicable for this job!')
        }
    }
  return (
    <div>
      {/* TODO: real apply flow — it must require sign in first. */}
      <Button
        // href={`/sign-in`}
        onClick={handleApplyNow}
        className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-[#7a5af8] px-6 text-sm font-medium text-white transition-colors hover:bg-[#8b6df9]"
      >
        Apply Now
      </Button>
    </div>
  )
}

export default JobApplyButton
