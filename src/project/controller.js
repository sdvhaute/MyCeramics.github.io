const { pool } = require('../../db');
const queries = require('./queries');


// Cloudinary upset
const http = require('http');
const util = require('util');

const cloudinary = require("cloudinary");
require("dotenv").config();

// const Formidable = require('formidable');
const Formidable = require('formidable-serverless');


const path = require('path');

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

const addNewProjectController = async (req, res) => {

    const user_id = (req.user.id);

    const form = new Formidable();

    form.parse(req, async (err, fields, files) => {

        console.log('started form parse cloudinary')

        const { projectname, projectdesc, thrown, trimmed, bisque, glazed, glazefired, imgurl, formclay, claytype, startweightclay, dimensionsheight, dimensionswidth, dimensionslength, glazetype, notes
        } = fields;


        //check if project_name exists in dbceramics.projects
        await pool.query(queries.checkExistingProjects, [projectname], (err, results) => {
            if (results.rows.length) { //if there are resulting rows from the query, returns true, meaning this project already exists in dbceramics
                res.send("Project already exists.");
            } else {
                //add new project to dbceramics.projects
                pool.query(
                    queries.addNewProject,
                    [projectname || "default",
                    projectdesc || "default",
                    thrown || false,
                    trimmed || false,
                    bisque || false,
                    glazed || false,
                    glazefired || false,
                    imgurl || "",
                    formclay || "",
                    claytype || "",
                    startweightclay || 0,
                    dimensionsheight || 0,
                    dimensionswidth || 0,
                    dimensionslength || 0,
                    glazetype || "",
                    notes || "",
                        user_id],
                    async (err, results) => {
                        if (err) throw err;
                        // res.status(201).send('Project succesfully added!');
                        let projectObject = results.rows;
                        console.log(projectObject)

                        // Find Cloudinary documentation using the link below
                        // https://cloudinary.com/documentation/upload_images
                        await cloudinary.uploader.upload(files.upload.path, result => {

                            // This will return the output after the code is exercuted both in the terminal and web browser
                            // When successful, the output will consist of the metadata of the uploaded file one after the other. These include the name, type, size and many more.
                            console.log(result)
                            const uploadObject = {
                                title: result.asset_id,
                                cloudinary_id: result.public_id,
                                image_url: result.secure_url
                            }

                            pool.query(`INSERT INTO images (title, cloudinary_id, image_url, project_id) VALUES($1,$2,$3, $4) RETURNING *`, [uploadObject.title, uploadObject.cloudinary_id, uploadObject.image_url, projectObject[0].id], (err, results) => {
                                if (err) throw err;
                                const imageObject = results.rows;
                                console.log('inserted query into db')



                                pool.query(`UPDATE projects2 SET imgurl = $1 WHERE id = $2`, [uploadObject.image_url, imageObject[0].project_id], (err, results) => {
                                    if (err) throw err;

                                })
                            })
                            // if (result.public_id) {
                            //     // The results in the web browser will be returned inform of plain text formart. We shall use the util that we required at the top of this code to do this.
                            //     res.writeHead(200, { 'content-type': 'text/plain' });
                            //     res.write('received uploads:\n\n');
                            //     res.end(util.inspect({ fields: fields, files: files }));
                            // }

                        }, { folder: 'dbceramics' });



                        res.redirect(`/api/v1/projects/${projectObject[0].id}`);

                    });
            };


        });


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

            pool.query(`DELETE FROM images WHERE project_id = $1 RETURNING cloudinary_id`, [projectid], (err, results) => { //[id] variable that is passed into the query deleteCreator that's taken from req parameters-> the id in the route
                if (err) throw err;

                const { cloudinary_id } = (results.rows);
                // DIT DEEL WERKT NOG NIET _ OOK OP CLOUDINARY MOET DE AFBEELDING VERWIJDERT WORDEN
                cloudinary.uploader
                    .destroy(`${cloudinary_id}`)
                    .then((result) => {
                        console.log('cloudinary deleted this image')
                    })
                    .catch((error) => {
                        console.log('NOT cloudinary deleted this image')
                    });

                pool.query(queries.deleteProject, [projectid], (err) => { //[id] variable that is passed into the query deleteCreator that's taken from req parameters-> the id in the route
                    if (err) throw err;
                    console.log(`Deleted project with id:${projectid}`);
                    res.redirect(`/api/v1/projects`);

                });


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