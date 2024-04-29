
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require('multer');
const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors())
// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// MongoDB connection
mongoose.connect('mongodb+srv://21bd1a050wcsea:4lkKEV1Mk3FKrpHP@cluster0.gehfdjh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


const profileSchema = new mongoose.Schema({
    id:Number,
    name: String,
    role: String,
    experience: String,
    image: {
      data: Buffer,
      contentType: String
    }
  });
  const Profile = mongoose.model('Profile', profileSchema);
  
  // Set up multer for handling file uploads
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  
  // Route for handling profile data and image upload
  app.post('/add', upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    
    const { name, role, experience } = req.body;
    const profilesCount = await Profile.countDocuments();
    const id = profilesCount + 1
  
    const profile = new Profile({
        id,
    
    
    
      name,
      role,
      experience,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }

    });
  
    try {
      await profile.save();
      res.status(200).json({ message: 'Profile added successfully' });
    } catch (error) {
      console.error('Error adding profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.get('/data', async (req, res) => {
    try {
      const profiles = await Profile.find();
  
      if (!profiles || profiles.length === 0) {
        return res.status(404).json({ error: 'No profiles found' });
      }
  
      // Convert image buffer data to base64
      const profilesWithBase64 = profiles.map((profile) => ({
        ...profile._doc,
        image: {
          ...profile._doc.image,
          data: profile.image.data.toString('base64'),
        },
      }));
  
      res.status(200).json(profilesWithBase64);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    // id=Number(id)


    try {
        
        const deletedProfile = await Profile.findOneAndDelete({ "id": id });

        if (!deletedProfile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/search/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)

    try {
        const profile = await Profile.findOne({ "id": id });
        // console.log(profile)

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // Convert image buffer data to base64
        const profileWithBase64 = {
            ...profile._doc,
            image: {
                ...profile._doc.image,
                data: profile.image.data.toString('base64'),
            },
        };


        res.status(200).json(profileWithBase64);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const port = 5000;

app.listen(port, () => {
    console.log("Connected to server");
});
