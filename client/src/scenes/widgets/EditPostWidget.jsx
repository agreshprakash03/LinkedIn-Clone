import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const EditPostWidget = ({ postId, description, picturePath, onClose }) => {
  const dispatch = useDispatch();
  const [editedDescription, setEditedDescription] = useState(description);
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);

  // Set the initial editedDescription state to the prop value
  useEffect(() => {
    setEditedDescription(description);
  }, [description]);

  const handleEditPost = async () => {
    const formData = new FormData();
    formData.append("description", editedDescription); // Use the editedDescription state

    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (response.ok) {
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      onClose();
    } else {
      console.error("Error updating post:", response.statusText);
    }
  };

  return (
    <Box>
      <Typography variant="h6" color={palette.neutral.dark} mb={1}>
        Edit Post
      </Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)} // Update the editedDescription state on change
          style={{
            width: "100%",
            minHeight: "100px",
            backgroundColor: palette.neutral.light,
            borderRadius: "4px",
            padding: "8px",
            resize: "none",
          }}
        />
        {picturePath && (
          <Box>
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "4px", marginTop: "8px" }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          </Box>
        )}
        <Divider />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditPost}
          >
            Save Changes
          </Button>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPostWidget;
