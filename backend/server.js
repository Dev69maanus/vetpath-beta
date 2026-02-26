const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(require('cors')(corsOptions));

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectDB();

// Sample API routes
app.get('/api/users', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('users').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Courses API routes
app.get('/api/courses', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const courses = await db.collection('courses').find({}).toArray();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('courses').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Attendance API routes
app.get('/api/attendance', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const attendance = await db.collection('attendance').find({}).toArray();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/attendance', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('attendance').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Certifications API routes
app.get('/api/certifications', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const certifications = await db.collection('certifications').find({}).toArray();
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/certifications', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('certifications').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mentorship API routes
app.get('/api/mentorship', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const mentorship = await db.collection('mentorship').find({}).toArray();
    res.json(mentorship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/mentorship', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('mentorship').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mentors API routes
app.get('/api/mentors', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const mentors = await db.collection('mentors').find({}).toArray();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/mentors', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('mentors').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Programs API routes
app.get('/api/programs', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const programs = await db.collection('programs').find({}).toArray();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/programs', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('programs').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Resources API routes
app.get('/api/resources', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const resources = await db.collection('resources').find({}).toArray();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/resources', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('resources').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Forum Posts API routes
app.get('/api/forum-posts', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const posts = await db.collection('forum_posts').find({}).toArray();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/forum-posts', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('forum_posts').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Settings API routes
app.get('/api/settings', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const settings = await db.collection('settings').find({}).toArray();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('settings').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Skills API routes
app.get('/api/skills', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const skills = await db.collection('skills').find({}).toArray();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/skills', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('skills').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Resumes API routes
app.get('/api/resumes', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const resumes = await db.collection('resumes').find({}).toArray();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/resumes', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('resumes').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Interviews API routes
app.get('/api/interviews', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const interviews = await db.collection('interviews').find({}).toArray();
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/interviews', async (req, res) => {
  try {
    const db = client.db('vetpath');
    const result = await db.collection('interviews').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
