const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.find().lean()
  res.render('courses', {
    title: 'Courses',
    isCourses: true,
    courses
  })
})

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }
 
  const course = await Course.findById(req.params.id).lean()

  res.render('course-edit', {
    title: `Edit ${course.title} course`,
    course
  })
}) 

router.post('/edit', async (req, res) => {
  const {id} = req.body
  delete req.body.id
  await Course.findByIdAndUpdate(id, req.body).lean()
  res.redirect('/courses')
})

router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  const course = await Course.findById(req.params.id).lean()

  res.render('course', {
    layout: 'empty',
    title: `Course ${course.title}`,
    course
  })
})

// router.post('/', async (req, res) => {
//   const courses = await Course.getAll()
//   res.render('courses', {
//     title: 'Courses',
//     isCourses: true,
//     courses
//   })
// })

module.exports = router