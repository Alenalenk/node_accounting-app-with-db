const usersService = require('../services/users.services.js');

const getAll = async (req, res) => {
  const users = await usersService.getAllUsers();

  res.send(users);
};

const addUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const users = await usersService.getAllUsers();

    const ids = users
      .map((item) => parseInt(item.id, 10))
      .filter((itemId) => !isNaN(itemId));
    const id = ids.length > 0 ? Math.max(...ids) + 1 : 1;

    const newUser = {
      id: id,
      name: name,
    };

    await usersService.addUser(newUser);

    res.status(201).send(newUser);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.findUser(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).send(user);
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.findUser(id);

  if (!user) {
    return res.sendStatus(404);
  }

  usersService.deleteUser(id);

  res.sendStatus(204);
};

const changeUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  let newUser = await usersService.findUser(id);

  newUser = Object.assign(newUser, { name });
  usersService.changeUser(newUser);

  res.send(newUser);
};

module.exports = {
  getAll,
  addUser,
  removeUser,
  getUser,
  changeUser,
};
