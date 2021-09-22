const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: 'ff%',
        },
      },
      include: [
        { association: 'addresses', where: { street: 'Rua 1231231' } },
        { association: 'techs', where: { name: { [Op.iLike]: '%js%' } } },
      ],
    });

    return res.json(users);
  },
};
