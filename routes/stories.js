const express = require('express')
const router = express.Router()
const  { ensureAuth } = require('../middleware/auth')
const Story = require('../models/Story')


//Get stories/add
 router.get('/add', ensureAuth,(req,res)=>{
   return res.render('stories/add')
})

//Add Stories
router.post('/', ensureAuth,async (req,res)=>{
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.render('error/500')
        
    }
 })


 // Show all public stories

 router.get('/', ensureAuth, async (req,res) =>{
     try {
         const stories = await Story.find({ status: 'public'})
         .populate('user') //get user data and info with story
         .sort({createdAt: 'desc'})
         .lean()
        res.render('stories/index', {
            stories,
        })
     } catch (error) {
         console.error(error)
         res.render('error/500')
     }

 })

 //see story @Read More
 router.get('/:id', ensureAuth, async (req,res)=>{
   try {
     const story = await Story.findById(req.params.id)
     .populate('user')
     .lean()

     if(!story){
       res.render('error/404')
     }

     res.render('stories/show' ,{
       story
     })
   } catch (error) {
     console.error(error)
     res.render('error/404')
     
   }
 })
 // Show a single story
router.put('/:id', ensureAuth, async (req, res) => {
    try {
      let story = await Story.findById(req.params.id).lean()
  
      if (!story) {
        return res.render('error/404')
      }
  
      if (story.user != req.user.id) {
        res.redirect('/stories')
      } else {
        story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        })
  
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })
  //show edit page
router.get('/edit/:id', ensureAuth, async (req,res)=>{
  try {
  const story = await Story.findOne({_id: req.params.id,}).lean()
  if(!story){
      return res.render('error/404')
  } else {
      res.render('stories/edit', {
          story
      })
  }
  } catch (error) {
    console.error(err)
    return res.render('error/500')
  }
  
})

// @desc Update Story
//  @route PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean()

    if (!story) {
      return res.render('error/404')
    }

    if (story.user != req.user.id) {
      res.redirect('/stories')
    } else {
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Delete story
// @route   DELETE /stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean()

    if (!story) {
      return res.render('error/404')
    }

    if (story.user != req.user.id) {
      res.redirect('/stories')
    } else {
      await Story.remove({ _id: req.params.id })
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})



module.exports = router;