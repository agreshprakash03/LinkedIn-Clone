import express from "express";
import { getFeedPosts, getUserPosts, likePost, createComment, updatePost,
    deletePost, } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id", verifyToken, updatePost);

/* DELETE */
router.delete("/:id", verifyToken, deletePost);

/* CREATE */
router.post("/create-comment", verifyToken, createComment);

export default router;