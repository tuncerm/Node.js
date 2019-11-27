const {readdir, readFile, writeFile, exists, unlink} = require('fs');
const path = require('path');
const {promisify} = require('util');
const mkdirp = promisify(require('mkdirp'));
const readDir =  promisify(readdir);
const readBlog = promisify(readFile);
const writeBlog = promisify(writeFile);
const blogExists = promisify(exists);
const deleteBlog = promisify(unlink);

const postsPath = path.resolve(__dirname, 'posts');

async function getAll(req, res){
  try{
    await mkdirp(postsPath);
    const blogs = await readDir(postsPath);
    res.status(200).json({blogs});
  } catch (err) {
    res.status(500).json({message: "Something Went Wrong!"});
  }
}

async function createOne(req, res){
  try{
    const fileName = req.body.title;
    const fileContent = req.body.content;
    if(fileName && fileContent){
      const filePath = path.resolve(postsPath, fileName);
      const file = await writeBlog(filePath, fileContent);
      return res.status(200).json({created: true});
    }
    return res.status(400).json({message: "Title and Content are Required!"});
  } catch (err) {
    res.status(500).json({message: "Something Went Wrong!"});
  }
}

async function getOne(req, res){
  try{
    const fileName = req.params.blogID;
    const exists = await blogExists(path.join(postsPath, fileName));
    if(exists){
      const fileContent = await readBlog(path.join(postsPath, fileName));
      return res.status(200).json({title: fileName, content: fileContent.toString()});
    }
    return res.status(404).json({message: "Not Found!"});
  } catch (err) {
    res.status(500).json({message: "Something Went Wrong!"});
  }
}

async function updateOne(req, res){
  try{
    const fileName = req.params.blogID;
    const fileContent = req.body.content;
    if(!fileContent){
      return res.status(400).json({message: "Content is Required!"})
    }
    const exists = await blogExists(path.join(postsPath, fileName));
    if(exists){
      const updatedContent = await writeBlog(path.join(postsPath, fileName), fileContent);
      return res.status(200).json({title: fileName, updated: true});
    }
    return res.status(404).json({message: "Not Found!"});
  } catch (err) {
    res.status(500).json({message: "Something Went Wrong!"});
  }
}

async function deleteOne(req, res){
  try{
    const blog = req.params.blogID;
    const filePath = path.join(postsPath, blog);
    const exists = await blogExists(filePath);
    if(exists){
      await deleteBlog(filePath);
      return res.status(200).json({blog, deleted: true});
    }
    return res.status(404).json({message: "Not Found!"});
  } catch (err) {
    res.status(500).json({message: "Something Went Wrong!"});
  }
}

module.exports = {getAll, createOne, getOne, updateOne, deleteOne};
