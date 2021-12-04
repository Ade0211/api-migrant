const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const User = require('../../models/question-schema')


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // cb(null, 'public');
      cb(null, path.join(__dirname, '../../public'))
    },
    filename(req, file, cb) {
      // cb(null, `${new Date().getTime()}_${file.originalname}`);
      cb(null, Date.now() + path.extname(file.originalname))
    }

  }),
  limits: {
    fileSize: 5000000 // max file size 5MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});


router.post('/', upload.single('file'),
  async (req, res) => {
    console.log(req.body)
    try {
      const { answer, link, file_link } = req.body;
      const { path, mimetype } = req.file;
      const imageData = new User({
       answer,
       link,
       file_link,
        file_path: path,
        file_mimetype: mimetype
      });
      
      await imageData.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

//GET USERS

router.get('/users/list', async (req, res) => {
  try {
    const user = await User.find({});
    // console.log(user)
    const sortedByCreationDate = user.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of users. Try again later.');
  }

})

// GET SPECIFIC POST

router.get('/:postId', async (req, res) => {
  try {

    const posts = await User.findById(req.params.postId)

    res.send(posts)

  } catch (error) {
    res.json({ message: error })
  }

})

// DELETE A SPECIFIC POST

router.delete('/:postId', async (req, res) => {

  try {

    const RemovedPost = await User.findByIdAndDelete({ _id: req.params.postId })

    res.send(RemovedPost)

  } catch (error) {
    res.json({ message: error })
  }

})

// UPDATE A SPECIFIC POST

router.put('/:postId', async (req, res) => {

  try {

    await User.findOneAndUpdate({ _id: req.params.postId }, { $set: req.body })

    res.send('Data updated successfully.')

  } catch (error) {
    res.json({ message: error })
  }

})

module.exports = router;