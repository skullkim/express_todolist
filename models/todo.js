const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            commenter: {
                type: Sequelize.INTEGER,
                allowNULL: false,
            },
            comment: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Todo',
            tableName: 'todo',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Todo.belogsTo(db.User, {foreignKey: 'commenter', taretKey: 'id'});
    }
};