"user server"

export const register = async (formData, profile, resume) => {
    const fullname = formData?.fullname;
    const email = formData?.email;
    const password = formData?.password;
    const phoneNumber = formData?.phoneNumber;
    const profileBio = profile?.profileBio;
    const profilePhoto = profile?.profilePhoto;
    const profileSkills = formData?.profileSkills?.split(",");
    const profileResume = resume?.fullname;
    const profileResumeOriginalName = resume?.profileResumeOriginalName;
    const role = formData?.role;
    console.log("formData", formData, "profile", profile, "resume", resume)
    
    // //validation
    if (!fullname || !email || !password ||  !phoneNumber || !profileSkills?.length || !role) {
        return { error: "Please fill up all fields"};
    }
    try {
            const user =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname, 
                    email, 
                    password, 
                    phoneNumber,
                    profileBio, 
                    profilePhoto, 
                    profileSkills,
                    role,
                    profileResume, 
                    profileResumeOriginalName
                }), 
                cache: "no-cache",
            });
            const result = await user.json();
            return result;
    } catch (error) {
       return {error: error?.resonse?.data?.message} 
    }
} 