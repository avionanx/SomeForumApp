const Thread = require('../model/thread');
const mongoose = require('mongoose');
const Reply = require('../model/reply');
module.exports.postThread = async (req, res) => {
    // check if title and text are provided
    const { title, text } = req.body;
    if(!title || !text){
        return res.status(400).json({success:false ,message: 'Please provide title and text'});
    }
    // create thread
    const thread = await Thread.create({
        title:title,
        text:text,
        author:req.session.user
    });
    if(thread){
        return res.status(200).json({success:true,threadId:thread._id ,message: 'Thread created successfully'});
    }else{
        return res.status(500).json({success:false ,message: 'Server error'});
    }
}
module.exports.getThreads = async (req, res) => {
    //pagination
    const page = req.query.page || 1;
    const threadCount = await Thread.find().count();
    const maxPage = Math.ceil(threadCount/10);
    if(page<1 || page>maxPage){
        return res.status(400).json({success:false ,message: 'Page not found'});
    }
    // get threads
    const threads = await Thread.find().skip((page-1)*10).limit(10);
    if(threads){
        return res.status(200).json({success:true ,threads: threads,page:page,maxPage:maxPage});
    }else{
        return res.status(500).json({success:false ,message: 'Server error'});
    }
}
module.exports.getThread = async (req, res) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({success:false ,message: 'Thread not found'});
      }
    try{
        const thread = await Thread.findById(req.params.id);
        if(!thread){
            return res.status(400).json({success:false ,message: 'Thread not found'});
        }
        const page = req.query.page || 1;
        const replyCount = await Reply.find({parentPost:req.params.id}).count();
        if(page<1 || page>(Math.floor(replyCount/10)+1)){
            return res.status(400).json({success:false ,message: 'Page not found'});
        }
        const replies = await Reply.find({parentPost:thread._id}).skip((page-1)*10).limit(10);
        return res.status(200).json({success:true ,thread: thread,replies:replies});
        
    }catch(err){
        console.log(err);
    }
}
module.exports.postReply = async (req, res) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({success:false ,message: 'Thread not found'});
    }
    const text = req.body.text;
    if(!text){
        return res.status(400).json({success:false ,message: 'Please provide text'});
    }
    try{
        const post = await Thread.findById(req.params.id);
        if(post){
            await Reply.create({
                text:text,
                parentPost:post._id,
                author:req.session.user
            })
            return res.status(200).json({success:true ,message: 'Reply created successfully'});
        }else{
            return res.status(400).json({success:false ,message: 'Thread not found'});
        }
    }catch(err){
        console.log(err);
    }
}