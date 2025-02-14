const express = require('express');
const Todo = require('../DB/models/todoModel');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = express.Router();

// Create a new To-Do
router.post('/create', authMiddleware, async (req, res) => {
try {
    const { title, description } = req.body;
    const newTodo = new Todo({ 
    title, 
    description,  
    userId: req.user.userId 
    });

    await newTodo.save();
    res.status(201).json(newTodo);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Get all To-Dos for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
try {
    const todos = await Todo.find({ userId: req.user.userId });
    res.status(200).json(todos);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Get all completed todos
router.get('/completed', authMiddleware, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.userId, isCompleted: true });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get a single To-Do by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.userId });
    
        if (!todo) {
          return res.status(404).json({ message: 'Todo not found' });
        }
    
        res.status(200).json({
          id: todo._id.toString(), 
          title: todo.title,
          description: todo.description || "", 
          isCompleted: todo.isCompleted,
          userId: todo.userId.toString(), 
          createdAt: todo.createdAt.toISOString(), 
          updatedAt: todo.updatedAt.toISOString(), 
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

// Update a To-Do by ID
router.put('/:id', authMiddleware, async (req, res) => {
try {
    const updatedTodo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId }, 
    req.body, 
    { new: true }
    );

    if (!updatedTodo) return res.status(404).json({ message: 'To-Do not found' });

    res.status(200).json(updatedTodo);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

router.put('/:id/complete', authMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.userId });

        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        todo.isCompleted = !todo.isCompleted;
        await todo.save();

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete a To-Do by ID
router.delete('/:id', authMiddleware, async (req, res) => {
try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!deletedTodo) return res.status(404).json({ message: 'To-Do not found' });

    res.status(200).json({ message: 'To-Do deleted successfully' });
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

module.exports = router;
