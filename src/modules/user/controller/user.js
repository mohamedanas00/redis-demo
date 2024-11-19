export const addUser = async (req, res) => {
  try {
    const { name, email, age, collage } = req.body;

    const cachedUser = await client.get(`user:${email}`);
    if (cachedUser) {
      return res.status(400).json({
        message: "User already exists",
        user: JSON.parse(cachedUser),
      });
    }
    await client.set(email, JSON.stringify({ name, email, age, collage }));

    // Create user in MongoDB
    const user = await userModel.create({ name, email, age, collage });

    // Store user in Redis with email as key
    await client.set(`user:${email}`, JSON.stringify(user));

    return res.status(201).json({
      message: "User Created",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

export const getUserByEmail = async (req, res) => {
  const users = await userModel.find({ email: req.params.email });
  return res.json({ message: "All Users", users });
};

export const getUserWithCache = async (req, res) => {
  try {
    const email = req.params.email;
    console.log("email:", email);

    const cachedUser = await client.get(`user:${email}`);
    console.log("cachedUser:", cachedUser);

    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      console.log("User found in cache");
      return res.json({ message: "User found in cache", user });
    } else {
      const user = await userModel.find({ email: req.params.email });
      console.log("User not found in cache");

      return res.json({ message: "All Users", user });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching users" });
  }
};
