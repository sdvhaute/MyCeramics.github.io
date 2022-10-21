const { pool } = require('../../db');
const queries = require('./queries');

const getAllProjectsController = (req, res) => {
    const user_id = (req.user.id);
    pool.query(queries.getAllProjects, [user_id], (err, results) => {
        if (err) throw err;
        // res.status(200).json(results.rows);
        let projectObject = results.rows;
        res.render('projects/index', { projectObject });
    })
};
const getAllProjectsKanbanController = (req, res) => {
    const user_id = (req.user.id);
    pool.query(queries.getAllProjects, [user_id], (err, results) => {
        if (err) throw err;
        // res.status(200).json(results.rows);
        let projectObject = results.rows;
        res.render('projects/kanban', { projectObject });
    })
};


const getProjectByIdController = (req, res) => {
    const projectId = (req.params.projectid);
    const user_id = (req.user.id);


    pool.query(queries.getProjectById, [projectId, user_id], (err, results) => {
        if (err) throw err;
        let projectObject = results.rows;

        res.render(`projects/show`, { projectObject });
    });

};

const getProjectByIdEditController = (req, res) => {
    const projectId = (req.params.projectid);
    const user_id = (req.user.id);


    pool.query(queries.getProjectById, [projectId, user_id], (err, results) => {
        if (err) throw err;
        let projectObject = results.rows;

        res.render(`projects/edit`, { projectObject });
    });

};


const getNewProjectFormController = (req, res) => {
    console.log('Form for creating new project');
    res.render('projects/new');
};

const addNewProjectController = (req, res) => {
    const { projectname, projectdesc, thrown, trimmed, bisque, glazed, glazefired, imgurl, formclay, claytype, startweightclay, dimensionsheight, dimensionswidth, dimensionslength, glazetype, notes
    } = req.body;

    const user_id = (req.user.id);

    //check if project_name exists in dbceramics.projects
    pool.query(queries.checkExistingProjects, [projectname], (err, results) => {
        if (results.rows.length) { //if there are resulting rows from the query, returns true, meaning this project already exists in dbceramics
            res.send("Project already exists.");
        } else {
            //add new project to dbceramics.projects
            pool.query(
                queries.addNewProject,
                [projectname,
                    projectdesc,
                    thrown || false,
                    trimmed || false,
                    bisque || false,
                    glazed || false,
                    glazefired || false,
                    imgurl || "https://images.unsplash.com/photo-1595351298020-038700609878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    formclay || "",
                    claytype || "",
                    startweightclay || 0,
                    dimensionsheight || 0,
                    dimensionswidth || 0,
                    dimensionslength || 0,
                    glazetype || "",
                    notes || "",
                    user_id
                ],
                (err, results) => {
                    if (err) throw err;
                    // res.status(201).send('Project succesfully added!');

                    pool.query(`SELECT * FROM projects2 WHERE projectname=$1`, [projectname], (err, results) => {
                        let projectObject = results.rows;
                        console.log(results.rows)
                        res.redirect(`/api/v1/projects/${projectObject[0].id}`);
                    });
                });
        };
    });
};

const editProjectController = (req, res) => {
    const projectid = (req.params.projectid);
    const { projectname, projectdesc, imgurl, formclay, claytype, startweightclay, dimensionsheight, dimensionswidth, dimensionslength, glazetype, notes } = req.body;

    const user_id = (req.user.id);

    pool.query(queries.editProject,
        [projectid, projectname, projectdesc, imgurl, formclay, claytype, startweightclay || null, dimensionsheight || null, dimensionswidth || null, dimensionslength || null, glazetype, notes, user_id],
        (err, results) => {
            if (err) throw err;
            // let projectObject = results.rows;

            res.redirect(`/api/v1/projects/${projectid}`);
        });

};

const updateProjectParametersController = (req, res) => {

    const projectid = (req.params.projectid);

    let { thrown, trimmed, bisque, glazed, glazefired } = req.body;
    let reqObject = { thrown, trimmed, bisque, glazed, glazefired };

    for (let prop in reqObject) {

        if (reqObject[prop] === 'on') {
            pool.query(`UPDATE projects2 SET ${prop} = true WHERE id = $1`, [projectid], (err) => {
                console.log(`${prop} set to true`);
                if (err) throw err;
                // res.status(200);
            });
        } else {
            pool.query(`UPDATE projects2 SET ${prop} = false WHERE id = $1`, [projectid], (err) => {
                console.log((`${prop} set to false`));
                if (err) throw err;
                // res.status(200);
            });
        }
    }

    pool.query(`SELECT * FROM projects2 WHERE id=$1`, [projectid], (err, results) => {
        let projectObject = results.rows;
        res.redirect(`/api/v1/projects/${projectObject[0].id}`);
    });


};

const updateProjectParametersKanbanController = async (req, res) => {

    const projectid = (req.params.projectid);

    let { thrown, trimmed, bisque, glazed, glazefired } = req.body;
    let reqObject = { thrown, trimmed, bisque, glazed, glazefired };

    for (let prop in reqObject) {

        if (reqObject[prop] === 'true') {
            pool.query(`UPDATE projects2 SET ${prop} = true WHERE id = $1`, [projectid], (err) => {

                if (err) throw err;
            });
        } else {
            pool.query(`UPDATE projects2 SET ${prop} = false WHERE id = $1`, [projectid], (err) => {

                if (err) throw err;
            });
        }
    }
};

const checkThrown = async (req, res) => {

    const projectid = (req.params.projectid);
    let { thrown } = req.body;

    if (thrown === 'on') {
        pool.query(`UPDATE projects2 SET thrown = true, throwndate = NOW() WHERE id = $1`,
            [projectid], (err) => {
                if (err) throw err;
            });
    } else {
        pool.query(`UPDATE projects2 SET thrown = false, throwndate = null WHERE id = $1`, [projectid], (err) => {
            if (err) throw err;
        });
    }
    res.redirect(`/api/v1/projects/${projectid}`);
};

const checkTrimmed = async (req, res) => {

    const projectid = (req.params.projectid);
    let { trimmed } = req.body;

    if (trimmed === 'on') {
        pool.query(`UPDATE projects2 SET trimmed = true, trimmeddate = NOW() WHERE id = $1`,
            [projectid], (err) => {
                if (err) throw err;
            });
    } else {
        pool.query(`UPDATE projects2 SET trimmed = false, trimmeddate = null WHERE id = $1`, [projectid], (err) => {
            if (err) throw err;
        });
    }
    res.redirect(`/api/v1/projects/${projectid}`);
};
const checkBisque = async (req, res) => {

    const projectid = (req.params.projectid);
    let { bisque } = req.body;

    if (bisque === 'on') {
        pool.query(`UPDATE projects2 SET bisque = true, bisquedate = NOW() WHERE id = $1`,
            [projectid], (err) => {
                if (err) throw err;
            });
    } else {
        pool.query(`UPDATE projects2 SET bisque = false, bisquedate = null WHERE id = $1`, [projectid], (err) => {
            if (err) throw err;
        });
    }
    res.redirect(`/api/v1/projects/${projectid}`);
};
const checkGlazed = async (req, res) => {

    const projectid = (req.params.projectid);
    let { glazed } = req.body;

    if (glazed === 'on') {
        pool.query(`UPDATE projects2 SET glazed = true, glazeddate = NOW() WHERE id = $1`,
            [projectid], (err) => {
                if (err) throw err;
            });
    } else {
        pool.query(`UPDATE projects2 SET glazed = false, glazeddate = null WHERE id = $1`, [projectid], (err) => {
            if (err) throw err;
        });
    }
    res.redirect(`/api/v1/projects/${projectid}`);
};
const checkGlazeFired = async (req, res) => {

    const projectid = (req.params.projectid);
    let { glazefired } = req.body;

    if (glazefired === 'on') {
        pool.query(`UPDATE projects2 SET glazefired = true, glazefireddate = NOW() WHERE id = $1`,
            [projectid], (err) => {
                if (err) throw err;
            });
    } else {
        pool.query(`UPDATE projects2 SET glazefired = false, glazefireddate = null WHERE id = $1`, [projectid], (err) => {
            if (err) throw err;
        });
    }
    res.redirect(`/api/v1/projects/${projectid}`);
};
const updateNotes = async (req, res) => {

    const projectid = (req.params.projectid);
    let { notes } = req.body;


    pool.query(`UPDATE projects2 SET notes = $2 WHERE id = $1`,
        [projectid, notes], (err) => {
            if (err) throw err;
        });

    res.redirect(`/api/v1/projects/${projectid}`);
};



const searchStringController = (req, res) => {
    const user_id = (req.user.id);
    const stringSearch = JSON.stringify(req.body.stringSearch).slice(1, -1);


    pool.query(`SELECT * FROM projects2 WHERE lower(projectname) LIKE lower('%${stringSearch}%') AND user_id=${user_id}`,
        (err, results) => {
            if (err) throw err;
            // res.status(200).json(results.rows);

            console.log(results.rows)

            let projectObject = results.rows;
            res.render('projects/index', { projectObject, stringSearch });

        })


};




const deleteProjectController = (req, res) => {
    const projectid = (req.params.projectid); // because projectid is a string

    const user_id = (req.user.id);
    console.log(projectid)

    // check if id exists
    pool.query(queries.getProjectById, [projectid, user_id], (err, results) => { //[projectid] variable that is passed into the query checkExistingCreators
        if (!results.rows.length) { //if there are resulting rows from the query, returns false, meaning the id does not exist in the db
            res.send(`Project with id ${projectid} does not exist.`);
        } else {

            pool.query(queries.deleteProject, [projectid], (err) => { //[id] variable that is passed into the query deleteCreator that's taken from req parameters-> the id in the route
                if (err) throw err;
                console.log(`Deleted project with id:${projectid}`);
                res.redirect(`/api/v1/projects`);

            });

        };

    });

};

module.exports = {
    getAllProjectsController,
    getAllProjectsKanbanController,
    getProjectByIdController,
    getProjectByIdEditController,
    getNewProjectFormController,
    addNewProjectController,
    editProjectController,
    updateProjectParametersController,
    updateProjectParametersKanbanController,
    checkThrown,
    checkTrimmed,
    checkBisque,
    checkGlazed,
    checkGlazeFired,
    updateNotes,
    searchStringController,
    deleteProjectController,
};