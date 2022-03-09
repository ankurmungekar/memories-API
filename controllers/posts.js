import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/posts.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;
  const newPost = new Post({ title, message, selectedFile, creator, tags })

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  try {
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(202).res.json(updatedPost);
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  try {
    await Post.findByIdAndRemove(id);
    res.status(204).json('Post Deleted Successfully');
  } catch (error) {
    console.log(error)
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  const post = await Post.findById(id);
  const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  res.status(202).json(updatedPost);
}