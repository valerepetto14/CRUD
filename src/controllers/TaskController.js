const index = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM task', (err, task) => {
          if(err) {
            res.json(err);
          }
          res.render('tasks/index', { task });
        });
      });
    };
    

const create = (req, res) =>{
    res.render('tasks/create')
};

const store = (req,res) => {
    const data = req.body;
    req.getConnection((err,conn) =>{
        conn.query('INSERT INTO task SET ?', [data], (err, rows) =>{
            res.redirect('/tasks');
        })
    });
};

const destroy = (req,res) =>{
    const id = req.body.id;
    req.getConnection((err,conn) =>{
        conn.query('DELETE FROM task where id = ?', [id], (err,rows) =>{
            res.redirect('/tasks');
        });
    });
};

const edit = (req,res) =>{
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM task where id = ?', [id], (err, task) => {
          if(err) {
            res.json(err);
          }
          res.render('tasks/edit', { task });
        });
      });
};

const update = (req,res) => {
    const id  = req.params.id;
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE task SET ? where id = ?', [data, id], (err, task) => {
          if(err) {
            res.json(err);
          }
          res.redirect('/tasks');
        });
      });
};

module.exports = {
    index: index,
    create: create,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update
}