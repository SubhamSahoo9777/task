import User from "../model/userSchema.js";

const userController = {
    
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = new User({ name, email, password });
      await newUser.save();

      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  },
  login:async(req,res)=>{
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" ,success:false});
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" ,success:false});
      }
      const token = await user.generateToken();
      res.status(200).json({ message: "User logged in successfully" ,token,success:true,data:user});
    } catch (error) {
      
    }
  }
};

export default userController;
