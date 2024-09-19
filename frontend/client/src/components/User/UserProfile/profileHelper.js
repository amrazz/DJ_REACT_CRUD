import axios from 'axios';




// Handle image upload
export const handleImageUpload = async (file, username, setProfileData, setError) => {

    if (!file) return;

    try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const formData = new FormData();
        formData.append('profile_image', file);

        const response = await axios.put(`http://localhost:8000/api/profile/?username=${username}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        setProfileData((prevData) => ({
            ...prevData,
            profile_image: response.data.user.profile_image,
        }));

        console.log('Profile image updated successfully:', response.data);
    } catch (err) {
        console.error('Error uploading profile image:', err);
        setError('Error uploading profile image');
    }
};

export const handleSaveProfileData = async (
    newProfileData,
    mainUsername,
    setProfileData,
    setEditing,
    setError,
    setMainUsername,
    dispatch,
    loginSuccess
) => {
    
    try {
        const token = localStorage.getItem('ACCESS_TOKEN');

        const data = {
            username: newProfileData.username,
            email: newProfileData.email,
            first_name: newProfileData.first_name,
            last_name: newProfileData.last_name,
        };

        console.log('New profile data:', data);

        const response = await axios.put(
            `http://localhost:8000/api/update/?username=${mainUsername}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Profile updated successfully:', response.data);
        console.log(`i am after profile success`);
        dispatch(
            loginSuccess({
                user: response.data.username,
                token: token,
            })
        );
        console.log(`dispatched login success`);
        console.log(response.data);
        setProfileData(response.data);
        setMainUsername(response.data.username);
        setEditing(false);

    } catch (err) {
        console.error('Error updating profile:', err.response ? err.response.data : err);
        setError('Error updating profile');
    }
};